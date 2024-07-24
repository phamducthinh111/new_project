import PageLayout from "@/components/layout/pageLayout";
import Layout from "antd/es/layout/layout";
import { PropsWithChildren } from "react";

export default function LayoutPublict ({ children }: Readonly<PropsWithChildren>) {
    return (
        <PageLayout>
            { children }
        </PageLayout>
    );
}