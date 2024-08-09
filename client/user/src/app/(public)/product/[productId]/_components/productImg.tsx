"use client";

import { ImageUrl } from "@/interface/product.interface";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, Row } from "antd";
import Image from "next/image";
import { useState } from "react";
import { StyledButtonDirectional } from "../../_components/Product.style";

interface ProductImageProps {
  imageUrl: ImageUrl[];
}

const ProductImage = (props: ProductImageProps) => {
  const { imageUrl } = props;
  const galleryImages = imageUrl.filter((img) => img.imageType === "gallery");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [fadeTransition, setFadeTransition] = useState<boolean>(false);

  const handlePrevClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex < galleryImages.length - 3) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleThumbnailClick = (imageUrl: string) => {
    setFadeTransition(true);
    setSelectedImage(imageUrl);
    setTimeout(() => {
      setFadeTransition(false);
    }, 500); // Thời gian của hiệu ứng (300ms)
  };

  return (
    <div className="p-4 flex flex-col items-center ">
      <div
        className={`mb-4 relative ${
          fadeTransition
            ? "opacity-0 transition-opacity duration-300"
            : "opacity-100 transition-opacity duration-300"
        }`}
      >
        {imageUrl
          .filter((img) => img.imageType === "thumbnail")
          .map((img) => (
            <div key={img.imageId}>
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${
                  selectedImage || img.imageUrl
                }`}
                alt={`Product Image ${img.imageId}`}
                width={300}
                height={300}
                className="rounded"
              />
            </div>
          ))}
      </div>
      <div className="mt-10 flex items-center p-2">
        <StyledButtonDirectional
          onClick={handlePrevClick}
          icon={<LeftOutlined />}
          className="mr-2 transition-transform transform active:scale-95"
          disabled={currentImageIndex === 0}
        />
        <Row className="w-full" gutter={16}>
          {galleryImages
            .slice(currentImageIndex, currentImageIndex + 3)
            .map((img) => (
              <Col className="relative" span={8} key={img.imageId}>
                <div
                  onClick={() => handleThumbnailClick(img.imageUrl)}
                  className={`relative overflow-hidden cursor-pointer rounded transition-transform duration-300 transform hover:scale-105 ${
                    selectedImage === img.imageUrl ? "scale-105" : ""
                  }`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${img.imageUrl}`}
                    alt={`Product Image ${img.imageId}`}
                    className={`rounded object-cover brightness-50 transition-all duration-300 hover:brightness-100 ${
                      selectedImage === img.imageUrl ? "brightness-100" : ""
                    }`}
                    width={500}
                    height={500}
                  />
                </div>
              </Col>
            ))}
        </Row>
        <StyledButtonDirectional
          onClick={handleNextClick}
          icon={<RightOutlined />}
          className="ml-2 transition-transform transform active:scale-95"
          disabled={currentImageIndex >= galleryImages.length - 3}
        />
      </div>
    </div>
  );
};

export default ProductImage;
