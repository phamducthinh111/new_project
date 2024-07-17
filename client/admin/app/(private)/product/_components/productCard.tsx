import React, { useState } from "react";
import { Card, Button, Row, Col, Carousel, message } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageUrl, ProductDetail } from "./product.type";
import ModalAlert from "@/components/AlertModal/AlertModal";
import { removeProduct } from "@/api/product";

const { Meta } = Card;

interface ProductCardProps {
  productDentail: ProductDetail;
  refreshData: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ productDentail, refreshData }) => {
  const router = useRouter();
  const [isOpenDelPopup, setIsOpenDelPopup] = useState<boolean>(false);

  const onBtnDeleteProduct = async (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setIsOpenDelPopup(true)
  }

  const handleOkDeleteProduct = async () => {
    try {
      const response = await removeProduct(
        productDentail.productId
      );
      if (response) {
        message.success(`Deleted Image successfully`);
        setIsOpenDelPopup(false);
        refreshData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDeleteProduct = () => {
    setIsOpenDelPopup(false);
  };

  return (
    <div className="mb-5">
      <Card
        hoverable
        onClick={() => {
          router.push(`product/${productDentail.productId}`);
        }}
        style={{ width: 300, height: "100%" }}
        className=" border-2 border-gray-300 rounded-lg"
        cover={
          productDentail.imageUrl &&
          productDentail.imageUrl.filter(
            (img: ImageUrl) => img.imageType === "thumbnail"
          ).length > 0 ? (
            productDentail.imageUrl
              .filter((img: any) => img.imageType === "thumbnail")
              .map((img: any) => (
                <div
                  key={img.imageId}
                  className="flex justify-center items-center h-full p-2"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${img.imageUrl}`}
                    alt={`Product Image ${img.imageId}`}
                    className="max-w-full h-72 object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                </div>
              ))
          ) : (
            <div className="flex justify-center items-center h-full p-2">
              <img
                src="https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
                alt="Default Image"
                className="max-w-full h-72 object-cover transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          )
        }
        actions={[
          <DeleteOutlined
            onClick={(e) => {
              onBtnDeleteProduct(e)
            }}
            key={"delete"}
          />,
        ]}
      >
        <Meta
          title={productDentail.name}
          description={productDentail.typeName}
        />
      </Card>
      <ModalAlert
          title="Delete Product"
          visible={isOpenDelPopup}
          onOk={handleOkDeleteProduct}
          onCancel={handleCancelDeleteProduct}
          content={
            <>
              Are you sure you want to delete product{" "} <br/>
              <strong>{productDentail?.name || ""}</strong>?
            </>
          }          okButtonProps={{ danger: true }}
          type="delete"
        />
    </div>
  );
};

export default ProductCard;
