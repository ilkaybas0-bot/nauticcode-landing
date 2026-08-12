"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, TerminalSquare } from "lucide-react";

type FieldKey = "name" | "email" | "company" | "project";

type Field = {
  key: FieldKey;
  prompt: string;
  placeholder: string;
  type: "text" | "email";
};

const FIELDS: Field[] = [
  { key: "name", prompt: "your name?", placeholder: "Jane Doe", type: "text" },
  {
    key: "email",
    prompt: "work email?",
    placeholder: "jane@company.com",
    type: "email",
  },
  {
    key: "company",
    prompt: "company name?",
    placeholder: "Acme Logistics",
    type: "text",
  },
  {
    key: "project",
    prompt: "what are you looking to build?",
    placeholder: "AI dispatch agent, internal tooling, migration…",
    type: "text",
  },
];

export default function FooterCTA() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    company: "",
    project: "",
  });
  const [value, setValue] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const field = FIELDS[step];
  const isLast = step === FIELDS.length - 1;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || submitting) return;

    const next = { ...answers, [field.key]: value.trim() };
    setAnswers(next);
    setError(null);

    if (!isLast) {
      setValue("");
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...next, website: honeypot }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-grid bg-radial-fade opacity-60 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Ready to <span className="text-gradient">Modernize</span> Your
          Software Stack?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mt-4 max-w-xl text-base text-text-secondary"
        >
          Run the audit. A senior engineer reviews your stack and replies
          within one business day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="glass mx-auto mt-12 max-w-xl overflow-hidden rounded-xl text-left shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-border bg-black/20 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-text-secondary">
              <TerminalSquare size={12} />
              npm run book-audit
            </span>
            {!submitted && (
              <span className="ml-auto font-mono text-[11px] text-text-secondary">
                [{step + 1}/{FIELDS.length}]
              </span>
            )}
          </div>

          <div className="min-h-[220px] px-5 py-6 font-mono text-[13px] leading-relaxed">
            {FIELDS.slice(0, step).map((f) => (
              <p key={f.key} className="text-text-secondary">
                <span className="text-emerald-400">✓</span> {f.prompt}{" "}
                <span className="text-text-primary">{answers[f.key]}</span>
              </p>
            ))}

            {!submitted ? (
              <motion.form
                key={field.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="mt-1"
              >
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <label htmlFor={field.key} className="block text-accent-cyan">
                  {"> "}
                  {field.prompt}
                </label>
                <div className="mt-2 flex items-center gap-2 border-b border-border pb-2">
                  <span className="text-text-secondary">$</span>
                  <input
                    id={field.key}
                    type={field.type}
                    required
                    autoFocus
                    disabled={submitting}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent text-text-primary placeholder:text-text-secondary/40 focus:outline-none disabled:opacity-50"
                  />
                </div>

                {error && (
                  <p className="mt-3 text-red-400">
                    <span aria-hidden>✗</span> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-5 inline-flex items-center gap-2 rounded-md bg-accent-cyan px-4 py-2 font-mono text-xs font-semibold text-bg shadow-glow-cyan transition-all hover:shadow-glow-cyan-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      Sending
                      <Loader2 size={14} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      {isLast ? "Submit request" : "Next"}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start gap-3 pt-2"
              >
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 size={16} />
                  <span>audit request received</span>
                </div>
                <p className="text-text-secondary">
                  Thanks, {answers.name.split(" ")[0]} — we&apos;ll reach out
                  to {answers.email} within one business day.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
