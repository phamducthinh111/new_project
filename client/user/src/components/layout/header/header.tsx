"use client";
import {
  Button,
  Col,
  Row,
  Drawer,
  Input,
  Badge,
  Avatar,
  Menu,
  Dropdown,
  MenuProps,
} from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  UserOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../../../public/image/logo-coffee.png";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import {  logoutUser } from "@/store/action/user.action";
import Notification from "@/components/notification/NotificationComponent";

const menuItems = [
  {
    id: "home",
    title: "HOME",
    path: "/",
  },
  {
    id: "about",
    title: "ABOUT",
    path: "/about",
  },
  {
    id: "product",
    title: "PRODUCT",
    path: "/product",
  },
  {
    id: "contact",
    title: "CONTACT",
    path: "/contact",
  },
];

export default function PageHeader() {
  const router = useRouter();

  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const dispatch = useAppDispatch();
  const showDrawer = () => setIsOpenDrawer(true);
  const onClose = () => setIsOpenDrawer(false);

  // useEffect(() => {
  //   if (!userProfile) {
  //     dispatch(fetchUserProfile()); // Fetch thông tin người dùng nếu không có trong state
  //   }
  // }, [dispatch, userProfile]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      Notification({ type: 'success', message: 'Success', description: 'Log out account successfully' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href="/profile">
          Profile
        </Link>
      ),
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link href="/order-history">
          Order history
        </Link>
      ),
      key: "order-history",
      icon: <HistoryOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: (
        <div 
          onClick={handleLogout}
        >
          Log out
        </div>
      ),
      danger: true,
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <div className="bg-stone-700 bg-opacity-50 px-8 text-slate-50 backdrop-blur-lg">
      <Row className="items-center">
        {/* Logo */}
        <Col
          xs={4}
          sm={4}
          md={4}
          lg={6}
          className="flex items-center justify-center lg:justify-start"
        >
          <div className="w-28">
            <Image src={Logo} alt="logo"  />
          </div>
        </Col>

        {/* Menu Items for larger screens */}
        <Col
          xs={16}
          sm={16}
          md={16}
          lg={12}
          className="justify-center hidden lg:flex"
        >
          <div className="flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="text-base font-medium hover:text-orange-800 border-r border-gray-300 pr-8 last:border-r-0"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </Col>

        {/* Menu Button for small screens */}
        <Col
          xs={4}
          sm={4}
          md={4}
          lg={5}
          className="flex items-center justify-center lg:hidden"
        >
          <Button
            className="text-black"
            type="link"
            icon={<MenuOutlined style={{ fontSize: "24px" }} />}
            onClick={showDrawer}
          />
        </Col>

        {/* Search Input and Cart Button for larger screens */}
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={6}
          className="hidden lg:flex justify-start"
        >
          <Input.Search
            className="w-3/5 mr-5"
            placeholder="Input product name ..."
          />
          {userProfile ? (
            <>
              <Badge count={5} offset={[0, 10]} className="text-white mr-4">
                <Button
                  type="link"
                  icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
                  className="text-white"
                  onClick={()=>router.push('/cart')}
                />
              </Badge>
              <Dropdown menu={{ items }}>
                <Button type="link" className="text-white">
                  <Avatar className="pt-1"
                    icon={<UserOutlined style={{ fontSize: "20px" }} />}
                  />
                </Button>
              </Dropdown>
            </>
          ) : (
            <Link
              className="text-white flex hover:text-orange-800"
              href="/log-in"
            >
              <UserOutlined style={{ fontSize: "24px" }} />
            </Link>
          )}
        </Col>

        {/* Cart Button for small screens */}
        <Col
          xs={14}
          sm={4}
          md={4}
          lg={0}
          className="flex items-center justify-end lg:hidden"
        >
          {userProfile ? (
            <>
              <Dropdown menu={{ items }}>
                <Button type="link" className="text-white">
                  <Avatar icon={<UserOutlined />} />
                </Button>
              </Dropdown>
              <Badge count={5} offset={[0, 10]} className="text-white ">
                <Button
                  type="link"
                  icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
                  className="text-white"
                />
              </Badge>
            </>
          ) : (
            <Link
              className="text-white flex  hover:text-orange-800"
              href="/log-in"
            >
              <UserOutlined style={{ fontSize: "24px" }} />
            </Link>
          )}
        </Col>
      </Row>

      {/* Drawer for mobile menu */}
      <Drawer
        placement="left"
        onClose={onClose}
        open={isOpenDrawer}
        width={256}
        style={{
          backgroundColor: "#44403C",
          color: "#ffffff",
          backdropFilter: "blur(10px)",
          opacity: 0.9,
        }}
      >
        <div className="flex flex-col items-start space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="block p-2 text-base font-medium hover:text-orange-800"
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
          <Input.Search placeholder="Input product name ..." />
        </div>
      </Drawer>
    </div>
  );
}
