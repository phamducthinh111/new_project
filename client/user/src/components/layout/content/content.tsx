import { PropsWithChildren } from "react";

export default function PageContent({ children }: Readonly<PropsWithChildren>) {
    return (
        <div className="text-slate-50 min-h-screen">
          { children }
        </div>
    );
  }