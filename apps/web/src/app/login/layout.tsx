import { getDictionary } from '@/lib/i18n/get-dictionary';
import { LocaleProvider } from '@/lib/i18n/locale-context';
import { getLocale } from '@/lib/i18n/server';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const dictionary = getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
      <div className="flex justify-end p-4">
        <LanguageSwitcher />
      </div>
      {children}
    </LocaleProvider>
  );
}
