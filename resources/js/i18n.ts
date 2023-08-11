import { createI18n } from 'vue-i18n';
// import store from './store/store';

const defaultLang = 'en';
const i18n = createI18n({
    fallbackLocale: defaultLang,
});
export const importLanguage = async (language: string) => {
    const json = await import(/* webpackChunkName: "i18n/[request]" */ `./langs/${language}.json`);
    i18n.global.setLocaleMessage(language, json.default);
};
importLanguage(defaultLang);
export default i18n;
export const { t } = i18n.global;
