"use client";

import "./globals.css";
import {Provider as JotaiProvider} from "jotai";
import {useRouter} from "next/navigation";
import type {ReactNode} from "react";
import {Provider as SpectrumProvider} from '@react-spectrum/s2';

import myStore from "@/atoms/store";
import {useLocale} from "@heroui/react";

interface ProvidersProps {
    children: ReactNode;
    locale?: string;
}

export function Provider({children}: ProvidersProps) {
    const router = useRouter();
    const preferredLanguage = useLocale();

    return (
        <JotaiProvider store={myStore}>
            <SpectrumProvider locale={preferredLanguage.locale} elementType="html" router={{navigate: router.push}}>
                {children}
            </SpectrumProvider>
        </JotaiProvider>
    );
}
