import React, { useState } from "react";
import { Card, Button, Row, Col, Carousel } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductDetail } from "./product.type";

const { Meta } = Card;

interface ProductCardProps {
  productDentail: ProductDetail;
}

const ProductCard: React.FC<ProductCardProps> = ({ productDentail }) => {
  const router = useRouter()
  
  return (
    <div className="mb-5">
      <Card
        hoverable
        onClick={()=> {router.push(`product/${productDentail.productId}`)}}
        style={{ width: 300, height: "100%" }}
        className=" border-2 border-gray-300 rounded-lg"
        cover={
          // <img/>
          productDentail.imageUrl &&
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
        }
        actions={[<DeleteOutlined
          onClick={()=>{console.log('th')}} 
          key={'delete'}/>]}
      >
        <Meta
          title={productDentail.name}
          description={productDentail.typeName}
        />
      </Card>
    </div>
  );
};

export default ProductCard;
