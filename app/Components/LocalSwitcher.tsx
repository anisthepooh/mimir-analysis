'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define a type for supported locales
type Locale = 'da' | 'en';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale() as Locale; // Assume `useLocale` returns a valid `Locale`
  const t = useTranslations();

  const onSelectChange = (nextLocale: Locale) => {
    const normalizedPathname = pathname.replace(`/${localActive}`, '');

    startTransition(() => {
      router.replace(`/${nextLocale}${normalizedPathname}`);
    });
  };

  return (
    <label>
      <p className="sr-only">{t('Navbar.select_language')}</p>
      <Select
        onValueChange={(value) => onSelectChange(value as Locale)}
        defaultValue={localActive}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('Navbar.select_language')}</SelectLabel>
            <SelectItem value="da">🇩🇰 {t("danish")}</SelectItem>
            <SelectItem value="en">🇬🇧 {t("english")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  );
}
