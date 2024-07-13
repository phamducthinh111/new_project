"use client";

import {
  deleteImage,
  getProductDentail,
  updateContentProduct,
  updateImgTitle,
  updateListImgGallery,
} from "@/api/product";
import { useEffect, useState } from "react";
import {
  ImageUrl,
  ProductContent,
  ProductDetail,
} from "../_components/product.type";
import {
  Col,
  Row,
  Typography,
  Input,
  Button,
  Form,
  Upload,
  message,
} from "antd";
import {
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ModalAlert from "@/components/AlertModal/AlertModal";
import ImgCrop from "antd-img-crop";

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
  const [currentImage, setCurrenImg] = useState<ImageUrl | null>(null);
  const [isOpenDelPopup, setIsOpenDelPopup] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [initialValues, setInitialValues] = useState({});
  const [changedFields, setChangedFields] = useState<Partial<ProductContent>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductDentail(params.productId);
      if (response) {
        setProductDentail(response);
        form.setFieldsValue(response);
        setRefreshData(false);
      }
    };
    fetchData();
  }, [params.productId, refreshData]);

  useEffect(() => {
    // Set initial values when the component mounts
    setInitialValues({
      name: productDentail?.name,
      price: productDentail?.price,
      typeName: productDentail?.typeName,
      location: productDentail?.location,
      quantity: productDentail?.quantity,
      label: productDentail?.label,
      description: productDentail?.description,
    });
    form.setFieldsValue(productDentail);
  }, [productDentail, form]);

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

  const handleSaveClick = async () => {
    try {
      const response = await updateContentProduct(
        params.productId,
        changedFields
      );
      if (response) {
        console.log(response);
        message.success(`Update product successfully`);
        setRefreshData(true);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      message.error(`Update product Error`);
    }
  };

  const handleCancelClick = async () => {
    form.resetFields();
    setIsEditing(false);
    setChangedFields({});
  };

  const onValuesChange = (changedValues: ProductDetail) => {
    const convertedValues = Object.entries(changedValues).reduce(
      (acc, [key, value]) => {
        if (key === "quantity" || key === "price") {
          return { ...acc, [key]: Number(value) };
        }
        return { ...acc, [key]: value };
      },
      {}
    );

    setChangedFields((prevState) => ({
      ...prevState,
      ...convertedValues,
    }));
  };

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

  const onBtnDelete = (img: ImageUrl) => {
    setIsOpenDelPopup(true);
    setCurrenImg(img);
  };

  const handleOkDeleteImg = async () => {
    try {
      const response = await deleteImage(
        params.productId,
        currentImage?.imageId
      );
      if (response) {
        message.success(`Deleted Image successfully`);
        setIsOpenDelPopup(false);
        setRefreshData(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDeleteImg = () => {
    setIsOpenDelPopup(false);
    // setIsOpenDelPopup(false);
    // setisPopupCreate(false);
  };

  const onChangeListImgGallery = async ({
    file,
    fileList: newFileList,
  }: any) => {
    setFileList(newFileList);
    if (file.status === "done") {
      // console.log(file);
      try {
        const response = await updateListImgGallery(
          params.productId,
          file.originFileObj
        );
        if (response) {
          message.success("Upload Image successfully");
          setRefreshData(true);
        }
      } catch (error) {
        message.error("Upload Image error");
        console.error(error);
      }
    }
  };

  const onChangeImgTitle = async ({ file, fileList: newFileList }: any) => {
    setFileList(newFileList);
    if (file.status === "done") {
      // console.log(file);
      try {
        const response = await updateImgTitle(
          params.productId,
          file.originFileObj
        );
        if (response) {
          message.success("Upload Image successfully");
          setRefreshData(true);
        }
      } catch (error) {
        message.error("Upload Image error");
        console.error(error);
      }
    }
  };
  // const onPreview = async (file: any) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   setPreviewImage(file.url || (file.preview as string));
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

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
                <ImgCrop rotationSlider>
                  <Upload showUploadList={false} onChange={onChangeImgTitle}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${
                        selectedImage ||
                        productDentail.imageUrl.find(
                          (img) => img.imageType === "thumbnail"
                        )?.imageUrl
                      }`}
                      alt={productDentail.name}
                      className="max-w-full h-96 object-cover rounded-md cursor-pointer"
                    />
                  </Upload>
                </ImgCrop>
              ) : (
                <ImgCrop rotationSlider>
                  <Upload
                    showUploadList={false}
                    className="w-3/5 h-80 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer"
                    onChange={onChangeImgTitle}
                  >
                    <PlusOutlined className="text-3xl text-gray-400" />
                  </Upload>
                </ImgCrop>
              )}
            </div>
          </Col>
          <Col xs={24} md={12}>
            {isEditing ? (
              <Form
                form={form}
                layout="vertical"
                onValuesChange={onValuesChange}
                initialValues={initialValues}
              >
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
                <Button type="primary" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button className="ml-2" onClick={handleCancelClick}>
                  Cancel
                </Button>
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
                      onClick={() => onBtnDelete(img)}
                    />
                  </div>
                </Col>
              ))}
            <Col xs={24} sm={12} md={5} className="mb-4">
              <ImgCrop rotationSlider>
                <Upload
                  className="max-w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer"
                  // onPreview={onPreview}
                  onChange={onChangeListImgGallery}
                  showUploadList={false}
                  // listType="picture-card"
                >
                  <PlusOutlined className="text-3xl text-gray-400" />
                </Upload>
              </ImgCrop>
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
        <ModalAlert
          title="Delete Image"
          visible={isOpenDelPopup}
          onOk={handleOkDeleteImg}
          onCancel={handleCancelDeleteImg}
          content={<>Are you sure you want to delete Image </>}
          okButtonProps={{ danger: true }}
          type="delete"
        />
      </div>
    )
  );
}
