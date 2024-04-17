import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu } from "antd";
import { useState } from "react";
import "./sidebar.css";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    id: "home",
    title: "Home",
    path: "/dashboard",
    icon: <VideoCameraOutlined />,
  },
  {
    id: "user",
    title: "User",
    path: "user",
    icon: <UserOutlined />,
    children: [
      {
        id: "create-user",
        title: "Create User",
        path: "/user",
      },
      {
        id: "update-user",
        title: "Update User",
        path: "/user",
      },
      {
        id: "delete-user",
        title: "Delete User",
        path: "/user",
      },
    ],
  },
  {
    id: "product",
    title: "Product",
    path: "product",
    icon: <VideoCameraOutlined />,
  },
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider style={{minHeight:"100vh"}} collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
      <div className={`flex items-center justify-between p-5 text-white border-dashed border-b border-white ${collapsed && "w-20"}`}>
        <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
            {!collapsed && (
              <>
                <Avatar icon={<UserOutlined />} />
                <div className="ml-2">Avatar</div>
              </>
            )}
          </div>
        <div className="flex items-right">
          <Button onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
      </div>
      <Menu
        className="pt-1"
        theme="dark" 
        mode="inline" 
        defaultSelectedKeys={["1"]}
        inlineCollapsed={collapsed}>
        {menuItems.map((item) =>
          item.children ? (
            <Menu.SubMenu
              key={item.id}
              title={
                <span>
                  {item.icon}
                  <span>{item.title}</span>
                </span>
              }
            >
              {item.children.map((subItem) => (
                <Menu.Item key={subItem.id}>
                  <Link href={subItem.path}>
                    <span>{subItem.title}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.id} icon={item.icon}>
              <Link href={item.path}>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};
export default SideBar;
