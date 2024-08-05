"use client";

import { FilterOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import ProductFilter from "./ProductFilter";

const IconProductFilterForMobile = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const showDrawer = () => setIsOpenDrawer(true);
  const onClose = () => setIsOpenDrawer(false);
  return (
    <div className="p-3 flex">
      <Button className="text-white" type="link" onClick={showDrawer}>
        <FilterOutlined style={{ fontSize: "24px" }} />{" "}
        <h2 className="text-white text-xl">Bộ Lọc Sản Phẩm</h2>
      </Button>
      <Drawer
        placement="left"
        onClose={onClose}
        open={isOpenDrawer}
        style={{
          backgroundColor: "#44403C",
          backdropFilter: "blur(10px)",
          color: "#ffffff",
        }}
      >
        <ProductFilter />
      </Drawer>
    </div>
  );
};

export default IconProductFilterForMobile;
