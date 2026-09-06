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
  }
] as const;

export function isCountryCode(value: string): value is CountryCode {
  return countries.some((country) => country.code === value);
}

export function getCountry(code: CountryCode): Country {
  const country = countries.find((item) => item.code === code);
  if (!country) throw new Error("Unknown country code");
  return country;
}
