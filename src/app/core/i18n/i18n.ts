import axios from 'axios';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { IS_DEV, PUBLIC_PATH } from '../env';
import languagesConfig from './languages';

export interface Language {
  id: string;
  name: string;
}

export const languages = languagesConfig;
export const defaultLanguage = languages[0].id;

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage,
  silentFallbackWarn: true,
  silentTranslationWarn: !IS_DEV,
  formatFallbackMessages: true,
});

function updateLanguage(lang: string): string | null {
  i18n.locale = lang;
  const html = document.querySelector('html');
  if (!html) return null;
  html.setAttribute('lang', lang.substring(0, 2));
  return lang;
}

const loadedLanguages: string[] = [];

export function setLanguage(lang: string): Promise<string | null> {
  if (!lang || !languageExist(lang)) {
    return Promise.resolve(i18n.locale);
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(updateLanguage(lang));
  }

  return axios.get(`${PUBLIC_PATH}i18n/${lang}.json`).then((res) => {
    i18n.setLocaleMessage(lang, res.data);
    loadedLanguages.push(lang);
    return updateLanguage(lang);
  });
}

export const languageExist = (lang: string): boolean => languages.some((language) => language.id === lang);
