"use client";

import { getProductDentail } from "@/api/product";
import { useEffect, useState } from "react";
import { ProductDetail } from "../_components/product.type";
import { Col, Row, Typography, Input, Button, Form, Upload } from "antd";
import {
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function Product({ params }: any) {
  const [productDentail, setProductDentail] = useState<ProductDetail | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [fadeTransition, setFadeTransition] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductDentail(params.productId);
      if (response) {
        setProductDentail(response);
        form.setFieldsValue(response);
      }
    };
    fetchData();
  }, [params.productId]);

  const handleThumbnailClick = (imageUrl: string) => {
    setFadeTransition(true);
    setTimeout(() => {
      setSelectedImage(imageUrl);
      setFadeTransition(false);
    }, 300); // Thời gian của hiệu ứng (300ms)
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // const handleSaveClick = async () => {
  //   const values = await form.validateFields();
  //   const response = await updateProductDetail(params.productId, values);
  //   if (response) {
  //     setProductDentail(response);
  //     setIsEditing(false);
  //   }
  // };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex <
      productDentail!.imageUrl.filter((img) => img.imageType === "gallery")
        .length -
        3
        ? prevIndex + 1
        : prevIndex
    );
  };

  return (
    productDentail && (
      <div className=" mx-auto my-10 p-5">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <div
              className={`relative ${
                fadeTransition
                  ? "opacity-0 transition-opacity duration-300"
                  : "opacity-100 transition-opacity duration-300"
              }`}
            >
              {productDentail.imageUrl.some(
                (img) => img.imageType === "thumbnail"
              ) ? (
                <Upload>
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${
                      selectedImage ||
                      productDentail.imageUrl.find(
                        (img) => img.imageType === "thumbnail"
                      )?.imageUrl
                    }`}
                    alt={productDentail.name}
                    className="max-w-full h-96 object-cover rounded-md cursor-pointer"
                    // onClick={handleAddImageTitleClick}
                  />
                </Upload>
              ) : (
                <Upload
                  className="w-3/5 h-80 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer"
                  // onClick={handleAddImageTitleClick}
                >
                  <PlusOutlined className="text-3xl text-gray-400" />
                </Upload>
              )}
            </div>
          </Col>
          <Col xs={24} md={12}>
            {isEditing ? (
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Please input the price!" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="typeName"
                  rules={[
                    { required: true, message: "Please input the type!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Location" name="location">
                  <Input />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity">
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Label" name="label">
                  <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <TextArea rows={4} />
                </Form.Item>
                <Button
                  type="primary"
                  // onClick={handleSaveClick}
                >
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </Form>
            ) : (
              <div>
                <Title level={2} className="mb-3">
                  {productDentail.name}
                </Title>
                <Text strong className="text-lg">
                  ${productDentail.price}
                </Text>
                <div className="mt-4">
                  <Text className="block">
                    <strong>Type:</strong> {productDentail.typeName}
                  </Text>
                  <Text className="block">
                    <strong>Location:</strong> {productDentail.location}
                  </Text>
                  <Text className="block">
                    <strong>Quantity:</strong> {productDentail.quantity}
                  </Text>
                  <Text className="block">
                    <strong>Label:</strong> {productDentail.label}
                  </Text>
                </div>
                <div className="mt-4">
                  <Title level={4}>Description</Title>
                  <Text>{productDentail.description}</Text>
                </div>
                <Button
                  className="mt-3"
                  type="primary"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </div>
            )}
          </Col>
        </Row>
        <div className="mt-10 flex items-center">
          <Button
            onClick={handlePrevClick}
            icon={<LeftOutlined />}
            disabled={currentImageIndex === 0}
          />
          <Row gutter={16} className="flex-1 overflow-hidden">
            {productDentail.imageUrl
              .filter((img) => img.imageType === "gallery")
              .slice(currentImageIndex, currentImageIndex + 3)
              .map((img) => (
                <Col
                  xs={24}
                  sm={12}
                  md={6}
                  key={img.imageId}
                  className="mb-4 relative"
                >
                  <div className="relative">
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${img.imageUrl}`}
                      alt={`Product Image ${img.imageId}`}
                      className={`max-w-full h-48 object-cover rounded-md cursor-pointer ${
                        selectedImage === img.imageUrl
                          ? "border-2 border-amber-900"
                          : ""
                      }`}
                      onClick={() => handleThumbnailClick(img.imageUrl)}
                    />
                    <Button
                      className="absolute top-2 right-2 bg-white rounded-full"
                      type="text"
                      icon={<CloseOutlined className="text-sm" />}
                      // onClick={() => handleDeleteImage(img.imageUrl)}
                    />
                  </div>
                </Col>
              ))}
            <Col xs={24} sm={12} md={5} className="mb-4">
               <div
                className="max-w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer"
                // onClick={handleAddImageClick}
              >
                <PlusOutlined className="text-3xl text-gray-400" />
              </div>          
            </Col>
          </Row>
          <Button
            onClick={handleNextClick}
            icon={<RightOutlined />}
            disabled={
              currentImageIndex >=
              productDentail.imageUrl.filter(
                (img) => img.imageType === "gallery"
              ).length -
                3
            }
          />
        </div>
        {/* <div className="mt-5 text-gray-500 italic">
          <Text>CreateUser: {productDentail.createUser}</Text><br />
          <Text>UpdateUser: {productDentail.updateUser}</Text><br />
          <Text>CreateDate: {new Date(productDentail.createDate).toLocaleDateString()}</Text><br />
          <Text>UpdateDate: {new Date(productDentail.updateDate).toLocaleDateString()}</Text>
        </div> */}
      </div>
    )
  );
}
