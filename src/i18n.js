import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

// Locales

import enLocale from './locales/en.json'
import ruLocale from './locales/ru.json'

export const SUPPORT_LOCALES = {
    "en": enLocale,
    "ru": ruLocale
};

export function setupI18n(options = { locale: "en" }) {
    const i18n = createI18n(options)
    
    loadLocaleMessages(i18n, options.locale)

    setI18nLanguage(i18n, options.locale)

    return i18n;
}

export function setI18nLanguage(i18n, locale) {
    if (i18n.mode === "legacy") {
        i18n.global.locale = locale;
    } else {
        i18n.global.locale.value = locale;
    }
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    /* document.querySelector("html").setAttribute("lang", locale); */    
}

export async function loadLocaleMessages(i18n, locale) {
    if(!(locale in SUPPORT_LOCALES)) return

    const messages = SUPPORT_LOCALES[locale]

    // set locale and locale message
    i18n.global.setLocaleMessage(locale, messages)

    localStorage.monka_locale = locale

    return nextTick();
}
