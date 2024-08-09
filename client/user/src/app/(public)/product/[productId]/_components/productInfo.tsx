"use client";

import { formatVND } from "@/constants/formatVND.constants";
import { ProductDetail } from "@/interface/product.interface";
import { Button, Typography } from "antd";
import { StyledButtonCoutn, StyledRate } from "../../_components/Product.style";
import { useAppDispatch, useAppSelector } from "@/store/store";
import ButtonGroup from "antd/es/button/button-group";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { updateCart } from "@/store/reducer/cartReducer";
import { useRouter } from "next/navigation";

interface ProductInfomationProps {
  productDetail: ProductDetail;
}
const { Title, Text } = Typography;

const ProductInfomation: React.FC<ProductInfomationProps> = ({
  productDetail,
}) => {
const router = useRouter()
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const dispatch = useAppDispatch();
  const isLanguageVN = activeLanguage === "vn";
  const count = useAppSelector((state) => {
    const item = state.cart.orderItems.find(
      (item) => item.productItem.productId === productDetail.productId
    );
    return item ? item.count : 0;
  });

  const {orderItems} = useAppSelector((state) => state.cart);

  const handleDecrement = () => {
    if (count > 0) {
      dispatch(updateCart({ productItem: productDetail, count: count - 1 }));
    }
  };

  const handleIncrement = () => {
    dispatch(updateCart({ productItem: productDetail, count: count + 1 }));
  };

  const handleAddtoCart = () => {
    router.push('/cart')
  };

  return (
    productDetail && (
      <div className="p-4">
        <Title level={2} className=" hidden sm:flex">
          <span className="font-medium text-gray-300">
            {productDetail.name}
          </span>
        </Title>
        {/* Menu for small screens */}
        <Title level={4} className="sm:hidden">
          <span className="font-medium text-gray-300">
            {productDetail.name}
          </span>
        </Title>
        <div className="">
          <StyledRate allowHalf defaultValue={5} />
        </div>
        <Text strong className="text-lg">
          <span className=" text-white">{formatVND(productDetail.price)}</span>
        </Text>
        <div className="mt-4 py-2">
          <Text className="block mb-1">
            <strong className="text-white text-base">
              {isLanguageVN ? "Loại: " : "Type: "}
            </strong>
            <span className="text-white text-base">
              {productDetail.typeName}
            </span>
          </Text>
          <Text className="block mb-1">
            <strong className="text-white text-base">
              {isLanguageVN ? "Nhãn: " : "Label: "}
            </strong>
            <span className="text-white text-base">{productDetail.label}</span>
          </Text>
          <Text className="block mb-1">
            <strong className="text-white text-base">
              {isLanguageVN ? "Xuất sứ: " : "Location: "}
            </strong>
            <span className="text-white text-base">
              {productDetail.location}
            </span>
          </Text>
          <Text className="block mb-1">
            <strong className="text-white text-base">
              {isLanguageVN ? "Số lượng còn: " : "Quantity: "}
            </strong>
            <span className="text-[#FFA500] text-base">
              {productDetail.quantity}
            </span>
          </Text>
        </div>
        <div className="mt-4">
          <Text>
            <span className="text-slate-50 text-base italic">
              {productDetail.description}
            </span>
          </Text>
        </div>
        <div className="mt-10 flex items-center">
          <ButtonGroup className="flex items-center">
            <StyledButtonCoutn
              disabled={count === 0}
              onClick={handleDecrement}
              icon={<MinusOutlined />}
            />
            <div className="border bg-gray-300 text-black px-5 py-1">
              {count}
            </div>
            <Button
              disabled={count === productDetail.quantity}
              onClick={handleIncrement}
              icon={<PlusOutlined />}
            />
          </ButtonGroup>
          <Button
            size="large"
            type="primary"
            onClick={handleAddtoCart}
            danger
            className="ml-10"
          >
            <ShoppingCartOutlined
              className="text-white"
              style={{ fontSize: "24px" }}
            />
            <span className="font-medium"> Đặt hàng</span>
          </Button>
        </div>
      </div>
    )
  );
};

export default ProductInfomation;
