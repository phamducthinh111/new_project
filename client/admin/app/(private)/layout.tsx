"use client";

import Dashbroad from "@/components/menu/dashbroad";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <Dashbroad>{ children }</Dashbroad>
  );
}
