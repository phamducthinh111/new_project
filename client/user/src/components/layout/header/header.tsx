"use client";
import {
  Button,
  Col,
  Row,
  Drawer,
  Input,
  Badge,
  Avatar,
  Dropdown,
  MenuProps,
  AutoComplete,
} from "antd";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../../../public/image/logo-coffee.png";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/store/action/user.action";
import Notification from "@/components/notification/NotificationComponent";
import PageLoading from "@/components/loading/loading";
import LanguageButton from "@/components/Language/languageButton";
import { getSearchSuggestions } from "@/api/product";
import { ProductDetail } from "@/interface/product.interface";
import { StyledButtonCart, StyledButtonLogin } from "./header.style";

export default function PageHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { totalProduct } = useAppSelector((state: RootState) => state.cart);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ProductDetail[]>([]);
  const dispatch = useAppDispatch();
  const showDrawer = () => setIsOpenDrawer(true);
  const onClose = () => setIsOpenDrawer(false);
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const isLanguageVN = activeLanguage === "vn";

  const handleLogout = async () => {
    try {
      setIsLoadingLogout(true);
      await dispatch(logoutUser()).unwrap();
      Notification({
        type: "success",
        message: "Success",
        description: isLanguageVN
          ? "Đăng xuất tài khoản thành công"
          : "Log out account successfully",
      });
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearchChange = async (value: string) => {
    setSearchValue(value);
    if (value) {
      const response = await getSearchSuggestions(value);
      if (response) {
        setSuggestions(response);
      }
    } else {
      setSuggestions([]);
    }
  };

  // const handleSelectClick = (item:ProductDetail) => {
  //   router.push(`/product/${item.productId}`);
  //   setSearchValue('')
  //   isOpenDrawer && setIsOpenDrawer(false);
  // };
  const handleSelectClick = (item: {
    value: string;
    label: React.ReactNode;
  }) => {
    const selectedProduct = suggestions.find(
      (suggestion) => suggestion.name === item.value
    );
    if (selectedProduct) {
      router.push(`/product/${selectedProduct.productId}`);
      setSearchValue("");
      isOpenDrawer && setIsOpenDrawer(false);
    }
  };

  if (isLoadingLogout) {
    <PageLoading />;
  }

  const items: MenuProps["items"] = [
    {
      label: <Link href="/profile">{isLanguageVN ? "Hồ sơ" : "Profile"}</Link>,
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link href="/order-history">
          {isLanguageVN ? "Lịch sử mua hàng" : "Order history"}
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
        <div onClick={handleLogout}>
          {isLanguageVN ? "Đăng xuất" : "Log Out"}
        </div>
      ),
      danger: true,
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  const menuItems = [
    {
      id: "home",
      title: isLanguageVN ? "TRANG CHỦ" : "HOME",
      path: "/",
    },
    {
      id: "about",
      title: isLanguageVN ? "VỀ CHÚNG TÔI" : " ABOUT",
      path: "/about",
    },
    {
      id: "product",
      title: isLanguageVN ? "SẢN PHẨM" : "PRODUCT",
      path: "/product",
    },
    {
      id: "contact",
      title: isLanguageVN ? "LIÊN HỆ" : "CONTACT",
      path: "/contact",
    },
  ];
  return (
    <div className="bg-stone-700 bg-opacity-50 text-slate-50 backdrop-blur-lg fixed top-0 left-0 w-full z-50">
      <Row className="container mx-auto items-center">
        {/* Logo */}
        <Col
          xs={4}
          sm={4}
          md={4}
          lg={7}
          className="flex items-center justify-center lg:justify-center"
        >
          <div className="w-28">
            <Image src={Logo} alt="logo" />
          </div>
          <AutoComplete
            className="w-3/5"
            onSearch={handleSearchChange}
            options={suggestions.map((item) => ({
              value: item.name,
              label: (
                <div
                  // onClick={() => handleSelectClick(item)}
                  className="cursor-pointer font-medium"
                >
                  {item.name}
                </div>
              ),
            }))}
            onSelect={(value, option) => handleSelectClick(option)}
          >
            <Input.Search
              className="w-1/2 hidden lg:flex"
              placeholder={
                isLanguageVN ? "Nhập tên sản phẩm..." : "Input product name..."
              }
            />
          </AutoComplete>
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
                className={`text-base font-medium hover:text-orange-800 border-r border-gray-300 pr-8 last:border-r-0 ${
                  pathname === item.path ? "text-orange-800" : "text-white"
                }`}
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
          lg={5}
          className="hidden lg:flex items-center justify-center"
        >
          <Badge count={totalProduct} offset={[0, 10]} className="text-white ">
            <StyledButtonCart
              type="link"
              icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
              className="text-white"
              onClick={() => router.push("/cart")}
            />
          </Badge>
          {userProfile ? (
            <>
              <Dropdown menu={{ items }}>
                <Button type="link" className="text-white">
                  <Avatar
                    className="ml-3"
                    icon={<UserOutlined style={{ fontSize: "20px" }} />}
                  />
                </Button>
              </Dropdown>
            </>
          ) : (
            <>
              <StyledButtonLogin
                // className="text-white flex hover:text-orange-800"
                className="ml-3"
                href="/log-in"
                type="link"
              >
                <UserOutlined style={{ fontSize: "20px" }} />
              </StyledButtonLogin>
            </>
          )}
          <div className=" w-1/2 flex justify-center">
            <div>
              <LanguageButton language="vn" />
              <LanguageButton language="eng" />
            </div>
          </div>
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
                  <Avatar className="" icon={<UserOutlined />} />
                </Button>
              </Dropdown>
              <Badge
                count={totalProduct}
                offset={[0, 10]}
                className="text-white "
              >
                <StyledButtonCart
                  type="link"
                  icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
                  className="text-white"
                  onClick={() => router.push("/cart")}
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
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex flex-col items-start space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`block p-2 text-base font-medium hover:text-orange-800 ${
                pathname === item.path ? "text-orange-800" : "text-white"
              }`}
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
          <AutoComplete
            onSearch={handleSearchChange}
            options={suggestions.map((item) => ({
              value: item.name,
              label: (
                <div
                  // onClick={() => handleSelectClick(item)}
                  className="cursor-pointer font-medium"
                >
                  {item.name}
                </div>
              ),
            }))}
            onSelect={(value, option) => handleSelectClick(option)}
          >
            <Input.Search
              className=""
              placeholder={
                isLanguageVN ? "Nhập tên sản phẩm..." : "Input product name..."
              }
            />
          </AutoComplete>
        </div>

        <div className="flex justify-start pt-5">
          <div>
            <LanguageButton language="vn" />
            <LanguageButton language="eng" />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
