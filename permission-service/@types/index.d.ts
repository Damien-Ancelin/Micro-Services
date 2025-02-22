import type { JwtPayload } from "jsonwebtoken";

export interface JWTUserData extends JwtPayload {
  id: string;
  role: number;
  email: string;
}