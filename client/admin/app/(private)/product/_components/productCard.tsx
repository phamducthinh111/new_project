import React, { useState } from "react";
import { Card, Button, Row, Col, Carousel } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Meta } = Card;

const ProductCard = ({ productDentail }: any) => {
//  const [test,setTest] = useState()
    productDentail.imageUrl.map((img: any) => (
      console.log(img.imageUrl)
    ))
  return (
    <div>
      <Card hoverable className="mb-5">
        <Row>
          <Col span={6}>
            <Carousel autoplay>
              {productDentail.imageUrl &&
                productDentail.imageUrl.map((img: any) => (
                  <Image
                    key={img.imageId}
                    src={`http://localhost:4050/${img.imageUrl}`} // Đảm bảo đường dẫn đúng với cấu trúc thư mục của bạn
                    alt={`Product Image ${img.imageId}`}
                    width={500} // Thay đổi kích thước phù hợp với yêu cầu của bạn
                    height={500} // Thay đổi kích thước phù hợp với yêu cầu của bạn
                    layout="responsive" // Tùy chọn layout, có thể là "fixed", "intrinsic", "responsive", hoặc "fill"
                  />
                ))}
            </Carousel>
          </Col>
          <Col span={18}>
            <Meta
              title={productDentail.location}
              description="This is the description"
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductCard;
