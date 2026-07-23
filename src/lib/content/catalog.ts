import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { CountryCode, Locale } from "@/types/domain";

export type Country = {
  code: CountryCode;
  iso2: "US" | "CL" | "BR" | "MX";
  name: Record<Locale, string>;
  shortLabel: string;
  image: string;
  accent: "cobalt" | "wine" | "emerald" | "ochre";
  imageAlt: Record<Locale, string>;
};

export const countries: readonly Country[] = [
  {
    code: "usa",
    iso2: "US",
    name: {
      ht: "Etazini",
      fr: "États-Unis",
      es: "Estados Unidos",
      pt: "Estados Unidos",
      en: "United States"
    },
    shortLabel: "US",
    image: "/images/editorial/country-usa.png",
    accent: "cobalt",
    imageAlt: {
      ht: "Yon pwofesyonèl ayisyèn nan yon katye iben Ozetazini",
      fr: "Une professionnelle haïtienne dans un quartier urbain aux États-Unis",
      es: "Una profesional haitiana en un barrio urbano de Estados Unidos",
      pt: "Uma profissional haitiana em um bairro urbano dos Estados Unidos",
      en: "A Haitian professional in an urban United States neighborhood"
    }
  },
  {
    code: "chile",
    iso2: "CL",
    name: { ht: "Chili", fr: "Chili", es: "Chile", pt: "Chile", en: "Chile" },
    shortLabel: "CL",
    image: "/images/editorial/country-chile.png",
    accent: "wine",
    imageAlt: {
      ht: "Yon fanm ayisyèn ap mache nan Santiago ak mòn yo dèyè l",
      fr: "Une femme haïtienne marche à Santiago avec les montagnes en arrière-plan",
      es: "Una mujer haitiana camina por Santiago con las montañas al fondo",
      pt: "Uma mulher haitiana caminha por Santiago com as montanhas ao fundo",
      en: "A Haitian woman walking in Santiago with mountains in the distance"
    }
  },
  {
    code: "brazil",
    iso2: "BR",
    name: { ht: "Brezil", fr: "Brésil", es: "Brasil", pt: "Brasil", en: "Brazil" },
    shortLabel: "BR",
    image: "/images/editorial/country-brazil.png",
    accent: "emerald",
    imageAlt: {
      ht: "Yon antreprenè ayisyen nan yon lari vèt nan São Paulo",
      fr: "Un entrepreneur haïtien dans une rue arborée de São Paulo",
      es: "Un emprendedor haitiano en una calle arbolada de São Paulo",
      pt: "Um empreendedor haitiano em uma rua arborizada de São Paulo",
      en: "A Haitian entrepreneur on a leafy street in São Paulo"
    }
  },
  {
    code: "mexico",
    iso2: "MX",
    name: { ht: "Meksik", fr: "Mexique", es: "México", pt: "México", en: "Mexico" },
    shortLabel: "MX",
    image: "/images/editorial/country-mexico.png",
    accent: "ochre",
    imageAlt: {
      ht: "Yon jèn pwofesyonèl ayisyen ap li nan vil Meksiko",
      fr: "Un jeune professionnel haïtien lit dans les rues de Mexico",
      es: "Un joven profesional haitiano lee en las calles de Ciudad de México",
      pt: "Um jovem profissional haitiano lê nas ruas da Cidade do México",
      en: "A young Haitian professional reading in Mexico City"
    }
  }
] as const;

export const countrySectionKeys = [
  "overview",
  "who-it-may-suit",
  "who-it-may-not-suit",
  "legal-pathways",
  "community-reality",
  "work",
  "cost-of-living",
  "banking",
  "housing",
  "study",
  "health",
  "first-30-days",
  "risks",
  "services",
  "sources"
] as const;

export type CountrySectionKey = (typeof countrySectionKeys)[number];

export function isCountryCode(value: string): value is CountryCode {
  return countries.some((country) => country.code === value);
}

export function getCountry(code: CountryCode): Country {
  const country = countries.find((item) => item.code === code);
  if (!country) throw new Error("Unknown country code");
  return country;
}

export function getCountrySections(
  dictionary: Dictionary
): readonly { key: CountrySectionKey; label: string }[] {
  return [
    { key: "overview", label: dictionary.common.simple_summary },
    { key: "who-it-may-suit", label: dictionary.country.may_suit },
    { key: "who-it-may-not-suit", label: dictionary.country.may_not_suit },
    { key: "legal-pathways", label: dictionary.country.legal_pathways },
    { key: "community-reality", label: dictionary.country.community_reality },
    { key: "work", label: dictionary.country.work },
    { key: "cost-of-living", label: dictionary.country.cost },
    { key: "banking", label: dictionary.country.banking },
    { key: "housing", label: dictionary.country.housing },
    { key: "study", label: dictionary.country.education },
    { key: "health", label: dictionary.country.health },
    { key: "first-30-days", label: dictionary.country.first_30_days },
    { key: "risks", label: dictionary.country.scams },
    { key: "services", label: dictionary.nav.packages },
    { key: "sources", label: dictionary.common.sources }
  ];
}
