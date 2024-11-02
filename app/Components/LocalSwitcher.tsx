'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const t = useTranslations();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <label className=''>
      <p className='sr-only'>{t('Navbar.select_language')}</p>
      <Select
        onValueChange={(event: string) => onSelectChange(event)}
        defaultValue={localActive}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
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