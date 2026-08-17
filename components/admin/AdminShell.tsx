import Link from "next/link";
import { BriefcaseBusiness, FileCheck2, FileText, FolderKanban, Gauge, LogOut, ServerCog } from "lucide-react";
import { signOutAdmin } from "@/app/admin/actions";

const links = [
  ["Overview", "/admin", Gauge],
  ["Pipeline", "/admin/pipeline", BriefcaseBusiness],
  ["Quotes", "/admin/quotes", FileText],
  ["Agreements", "/admin/agreements", FileCheck2],
  ["Projects", "/admin/projects", FolderKanban],
  ["Services", "/admin/projects#services", ServerCog],
] as const;

export function AdminShell({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: { email: string; display_name: string | null };
}) {
  return (
    <div className="min-h-screen bg-[#ece9e2] font-[family-name:var(--font-instrument)] text-[#090a0b] [--focus:#6a3038] lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="bg-[#090a0b] text-[#efece5] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="flex min-h-20 items-center justify-between border-b border-[#343638] px-5 lg:px-7">
          <Link href="/admin" className="flex min-h-11 items-center text-[13px] font-semibold tracking-[.34em]">JURIVO</Link>
          <span className="text-xs text-[#777975] lg:hidden">Owner workspace</span>
        </div>
        <nav aria-label="Admin navigation" className="flex gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-visible lg:px-4 lg:py-6">
          {links.map(([label, href, Icon]) => (
            <Link key={href} href={href} className="flex min-h-11 shrink-0 items-center gap-3 rounded-[2px] px-3 text-sm text-[#b9b7b1] transition-colors duration-200 hover:bg-[#181a1c] hover:text-white">
              <Icon size={17} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto hidden border-t border-[#343638] p-4 lg:block">
          <p className="truncate px-3 text-xs text-[#777975]">{profile.display_name || profile.email}</p>
          <form action={signOutAdmin}>
            <button className="mt-3 flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-[2px] px-3 text-sm text-[#b9b7b1] transition-colors duration-200 hover:bg-[#181a1c] hover:text-white">
              <LogOut size={17} aria-hidden="true" /> Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
