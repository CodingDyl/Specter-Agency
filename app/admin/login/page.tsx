import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main id="main-content" className="grid min-h-screen bg-[#090a0b] font-[family-name:var(--font-instrument)] text-[#090a0b] lg:grid-cols-[.92fr_1.08fr]">
      <section className="flex min-h-[38vh] flex-col justify-between border-b border-[#343638] px-5 py-8 text-[#efece5] sm:px-10 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-14 lg:py-12">
        <Link href="/" className="flex min-h-11 w-fit items-center text-[13px] font-semibold tracking-[.34em]">JURIVO</Link>
        <div className="max-w-xl py-16 lg:py-0">
          <h1 className="text-4xl font-semibold tracking-[-.025em] sm:text-5xl">The work behind the work.</h1>
          <p className="mt-6 max-w-[58ch] text-base leading-7 text-[#a4a5a3]">A private workspace for leads, commercial decisions, documents, delivery and recurring client relationships.</p>
        </div>
        <p className="text-sm text-[#777975]">Restricted owner access</p>
      </section>
      <section className="flex items-center bg-[#f3f0e9] px-5 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-semibold tracking-[-.02em]">Sign in</h2>
          <p className="mt-4 leading-7 text-[#565650]">Use the single admin account configured in Supabase Auth.</p>
          {error === "not-authorised" ? <p className="mt-5 border-y border-[#cbc6bc] py-4 text-sm leading-6 text-[#6a3038]">That account does not have the admin role.</p> : null}
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
