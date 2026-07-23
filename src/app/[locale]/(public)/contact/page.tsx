import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, LockKeyhole, MessagesSquare, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getExperienceCopy } from "@/lib/i18n/experience-copy";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getProductCopy } from "@/lib/i18n/product-copy";

type ContactPageProps = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const experience = getExperienceCopy(locale);
  const copy = getProductCopy(locale);

  return (
    <>
      <section className="page-hero page-hero-contact">
        <div className="shell page-hero-inner">
          <p className="eyebrow">{experience.advisor}</p>
          <h1>{copy.contactTitle}</h1>
          <p className="page-lede">{copy.contactBody}</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="narrow-shell contact-availability">
          <span className="contact-availability-icon" aria-hidden="true">
            <MessagesSquare size={30} />
          </span>
          <p className="eyebrow">{experience.comingSoon}</p>
          <h2>{experience.states.unavailableTitle}</h2>
          <p>{experience.states.unavailableBody}</p>
          <div className="contact-security-note">
            <ShieldCheck aria-hidden="true" size={21} />
            <div>
              <strong>{dictionary.security.do_not_share}</strong>
              <p>{dictionary.assessment.privacy}</p>
            </div>
          </div>
          <div className="button-row">
            <Link className="button" href={localizedPath(locale, "compare")}>
              {experience.home.secondary} <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link className="button button-secondary" href={localizedPath(locale, "guides")}>
              {dictionary.nav.guides}
            </Link>
          </div>
          <small>
            <LockKeyhole aria-hidden="true" size={15} /> {copy.privacyFirstBody}
          </small>
        </div>
      </section>
    </>
  );
}
