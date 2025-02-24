import { Roles } from "../../../core/types/roles.enum.ts";
import { SignIn } from "../types/sign-in.type.ts";
import { SignUp } from "../types/sign-up.type.ts";
import { createContext, useContext } from "react";
import { AxiosResponse } from "axios";

export interface AuthContextType {
  sub: number;
  name: string;
  email: string;
  role: Roles | null;
  isAdmin: () => boolean;
  isLoggedIn: () => boolean;
  signIn: (signInData: SignIn) => Promise<void>;
  signUp: (signUpData: SignUp) => Promise<void>;
  signOut: () => Promise<void | AxiosResponse<void>>;
}

export const AuthContext = createContext<AuthContextType>({
  sub: 0,
  name: "",
  email: "",
  role: null,
  isAdmin: () => false,
  isLoggedIn: () => false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth: () => AuthContextType = () => {
  const authContext = useContext<AuthContextType>(AuthContext);

  if (!authContext)
    throw new Error("useAuth must be used withing an AuthContext");

  return authContext;
};
