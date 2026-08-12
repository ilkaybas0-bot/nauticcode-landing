import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NauticCode collects, uses, and protects your data.",
};

const LAST_UPDATED = "August 12, 2026";
const CONTACT_EMAIL = "ilkaybas0@gmail.com";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />

      <section className="relative pb-24 pt-40 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
            Legal
          </span>
          <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-xs text-text-secondary">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-text-secondary">
            <p>
              This policy explains what data NauticCode collects through
              this website, why we collect it, and how you can control it.
              We built this site to be honest about it: we collect the
              minimum needed to respond to your engineering audit request,
              nothing more.
            </p>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                What we collect
              </h2>
              <p className="mt-2">
                When you submit the audit request form, we collect the
                information you type in: your name, work email, company
                name, and a description of what you want to build. We don&apos;t
                collect this data anywhere else on the site — there are no
                other forms, and we don&apos;t track you across other sites.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                Analytics
              </h2>
              <p className="mt-2">
                We use Vercel Analytics to understand aggregate traffic
                (pages viewed, approximate location by country, referrers).
                It doesn&apos;t use cookies and doesn&apos;t collect
                personally identifiable information.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                Why we collect it
              </h2>
              <p className="mt-2">
                Solely to respond to your audit request — to understand
                what you&apos;re looking to build and get back to you within
                one business day, as promised on the form.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                How it&apos;s processed
              </h2>
              <p className="mt-2">
                Form submissions are sent as an email via{" "}
                <a
                  href="https://resend.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-cyan hover:underline"
                >
                  Resend
                </a>
                , our email delivery provider, to our inbox. Resend
                processes the message on our behalf and does not use your
                data for any purpose of its own. The site itself is hosted
                on Vercel.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                Retention
              </h2>
              <p className="mt-2">
                We keep audit request emails only as long as needed to
                respond to you and maintain a basic business record of the
                conversation. If you&apos;d like your data deleted sooner,
                contact us and we&apos;ll remove it.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                Your rights
              </h2>
              <p className="mt-2">
                You can ask us what data we hold about you, ask us to
                correct it, or ask us to delete it, at any time. We don&apos;t
                sell your data or share it with anyone beyond the
                processors named above.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                Changes to this policy
              </h2>
              <p className="mt-2">
                If this policy changes, we&apos;ll update the date at the top
                of this page.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                Contact
              </h2>
              <p className="mt-2">
                Questions about your data? Reach us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent-cyan hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
