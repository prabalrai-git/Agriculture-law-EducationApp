import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from '../Languages/locales/En/translationEn.json'
import translationNp from '../Languages/locales/Np/translationNp.json'

const resources = {
    En: {
        translation: translationEn
    },
    Np: {
        translation: translationNp
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: "Np",

        interpolation: {
            escapeValue: false // react already safes from xss
        },
        react: {
            useSuspense: false //   <---- this will do the magic
        }
    });

export default i18n;