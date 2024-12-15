"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: { en: "English", ar: "الإنجليزية" } },
  { code: "ar", name: { en: "Arabic", ar: "العربية" } },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { lang }: { lang: "en" | "ar" } = useTranslation();

  const handleLanguageChange = (newLang: string) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    router.push(`/${newLang}${window.location.pathname.substring(3)}`);
  };

  return (
    <div className="flex items-center gap-2 ">
      <Select value={lang} onValueChange={handleLanguageChange}>
        <SelectTrigger className=" text-secondaryColor border-none bg-white rounded-[8px]  focus:ring-0 ">
          <div className="flex  items-center justify-start gap-3">
            <Globe className="h-5 w-5" />
            <span className="text-lg">
              {languages.find((l) => l.code === lang)?.name[lang]}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white  border-none">
          <SelectGroup>
            {languages.map((language) => (
              <SelectItem
                key={language.code}
                value={language.code}
                className="cursor-pointer"
              >
                {language.name[lang]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
