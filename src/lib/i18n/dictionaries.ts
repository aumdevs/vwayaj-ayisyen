import en from "../../../content/ui-copy/en.json";
import es from "../../../content/ui-copy/es.json";
import fr from "../../../content/ui-copy/fr.json";
import ht from "../../../content/ui-copy/ht.json";
import pt from "../../../content/ui-copy/pt.json";
import type { Locale } from "@/types/domain";

export type Dictionary = typeof ht;

const dictionaries: Record<Locale, Dictionary> = { ht, fr, es, pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
