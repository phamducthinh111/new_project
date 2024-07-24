"use client";
import { PropsWithChildren } from "react";

export default function PageContent({ children }: Readonly<PropsWithChildren>) {
    return (
        <div className="bg-stone-700 bg-opacity-80 text-slate-50 min-h-screen m-10 mb-10">
          { children }
        </div>
    );
  }