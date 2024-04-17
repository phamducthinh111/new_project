"use client";

import { QueryProvider } from "@/configs/QueryProvider";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <QueryProvider>
        { children }
    </QueryProvider>
  );
}
