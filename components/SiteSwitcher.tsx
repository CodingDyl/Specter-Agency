import Link from "next/link";

const concepts = [
  ["Executive", "/executive-editorial"],
  ["Modern", "/modern-counsel"],
  ["Black Label", "/black-label"],
] as const;

export function SiteSwitcher({ active }: { active?: string }) {
  return (
    <nav aria-label="Concept selector" className="bg-[#111214] px-4 py-3">
      <div className="mx-auto flex w-fit items-center gap-1 rounded-xl border border-white/15 bg-[#111214]/95 p-1 text-xs font-semibold text-white shadow-[0_12px_36px_rgba(0,0,0,.24)] backdrop-blur-md">
        <Link className="flex min-h-11 items-center rounded-lg px-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white" href="/" aria-label="View concept overview">
          S
        </Link>
        {concepts.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={active === href ? "page" : undefined}
            className={`flex min-h-11 items-center rounded-lg px-3 transition-colors ${active === href ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
