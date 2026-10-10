"use client";

import { useActionState } from "react";

import { Arrow, HoverSparkle, buttonClass } from "@/components/Button";
import { projectTypes } from "@/data/site";
import { sendContact, type ContactState } from "./actions";

const input =
  "w-full rounded-2xl border-[3px] border-ink bg-surface px-4 py-3 text-lg transition-shadow placeholder:text-fg/40 focus:shadow-pop-sm focus:outline-none aria-[invalid=true]:border-coral";
const label = "mb-2 block font-display text-lg font-bold uppercase";

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-2 font-semibold text-[#c2243a] dark:text-coral">
      {text}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[2rem] border-[3px] border-ink bg-mint p-10 text-center text-ink shadow-pop">
        <p className="font-display text-4xl font-bold uppercase">Woohoo!</p>
        <p className="mt-3 text-lg">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className={input}
          aria-invalid={!!state.errors?.name}
          aria-describedby="name-error"
        />
        <FieldError id="name-error" text={state.errors?.name} />
      </div>
      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={input}
          aria-invalid={!!state.errors?.email}
          aria-describedby="email-error"
        />
        <FieldError id="email-error" text={state.errors?.email} />
      </div>
      <div>
        <label htmlFor="company" className={label}>
          Company / Organization
        </label>
        <input id="company" name="company" autoComplete="organization" className={input} />
      </div>
      <div>
        <label htmlFor="type" className={label}>
          Project type
        </label>
        <div className="relative">
          <select id="type" name="type" className={`${input} appearance-none pr-12`} defaultValue="Realms">
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your idea..."
          className={input}
          aria-invalid={!!state.errors?.message}
          aria-describedby="message-error"
        />
        <FieldError id="message-error" text={state.errors?.message} />
      </div>
      {/* Honeypot for bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col items-start gap-4 sm:col-span-2">
        {state.status === "error" && state.message && (
          <p role="alert" className="rounded-2xl border-[3px] border-ink bg-coral/30 px-4 py-3 font-semibold">
            {state.message}
          </p>
        )}
        <button type="submit" disabled={pending} className={`${buttonClass("primary", "lg")} disabled:opacity-60`}>
          {pending ? "Sending..." : "Send message"} <Arrow />
          <HoverSparkle />
        </button>
      </div>
    </form>
  );
}
