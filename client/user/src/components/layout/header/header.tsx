"use client";
import { Button, Col, Row, Drawer, Input, Badge } from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../../../public/image/logo-coffee.png";

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
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <div className="bg-stone-700 bg-opacity-50 px-8 text-slate-50 backdrop-blur-lg">
      <Row className="items-center">
        <Col
          xs={4}
          sm={4}
          md={4}
          lg={5}
          className="flex items-center justify-center lg:justify-start"
        >
          <div className="w-28">
            <Image src={Logo} alt="logo" layout="responsive" />
          </div>
        </Col>
        <Col
          xs={16}
          sm={16}
          md={16}
          lg={14}
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
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={4}
          className="justify-center hidden lg:flex"
        >
          <Input.Search className="mr-5" placeholder="Input product name ..." />
          <Badge count={5} offset={[0, 10]} className="text-white">
            <Button
              type="link"
              icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
              className="text-white"
            />
          </Badge>
        </Col>
      </Row>
      <Drawer
        placement="left"
        onClose={onClose}
        open={visible}
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
          <Badge count={5} offset={[0, 10]} className="text-white tẽ">
            <Button
              type="link"
              icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
              className="text-white"
            />
          </Badge>
        </div>
      </Drawer>
    </div>
  );
}
