"use client";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  OrderedListOutlined,
  ShopOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, message, Spin } from "antd";
import { useEffect, useState } from "react";
// import "./sidebar.css";
import Link from "next/link";
import { logout, me } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAppContetxt } from "@/app/AppProvider";
import { Role } from "@/app/(private)/user/_components/user.type";
import Loading from "@/components/loading/loading";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userProfile } = useAppContetxt();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const response = await logout();
      if(response) {
        message.success('Logged out successfully');
        router.push('/log-in');
        router.refresh();
      }
    } catch (error: any) {
      message.error(error.message || 'An error occurred during logout');
    }
  };

  const menuItems = [
    {
      id: "home",
      title: "Home",
      path: "/dashboard",
      icon: <HomeOutlined />,
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
                id: "delete-user",
                title: "List User deleted",
                path: "/user/deleted",
              },
            ]
          : []),
      ],
    },
    {
      id: "product",
      title: "Product",
      path: "product",
      icon: <ShopOutlined />,
      children: [
        {
          id: "list-product",
          title: "List Product",
          path: "/product",
        },
        ...(userProfile?.role === Role.admin
          ? [
              {
                id: "delete-product",
                title: "List Product deleted",
                path: "/product/deleted",
              },
            ]
          : []),
      ],
    },
    {
      id: "order",
      title: "Order",
      path: "order",
      icon: <OrderedListOutlined />,
      children: [
        {
          id: "list-Order",
          title: "List Order",
          path: "/order",
        },
        ...(userProfile?.role === Role.admin
          ? [
              {
                id: "delete-Order",
                title: "List Order Deleted",
                path: "/order/deleted",
              },
            ]
          : []),
      ],
    },
  ];
  
  if(isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

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
                  <span className="text-base">{item.title}</span>
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
                <span className="text-base">{item.title}</span>
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
      <div className="flex justify-center mt-5 ">
        <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
          {!collapsed && 'Log Out'}
        </Button>
      </div>
    </Sider>
  );
  
};
export default SideBar;
