"use client";

import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type NestedTranslations = {
  [key: string]: string | NestedTranslations;
};

export function useTranslation() {
  const params = useParams();
  const lang = (params.lang as "en" | "ar") || "en";

  const translations: NestedTranslations = useMemo(() => {
    try {
      return require(`@/translations/${lang}.json`);
    } catch (error) {
      console.warn(
        `Translation file for ${lang} not found, falling back to English`
      );
      return require("@/translations/en.json");
    }
  }, [lang]);

  const t = useCallback(
    (key: string, ...args: (string | number)[]) => {
      const keys = key.split(".");
      let value: string | NestedTranslations | undefined = translations;

      for (const k of keys) {
        if (typeof value === "object" && value !== null) {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }

      if (typeof value === "string") {
        return value.replace(/{(\d+)}/g, (_, index) =>
          String(args[Number(index)] ?? "")
        );
      }

      console.warn(`Translation key "${key}" not found`);
      return key;
    },
    [translations]
  );

  return { t, lang };
}
