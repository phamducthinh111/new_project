import React, { useState } from "react";
import { Card, Button, Row, Col, Carousel } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Meta } = Card;

const ProductCard = ({ productDentail }: any) => {
  //  const [test,setTest] = useState()
  productDentail.imageUrl.map((img: any) => console.log(img.imageUrl));
  return (
    <div className="mb-5">
      <Card 
        hoverable 
        className="bg-gray-100 border-2 border-gray-300 rounded-lg "
       >
        <Row>
          <Col span={6} className="flex justify-center items-center">
 
              {productDentail.imageUrl &&
                productDentail.imageUrl.map((img: any) => (
                  <div key={img.imageId} className="overflow-hidden rounded-xl relative">
                  <img
                    key={img.imageId}
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${img.imageUrl}`}
                    alt={`Product Image ${img.imageId}`}
                    className="w-4/5"
                  />
                </div>
                ))}
            {/* </Carousel> */}
          </Col>
          <Col span={18} >
            <Meta
              title={productDentail.name}
              description={
                <div>
                  <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <p><strong>Price:</strong> ${productDentail.price}</p>
                  </Col>
                  <Col span={12}>
                    <p><strong>Quantity:</strong> {productDentail.quantity}</p>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <p><strong>Location:</strong> {productDentail.location}</p>
                  </Col>
                  <Col span={12}>
                    <p><strong>Type:</strong> {productDentail.typeName}</p>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <p><strong>Label:</strong> {productDentail.label}</p>
                  </Col>
                </Row>
                </div>
              }
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductCard;
