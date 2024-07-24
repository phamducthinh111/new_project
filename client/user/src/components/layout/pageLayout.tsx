// "use client";
import { PropsWithChildren } from "react";
import PageFooter from "./footer/footer";
import PageHeader from "./header/header";
import PageContent from "./content/content";
import './styles.css'

export default function PageLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="page-layout">
      <PageHeader />
      <PageContent>{ children }</PageContent>
      <PageFooter />
    </div>
  );
}
