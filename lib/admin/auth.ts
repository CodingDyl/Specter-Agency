import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || !userId) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, display_name, role")
    .eq("id", userId)
    .single();

  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-authorised");
  }

  return { supabase, userId, profile };
}
