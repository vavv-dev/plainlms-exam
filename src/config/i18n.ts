import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// locale files
import commonEn from '@/locale/en/common.json';
import commonKo from '@/locale/ko/common.json';

// add locale files here
import examKo from '@/locale/ko/exam.json';
import layoutKo from '@/locale/ko/layout.json';
import accountKo from '@/locale/ko/account.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common', 'exam'],
    defaultNS: 'common',
    // lng: detected browserLanguage,
    fallbackLng: 'ko',
    interpolation: { escapeValue: false },
    resources: {
      // add locale files here
      en: { common: commonEn },
      ko: { common: commonKo, exam: examKo, layout: layoutKo, account: accountKo },
    },
    // keySeparator: false,
    allowObjectInHTMLChildren: true,
    react: {
      useSuspense: true,
    },
  } as InitOptions);

export default i18n;
