"use client";

import { Col, Row } from "antd";
import OrderItemList from "./_components/Order.ItemList";
import OrderInfoCustomer from "./_components/Order.InfoCustomer";
import OrderTotal from "./_components/Order.Total";
import { useAppSelector } from "@/store/store";

export default function ShoppingCard() {
  const { totalPrice } = useAppSelector((state) => state.cart);
  return (
    <div className="my-10">
      <div className="container mx-auto p-5 bg-stone-700 bg-opacity-90 rounded-lg ">
        <OrderItemList />
        <div className="mt-10">
          <Row justify={'center'}>
            <Col xs={24} sm={24} md={12} lg={10}>
              <OrderInfoCustomer/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={10}>
            <OrderTotal/>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
