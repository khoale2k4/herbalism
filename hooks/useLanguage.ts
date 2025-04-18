'use client';

import vi from '../language/vi';
import en from '../language/en';

export const useLanguage = () => {
    const getLang = () => {
        if (typeof window !== 'undefined') {
            const lang = localStorage.getItem('i18nextLng') || 'en';
            return lang === 'en' ? en : vi;
        }
        return en;
    };

    const t = getLang();

    const currentLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : 'en';

    const changeLanguage = (lang: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('i18nextLng', lang);
            window.location.reload();
        }
    };

    return {
        t,
        currentLang,
        changeLanguage
    };
};