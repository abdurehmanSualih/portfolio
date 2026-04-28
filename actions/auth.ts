"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, COOKIE_NAME } from "@/lib/auth";

const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type ActionResult = { success: boolean; error?: string };

export async function signIn(data: { email: string; password: string }): Promise<ActionResult> {
  const parsed = SignInSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  const admin = await prisma.admin.findUnique({
    where: { email: parsed.data.email },
  });

  if (!admin) {
    return { success: false, error: "Invalid credentials" };
  }

  const valid = await bcrypt.compare(parsed.data.password, admin.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid credentials" };
  }

  const token = signToken({ id: admin.id, email: admin.email });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
