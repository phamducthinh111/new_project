import { Breadcrumb, Layout } from "antd";
import { PropsWithChildren } from "react";
const { Header, Sider, Content } = Layout;

interface MenuContentProps extends PropsWithChildren {
  currentPath: string; // Đường dẫn hiện tại
}

const MenuContent = ({ children }: Readonly<PropsWithChildren>) => {
  return (
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: "100vh",
        }}
      >
         <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        {children}
      </Content>
  );
};

export default MenuContent;
