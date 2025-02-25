import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { User } from "../../../core/types/uset.type.ts";
import { axiosInstance } from "../../../core/axios/axios-instance.ts";
import { SignUp } from "../types/sign-up.type.ts";
import { SignIn } from "../types/sign-in.type.ts";
import * as jose from "jose";
import { AxiosResponse } from "axios";
import { AuthContext } from "../contexts/auth.context.ts";
import { WrapperProps } from "../../../core/types/props.type.ts";
import { Roles } from "../../../core/types/roles.enum.ts";
import { StorageUtil } from "../../../core/utils/storage.util.ts";

const initialState: User = {
  sub: StorageUtil.get<User>("user")!.sub,
  name: StorageUtil.get<User>("user")!.name,
  email: StorageUtil.get<User>("user")!.email,
  role: StorageUtil.get<User>("user")!.role,
};

export const AuthProvider = ({ children }: WrapperProps) => {
  const [user, setUser] = useState<User>(initialState);
  const whiteList = useMemo(() => ["/auth/sign-in", "/auth/sign-up"], []);

  useEffect(() => {
    axiosInstance
      .get("/auth/me")
      .then((response) => {
        const user = jose.decodeJwt(response.data.accessToken) as User;

        setUser(user);

        StorageUtil.set("user", user);
        sessionStorage.setItem("accessToken", response.data.accessToken);
      })
      .catch(() => {
        setUser(initialState);

        StorageUtil.set("user", initialState);
      });
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = !(
          (config as unknown as { retry: boolean }).retry &&
          sessionStorage.getItem("accessToken")
        )
          ? `Bearer ${sessionStorage.getItem("accessToken")}`
          : config.headers["Authorization"];

        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => axiosInstance.interceptors.request.eject(authInterceptor);
  }, []);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (whiteList.includes(error.config.url)) return;

        if (error.status === 403) return;

        if (error.status === 401) {
          try {
            const tokens = await refreshTokens();

            sessionStorage.setItem("accessToken", tokens.data.accessToken);

            originalRequest.headers["Authorization"] =
              `Bearer ${tokens.data.accessToken}`;

            originalRequest.retry = true;

            return axiosInstance(originalRequest);
          } catch {
            setUser(initialState);

            StorageUtil.set("user", initialState);
            sessionStorage.setItem("accessToken", "");
          }
        }

        return Promise.reject(error);
      },
    );

    return () => axiosInstance.interceptors.response.eject(refreshInterceptor);
  }, [whiteList]);

  async function signIn(signInData: SignIn): Promise<void> {
    return axiosInstance
      .post<{ accessToken: string }>("/auth/sign-in", signInData)
      .then((res) => {
        const user = jose.decodeJwt(res.data.accessToken) as User;

        setUser(user);

        StorageUtil.set("user", user);
        sessionStorage.setItem("accessToken", res.data.accessToken);
      })
      .catch(() => {
        throw new Error();
      });
  }

  async function signUp(signUnData: SignUp): Promise<void> {
    return axiosInstance
      .post<{ accessToken: string }>("/auth/sign-up", signUnData)
      .then((res) => {
        const user = jose.decodeJwt(res.data.accessToken) as User;

        setUser(user);
        StorageUtil.set("user", user);
        sessionStorage.setItem("accessToken", res.data.accessToken);
      })
      .catch(() => {
        throw new Error();
      });
  }

  async function signOut(): Promise<void | AxiosResponse<void>> {
    return axiosInstance
      .get("/auth/sign-out")
      .then(() => {
        setUser(initialState);

        StorageUtil.set("user", initialState);
        sessionStorage.setItem("accessToken", "");
      })
      .catch(() => {
        throw new Error();
      });
  }

  function refreshTokens(): Promise<AxiosResponse<{ accessToken: string }>> {
    return axiosInstance.get<{ accessToken: string }>("/auth/refresh-tokens");
  }

  const isLoggedIn = () => !!sessionStorage.getItem("accessToken");
  const isAdmin = () => user.role === Roles.ADMIN;

  return (
    <AuthContext.Provider
      value={{
        sub: Number(user.sub),
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin,
        isLoggedIn,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
