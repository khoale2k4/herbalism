"use client";
import "./globals.css";
import Image from "next/image";
import { Suspense } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import { FormattedMessage, IntlProvider } from 'react-intl';
type LanguageMessages = {
  [key: string]: any;
}
export default function layoutStructure({
  childrenProps,
}: {
  childrenProps: React.ReactNode;
}) {
  return (
    <Suspense >{childrenProps}</Suspense>
  );
}
