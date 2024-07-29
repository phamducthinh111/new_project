import PageLayout from "@/components/layout/pageLayout";
import { PropsWithChildren } from "react";

export default function LayoutPublict ({ children }: Readonly<PropsWithChildren>) {
    return (
        <PageLayout>
            { children }
        </PageLayout>
    );
}