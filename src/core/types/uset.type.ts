import { Roles } from "./roles.enum.ts";
import { JWTPayload } from "jose";

export interface User extends JWTPayload {
  sub: string;
  email: string;
  name: string;
  role: Roles | null;
}
