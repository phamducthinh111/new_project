"use client";

import { Breadcrumb, Layout } from "antd";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { HomeOutlined } from '@ant-design/icons';
const { Content } = Layout;

interface MenuContentProps extends PropsWithChildren {
  currentPath: string; // Đường dẫn hiện tại
}

const MenuContent = ({ children, currentPath }: Readonly<MenuContentProps>) => {
  const pathSnippets = currentPath.split('/').filter((i) => i);
  
  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link href="/dashboard">
        <HomeOutlined />
      </Link>
    </Breadcrumb.Item>,
  ].concat(
    pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link href={url}>{snippet}</Link>
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
      <Breadcrumb separator=" / ">
        {breadcrumbItems}
      </Breadcrumb>
      {children}
    </Content>
  );
};

export default MenuContent;
