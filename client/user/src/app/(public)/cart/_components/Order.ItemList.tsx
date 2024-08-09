import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  CloseOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, List, Row, Space, Typography } from "antd";
import Image from "next/image";
import { StyledButtonDelOrderItem } from "./order.style";
import { formatVND } from "@/constants/formatVND.constants";
import ButtonGroup from "antd/es/button/button-group";
import { StyledButtonCoutn } from "../../product/_components/Product.style";
import {
  OrderItem,
  removeOrderItems,
  updateCart,
} from "@/store/reducer/cartReducer";

const { Title, Text } = Typography;

const OrderItemList = () => {
  const dispatch = useAppDispatch();
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const isLanguageVN = activeLanguage === "vn";
  const { orderItems, totalCount, totalPrice } = useAppSelector(
    (state) => state.cart
  );

  const handleDecrement = (item: OrderItem) => {
    if (item.count > 1) {
      dispatch(
        updateCart({ productItem: item.productItem, count: item.count - 1 })
      );
    }
  };

  const handleIncrement = (item: OrderItem) => {
    dispatch(
      updateCart({ productItem: item.productItem, count: item.count + 1 })
    );
  };

  const removeItem = (item: OrderItem) => {
    dispatch(removeOrderItems({ productItem: item.productItem }));
  };

  return (
    <>
      <div className=" text-center my-5 text-3xl h-full">
        <b> {isLanguageVN ? "Giỏ hàng" : "Cart"}</b>
      </div>
      <div className="flex justify-center">
        <List
          className="p-5 w-3/4"
          grid={{ gutter: 16, column: 1 }} // Thay đổi số cột nếu cần
          dataSource={orderItems}
          renderItem={(item) => (
            <List.Item>
              <Row
                gutter={16}
                align="middle"
                className="flex items-center pb-2 border-b-2"
              >
                <Col span={5} className="flex items-center">
                  <StyledButtonDelOrderItem
                    type="link"
                    className="mr-3"
                    onClick={() => removeItem(item)}
                    icon={<CloseOutlined style={{ fontSize: 20 }} />}
                  />
                  {item.productItem.imageUrl
                    .filter((img) => img.imageType === "thumbnail")
                    .map((img) => (
                      <div key={img.imageId}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${img.imageUrl}`}
                          alt={`Product Image ${img.imageId}`}
                          width={80}
                          height={80}
                          className="rounded"
                        />
                      </div>
                    ))}
                </Col>
                {/* Menu for small screens */}
                <Col className="hidden md:flex" span={7}>
                  <Title level={5}>
                    <span className="text-white">{item.productItem.name}</span>
                  </Title>
                </Col>
                <Col className="hidden md:flex" span={4}>
                  <Text className="text-base">
                    <span className="text-white">
                      {formatVND(item.productItem.price)}
                    </span>
                  </Text>
                </Col>
                <Col className="hidden md:flex items-center" span={4}>
                  <ButtonGroup className="flex items-center">
                    <StyledButtonCoutn
                      disabled={item.count === 1}
                      onClick={() => handleDecrement(item)}
                      icon={<MinusOutlined />}
                    />
                    <div className="border bg-gray-300 text-black px-5 py-1">
                      {item.count}
                    </div>
                    <Button
                      disabled={item.count === item.productItem.quantity}
                      onClick={() => handleIncrement(item)}
                      icon={<PlusOutlined />}
                    />
                  </ButtonGroup>
                </Col>
                <Col className="hidden md:flex" span={4}>
                  <Text className="text-base">
                    <b className="text-white">
                      {formatVND(item.count * item.productItem.price)}
                    </b>
                  </Text>
                </Col>

                {/* mobile */}
                <Col span={12} className="md:hidden">
                  <Space direction="vertical">
                    <Title level={5}>{item.productItem.name}</Title>
                    <Text>Số lượng: {item.count}</Text>
                    <Text>
                      Tổng tiền: {item.count * item.productItem.price} VND
                    </Text>
                  </Space>
                </Col>
              </Row>
            </List.Item>
          )}
        >
          <List.Item>
            <Row gutter={16} align="middle" className="flex items-center pb-2 ">
              <Col span={5}></Col>
              <Col span={7} className="hidden md:flex"></Col>
              <Col span={4} className="hidden md:flex"></Col>
              <Col
                span={4}
                className="hidden md:flex items-center justify-center"
              >
                <div className="text-base text-center">
                  <b className="text-white text-center">{totalCount}</b>
                </div>
              </Col>
              <Col span={4} className="hidden md:flex">
                <Text className="text-base">
                  <b className="text-white">{formatVND(totalPrice)}</b>
                </Text>
              </Col>
            </Row>
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default OrderItemList;
