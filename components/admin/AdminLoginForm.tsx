"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { signInAdmin, type AdminLoginState } from "@/app/admin/login/actions";

const initialState: AdminLoginState = { status: "idle", message: "" };
const inputClass = "min-h-12 w-full rounded-[4px] border border-[#77746e] bg-[#f3f0e9] px-4 text-base text-[#090a0b] outline-none transition-colors duration-200 focus:border-[#6a3038]";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(signInAdmin, initialState);

  return (
    <form action={action} className="mt-10 space-y-5">
      <label className="block space-y-2 text-sm font-semibold">
        <span>Email</span>
        <input className={inputClass} type="email" name="email" autoComplete="username" required />
      </label>
      <label className="block space-y-2 text-sm font-semibold">
        <span>Password</span>
        <input className={inputClass} type="password" name="password" autoComplete="current-password" minLength={8} required />
      </label>
      <button type="submit" disabled={pending} className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-[2px] bg-[#090a0b] px-6 text-sm font-semibold text-[#efece5] transition-colors duration-200 hover:bg-[#6a3038] disabled:cursor-wait disabled:opacity-60">
        {pending ? <LoaderCircle className="animate-spin" size={18} aria-hidden="true" /> : null}
        {pending ? "Signing in…" : "Open Jurivo Workspace"}
        {!pending ? <ArrowRight size={16} aria-hidden="true" /> : null}
      </button>
      <p className="min-h-6 text-sm leading-6 text-[#6a3038]" role="status" aria-live="polite">{state.message}</p>
    </form>
  );
}
