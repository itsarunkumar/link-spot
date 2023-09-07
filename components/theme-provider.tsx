"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { NextUIProvider } from "@nextui-org/react";

export function NextUIProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
