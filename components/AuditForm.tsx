"use client";

import { useActionState, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { submitAudit, type AuditFormState } from "@/app/actions";

type Variant = "editorial" | "modern" | "black";

const initialState: AuditFormState = { status: "idle", message: "" };

const variantStyles: Record<Variant, { field: string; button: string; status: string }> = {
  editorial: {
    field: "border-[#8c8981] bg-transparent text-[#101112] placeholder:text-[#64625d] focus:border-[#692b35]",
    button: "bg-[#101112] text-[#f4f1ea] hover:bg-[#692b35]",
    status: "text-[#4f222a]",
  },
  modern: {
    field: "border-[#aeb8bb] bg-[#fcfcfa] text-[#121a23] placeholder:text-[#66747d] focus:border-[#274a5d]",
    button: "bg-[#121a23] text-[#f6f7f5] hover:bg-[#274a5d]",
    status: "text-[#274a5d]",
  },
  black: {
    field: "border-[#666862] bg-[#efebe3] text-[#090a0b] placeholder:text-[#62635f] focus:border-white",
    button: "bg-[#efebe3] text-[#090a0b] hover:bg-white",
    status: "text-[#efece5]",
  },
};

export function AuditForm({
  variant,
  concept,
  twoStep = false,
  compact = false,
}: {
  variant: Variant;
  concept: "Executive Editorial" | "Modern Counsel" | "Black Label" | "Specter Website";
  twoStep?: boolean;
  compact?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitAudit, initialState);
  const [step, setStep] = useState<1 | 2>(1);
  const [website, setWebsite] = useState("");
  const styles = variantStyles[variant];
  const fieldClass = `min-h-12 w-full rounded-[4px] border px-4 py-3 text-base outline-none transition-colors duration-200 ${styles.field}`;

  if (twoStep && step === 1) {
    return (
      <div className="space-y-5">
        <label className="block text-sm font-semibold" htmlFor={`${variant}-website-step`}>
          Current website
        </label>
        <input
          id={`${variant}-website-step`}
          className={fieldClass}
          type="url"
          inputMode="url"
          placeholder="https://yourfirm.co.za"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          autoComplete="url"
          required
        />
        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={!website.startsWith("http")}
          className={`flex min-h-12 w-full items-center justify-center gap-3 rounded-[4px] px-5 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45 ${styles.button}`}
        >
          Analyse My Website <ArrowRight aria-hidden="true" size={16} />
        </button>
        <p className="text-sm leading-6 opacity-75">Step 1 of 2 · We’ll use this to prepare the audit.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="concept" value={concept} />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${variant}-company`}>Company website verification</label>
        <input id={`${variant}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2"}>
        <label className="space-y-2 text-sm font-medium">
          <span>Name</span>
          <input className={fieldClass} name="name" autoComplete="name" required />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Law firm</span>
          <input className={fieldClass} name="firm" autoComplete="organization" required />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Work email</span>
          <input className={fieldClass} type="email" name="email" autoComplete="email" required />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Current website</span>
          <input
            className={fieldClass}
            type="url"
            inputMode="url"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            placeholder="https://yourfirm.co.za"
            autoComplete="url"
            required
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Primary practice area</span>
          <input className={fieldClass} name="practiceArea" required />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Growth priority</span>
          <select className={fieldClass} name="priority" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Generate more enquiries</option>
            <option>Improve our website</option>
            <option>Improve Google visibility</option>
            <option>Reposition the firm</option>
            <option>Improve conversion</option>
            <option>Improve enquiry tracking</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`flex min-h-12 w-full items-center justify-center gap-3 rounded-[3px] px-6 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-wait disabled:opacity-60 ${styles.button}`}
      >
        {pending ? <LoaderCircle className="animate-spin" aria-hidden="true" size={18} /> : null}
        {pending ? "Sending request…" : "Request My Growth Audit"}
        {!pending ? <ArrowRight aria-hidden="true" size={16} /> : null}
      </button>

      {twoStep ? (
        <button type="button" className="min-h-11 text-sm underline underline-offset-4" onClick={() => setStep(1)}>
          Change website
        </button>
      ) : null}

      <p
        className={`min-h-6 text-sm leading-6 ${styles.status}`}
        role="status"
        aria-live="polite"
      >
        {state.message}
      </p>
    </form>
  );
}
