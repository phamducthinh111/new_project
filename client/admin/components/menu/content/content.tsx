"use client";

import { Breadcrumb, Layout } from "antd";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
const { Content } = Layout;


const MenuContent = ({ children }: Readonly<PropsWithChildren>) => {
  const pathname = usePathname();
  const pathSnippets = pathname.split("/").filter((i) => i);

  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link href="/dashboard">
        <HomeOutlined />
      </Link>
    </Breadcrumb.Item>,
  ].concat(
    pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const isLast = index === pathSnippets.length - 1;
      return (
        <Breadcrumb.Item key={url}>
          {isLast ? (
            snippet
          ) : (
            <Link href={url}>{decodeURIComponent(snippet)}</Link>
          )}
        </Breadcrumb.Item>
      );
    })
  );

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: "100vh",
      }}
    >
      <Breadcrumb separator=" / ">{breadcrumbItems}</Breadcrumb>
      {children}
    </Content>
  );
};

export default MenuContent;
