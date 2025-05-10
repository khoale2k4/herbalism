// components/FontWrapper.tsx
'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function FontWrapper({ children }: { children: React.ReactNode }) {
    const { currentLang } = useLanguage();

    const fontClass = {
        vi: 'font-sans', // custom font cho tiếng Việt
        en: '',          // giữ mặc định
    }[currentLang ?? "en"] ?? '';

    console.log(currentLang, fontClass)

    return <div className={fontClass}>{children}</div>;
}
