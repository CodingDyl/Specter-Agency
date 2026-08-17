import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin();
  return <AdminShell profile={profile}>{children}</AdminShell>;
}
