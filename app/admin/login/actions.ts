"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type AdminLoginState = { status: "idle" | "error"; message: string };

const loginSchema = z.object({
  email: z.string().trim().email("Enter the admin email address."),
  password: z.string().min(8, "Enter the account password."),
});

export async function signInAdmin(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message || "Check your details." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    return { status: "error", message: "The email or password is incorrect." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    return { status: "error", message: "This account is not authorised for the Jurivo workspace." };
  }

  redirect("/admin");
}
