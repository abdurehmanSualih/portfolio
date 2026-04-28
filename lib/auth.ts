import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "admin_token";
const EXPIRES_IN = "7d";

export interface AdminPayload {
  id: string;
  email: string;
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
