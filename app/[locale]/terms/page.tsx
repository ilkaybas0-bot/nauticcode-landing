import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LAST_UPDATED = new Date("2026-08-20T00:00:00Z");
const CONTACT_EMAIL = "ilkaybas0@gmail.com";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "terms" });
  return {
    title: { absolute: `${t("title")} — Mogens Software` },
    description: t("metaDescription"),
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: "terms" });
  const formattedDate = new Intl.DateTimeFormat(params.locale, {
    dateStyle: "long",
  }).format(LAST_UPDATED);

  return (
    <>
      <Header />

      <main id="main-content" className="relative pb-24 pt-40 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 font-mono text-xs text-text-secondary">
            {t("lastUpdated", { date: formattedDate })}
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-text-secondary">
            <p>{t("intro")}</p>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("scopeTitle")}
              </h2>
              <p className="mt-2">{t("scopeBody")}</p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("engagementTitle")}
              </h2>
              <p className="mt-2">{t("engagementBody")}</p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("ipTitle")}
              </h2>
              <p className="mt-2">{t("ipBody")}</p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("confidentialityTitle")}
              </h2>
              <p className="mt-2">{t("confidentialityBody")}</p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("liabilityTitle")}
              </h2>
              <p className="mt-2">{t("liabilityBody")}</p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("siteUseTitle")}
              </h2>
              <p className="mt-2">{t("siteUseBody")}</p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("lawTitle")}
              </h2>
              <p className="mt-2">{t("lawBody")}</p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("changesTitle")}
              </h2>
              <p className="mt-2">{t("changesBody")}</p>
            </div>

            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">
                {t("contactTitle")}
              </h2>
              <p className="mt-2">
                {t.rich("contactBody", {
                  link: (chunks) => (
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-accent-cyan hover:underline"
                    >
                      {chunks}
                    </a>
                  ),
                  email: CONTACT_EMAIL,
                })}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
