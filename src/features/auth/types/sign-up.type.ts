export type SignUp = {
  email: string;
  password: string;
  name: string;
  role: string;
};

export type SignUpForm = SignUp & { confirmPassword: string };
