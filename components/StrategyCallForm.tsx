"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, LoaderCircle } from "lucide-react";
import {
  submitStrategyCall,
  type StrategyCallFormState,
} from "@/app/strategy-call/actions";

const initialState: StrategyCallFormState = { status: "idle", message: "" };
const fieldClass =
  "min-h-12 w-full rounded-[4px] border border-[#666862] bg-[#efebe3] px-4 py-3 text-base text-[#090a0b] outline-none placeholder:text-[#62635f] transition-colors duration-200 focus:border-white aria-[invalid=true]:border-[#c49098]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <span id={id} className="block text-sm leading-6 text-[#dcaeb5]">{message}</span>;
}

export function StrategyCallForm() {
  const [state, formAction, pending] = useActionState(submitStrategyCall, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const errorFor = (name: string) => state.fieldErrors?.[name]?.[0];

  useEffect(() => {
    if (!state.fieldErrors) return;
    formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-10">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="strategy-company">Company website verification</label>
        <input id="strategy-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="space-y-5">
        <legend className="mb-5 font-[family-name:var(--font-bodoni)] text-2xl">Firm context</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            <span>Name</span>
            <input
              className={fieldClass}
              name="name"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              aria-invalid={Boolean(errorFor("name"))}
              aria-describedby={errorFor("name") ? "strategy-name-error" : undefined}
              required
            />
            <FieldError id="strategy-name-error" message={errorFor("name")} />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Law firm</span>
            <input
              className={fieldClass}
              name="firm"
              autoComplete="organization"
              minLength={2}
              maxLength={140}
              aria-invalid={Boolean(errorFor("firm"))}
              aria-describedby={errorFor("firm") ? "strategy-firm-error" : undefined}
              required
            />
            <FieldError id="strategy-firm-error" message={errorFor("firm")} />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Work email</span>
            <input
              className={fieldClass}
              type="email"
              name="email"
              autoComplete="email"
              maxLength={160}
              aria-invalid={Boolean(errorFor("email"))}
              aria-describedby={errorFor("email") ? "strategy-email-error" : undefined}
              required
            />
            <FieldError id="strategy-email-error" message={errorFor("email")} />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Direct number <span className="font-normal text-[#a4a5a3]">(optional)</span></span>
            <input
              className={fieldClass}
              type="tel"
              name="phone"
              autoComplete="tel"
              maxLength={40}
              aria-invalid={Boolean(errorFor("phone"))}
              aria-describedby={errorFor("phone") ? "strategy-phone-error" : undefined}
            />
            <FieldError id="strategy-phone-error" message={errorFor("phone")} />
          </label>
          <label className="space-y-2 text-sm font-medium sm:col-span-2">
            <span>Current website <span className="font-normal text-[#a4a5a3]">(optional)</span></span>
            <input
              className={fieldClass}
              type="url"
              inputMode="url"
              name="website"
              placeholder="https://yourfirm.co.za"
              autoComplete="url"
              maxLength={200}
              aria-invalid={Boolean(errorFor("website"))}
              aria-describedby={errorFor("website") ? "strategy-website-error" : undefined}
            />
            <FieldError id="strategy-website-error" message={errorFor("website")} />
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t border-[#343638] pt-8">
        <legend className="mb-5 translate-y-8 bg-[#090a0b] pr-4 font-[family-name:var(--font-bodoni)] text-2xl">Project direction</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            <span>Priority practice area</span>
            <input
              className={fieldClass}
              name="practiceArea"
              minLength={2}
              maxLength={180}
              aria-invalid={Boolean(errorFor("practiceArea"))}
              aria-describedby={errorFor("practiceArea") ? "strategy-practice-error" : undefined}
              required
            />
            <FieldError id="strategy-practice-error" message={errorFor("practiceArea")} />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>What needs to move?</span>
            <select
              className={fieldClass}
              name="projectNeed"
              defaultValue=""
              aria-invalid={Boolean(errorFor("projectNeed"))}
              aria-describedby={errorFor("projectNeed") ? "strategy-project-error" : undefined}
              required
            >
              <option value="" disabled>Select the closest fit</option>
              <option>A new law-firm website</option>
              <option>A strategic website redesign</option>
              <option>A new practice-area launch</option>
              <option>A website and visibility system</option>
            </select>
            <FieldError id="strategy-project-error" message={errorFor("projectNeed")} />
          </label>
        </div>
        <label className="block space-y-2 text-sm font-medium">
          <span>What is driving the urgency?</span>
          <textarea
            className={`${fieldClass} min-h-36 resize-y`}
            name="urgency"
            minLength={20}
            maxLength={1000}
            placeholder="Tell us what changed, what the current website is holding back, and what the firm needs this project to make possible."
            aria-invalid={Boolean(errorFor("urgency"))}
            aria-describedby={errorFor("urgency") ? "strategy-urgency-error" : "strategy-urgency-help"}
            required
          />
          <span id="strategy-urgency-help" className="block text-sm leading-6 text-[#a4a5a3]">Do not include confidential client or matter information.</span>
          <FieldError id="strategy-urgency-error" message={errorFor("urgency")} />
        </label>
      </fieldset>

      <fieldset className="space-y-5 border-t border-[#343638] pt-8">
        <legend className="mb-5 translate-y-8 bg-[#090a0b] pr-4 font-[family-name:var(--font-bodoni)] text-2xl">Readiness</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            <span>When do you want to start?</span>
            <select
              className={fieldClass}
              name="desiredStart"
              defaultValue=""
              aria-invalid={Boolean(errorFor("desiredStart"))}
              aria-describedby={errorFor("desiredStart") ? "strategy-start-error" : undefined}
              required
            >
              <option value="" disabled>Select a starting window</option>
              <option>As soon as responsibly possible</option>
              <option>Within 1–2 months</option>
              <option>Within 3 months</option>
              <option>Timing needs discussion</option>
            </select>
            <FieldError id="strategy-start-error" message={errorFor("desiredStart")} />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Your role in the decision</span>
            <select
              className={fieldClass}
              name="decisionRole"
              defaultValue=""
              aria-invalid={Boolean(errorFor("decisionRole"))}
              aria-describedby={errorFor("decisionRole") ? "strategy-role-error" : undefined}
              required
            >
              <option value="" disabled>Select your role</option>
              <option>I can approve this project</option>
              <option>I am part of the decision</option>
              <option>I am preparing options for the partners</option>
            </select>
            <FieldError id="strategy-role-error" message={errorFor("decisionRole")} />
          </label>
          <label className="space-y-2 text-sm font-medium sm:col-span-2">
            <span>Investment readiness</span>
            <select
              className={fieldClass}
              name="investmentReadiness"
              defaultValue=""
              aria-invalid={Boolean(errorFor("investmentReadiness"))}
              aria-describedby={errorFor("investmentReadiness") ? "strategy-investment-error" : undefined}
              required
            >
              <option value="" disabled>Select the closest fit</option>
              <option>Investment is allocated</option>
              <option>We need a scoped proposal</option>
              <option>We need guidance on the right scope</option>
            </select>
            <FieldError id="strategy-investment-error" message={errorFor("investmentReadiness")} />
          </label>
        </div>
      </fieldset>

      <div className="grid gap-5 border-t border-[#343638] pt-7 sm:grid-cols-[1fr_auto] sm:items-center">
        <p className="max-w-xl text-sm leading-6 text-[#a4a5a3]">
          Sending this brief asks Jurivo to contact you about this project. When online scheduling is available, it opens after the brief is delivered.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-[2px] bg-[#efece5] px-6 py-3 text-sm font-semibold text-[#090a0b] transition-colors duration-200 hover:bg-white disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? <LoaderCircle className="animate-spin" aria-hidden="true" size={18} /> : null}
          {pending ? "Sending brief…" : "Send Strategy Brief"}
          {!pending ? <ArrowRight aria-hidden="true" size={16} /> : null}
        </button>
      </div>

      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="min-h-6 leading-6 text-[#efece5]" role="status" aria-live="polite">
          {state.message}
        </p>
        <Link className="inline-flex min-h-11 w-fit items-center text-[#c49098] underline underline-offset-4" href="/#audit">
          Still exploring? Request a Growth Audit
        </Link>
      </div>
    </form>
  );
}
