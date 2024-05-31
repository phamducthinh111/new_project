"use client";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  LogoutOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, message } from "antd";
import { useEffect, useState } from "react";
// import "./sidebar.css";
import Link from "next/link";
import { logout, me } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAppContetxt } from "@/app/AppProvider";
import { Role } from "@/app/(private)/user/_components/user.type";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { userProfile } = useAppContetxt();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Logged out successfully');
      router.push('/log-in');
      router.refresh();
    } catch (error: any) {
      message.error(error.message || 'An error occurred during logout');
    }
  };

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
          id: "list-user",
          title: "List User",
          path: "/user",
        },
        ...(userProfile?.role === Role.admin
          ? [
              {
                id: "update-user",
                title: "List User deleted",
                path: "/user/deleted",
              },
              // {
              //   id: "delete-user",
              //   title: "Delete User",
              //   path: "/user/delete",
              // },
            ]
          : []),
      ],
    },
    {
      id: "product",
      title: "Product",
      path: "product",
      icon: <VideoCameraOutlined />,
    },
    {
      id: "order",
      title: "Order",
      path: "order",
      icon: <VideoCameraOutlined />,
    },
  ];
  

  return (
    <Sider
      style={{width: collapsed ? "80px" : "240px" }}
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      className="flex flex-col"
      trigger={null}
    >
      <div
        className={`flex items-center justify-between p-5 text-white border-dashed border-b border-white ${collapsed ? "w-20" : "w-full"}`}>
        <div className="flex items-center flex-grow overflow-hidden">
          {!collapsed && (
            <>
              <Link href='/profile'>
                <Avatar icon={<UserOutlined />} />
              </Link>
              <div className="ml-2 truncate">{userProfile?.username}</div>
            </>
          )}
        </div>
        <div className="flex items-center flex-shrink-0">
          <Button onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
      </div>
      <Menu
        className="pt-1 flex-grow"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        inlineCollapsed={collapsed}
        // style={{ fontSize: "14px", fontWeight: "normal" }}
      >
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
        {/* <div className="flex justify-center mt-auto mb-4 w-full">
        <Menu.Item >
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
          {!collapsed && 'Log Out'}
        </Button>
          </Menu.Item>
        </div> */}
          
      </Menu>
      <div className="flex justify-center mt-auto mb-4">
        <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
          {!collapsed && 'Log Out'}
        </Button>
      </div>
    </Sider>
  );
  
};
export default SideBar;
