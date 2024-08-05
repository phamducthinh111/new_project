"use client";

import Image from "next/image";
import ProductCard from "./_components/productCard";
import { createProduct, getAllProduct, getSearchSuggestions } from "@/api/product";
import { useEffect, useState } from "react";
import { AutoComplete, Button, Col, Form, Input, Row, Select, message } from "antd";
import { ProductDetail } from "./_components/product.type";
import { useAppContetxt } from "@/app/AppProvider";
import { Role } from "../user/_components/user.type";
import CustomModal from "@/components/Modal/Modal";
import CreateProductForm from "./_components/popupCreateProduct";

export default function Product() {
  const [productData, setProductData] = useState<ProductDetail[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ProductDetail[]>([]);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isDisabledCreate, setIsDisabledCreate] = useState<boolean>(true);
  const [form] = Form.useForm();

  // const { mutate, isLoading } = useMutation(getAllProduct, {
  //   onSuccess: (response) => {
  //     setProductData(response);
  //   },
  //   onError: (error) => {
  //     message.error("Failed to fetch users");
  //     console.error(error);
  //   },
  // });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProduct(searchValue);
      if (response) {
        setProductData(response);
        setRefreshData(false);
      }
    };
    fetchData();
  }, [searchValue, refreshData]);

  const handleSearchChange = async (value: string) => {
    setSearchValue(value);
    if (value) {
      const response = await getSearchSuggestions(value);
      if (response) {
        setSuggestions(response);
      }
    } else {
      setSuggestions([]);
    }
  };

  const onBtnCreate = () => {
    form.resetFields();
    setIsOpenPopup(true);
  };

  const handleCancel = () => {
    setIsOpenPopup(false);

  };

  const handleOk = async () => {
    try {
      const productForm  = form.getFieldsValue();
      const quantity = parseInt(productForm.quantity);
      const price = parseFloat(productForm.price);
      // console.log(typeof quantity,typeof price)
      const response =  await createProduct({
        ...productForm,
        quantity: quantity,
        price: price
      })
      if (response) {
        message.success("Create account successfully");
        setIsOpenPopup(false);
        setRefreshData(true);
      }
    }
    // setIsOpenPopup(false);
    catch (error) {
      message.error("Create account error")
    }
  };

  const onFieldsChange = () => {
    const fieldErrors = form.getFieldsError();
    const hasFieldErrors = fieldErrors.some(
      ({ errors }) => errors && errors.length > 0
    );
  
    const productForm = form.getFieldsValue();
    const isAnyFieldEmpty = Object.values(productForm).some(
      (value) => value === undefined || value === ''
    );
  
    setIsDisabledCreate(hasFieldErrors || isAnyFieldEmpty);
  };
  
  return (
    <div className="mt-5">
      <Row justify="end" className="mb-5" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={4} lg={4} xl={6}>
          <AutoComplete
            style={{ width: 300, marginBottom: 20 }}
            onSearch={handleSearchChange}
            options={suggestions.map((item) => ({ value: item.name }))}
            onSelect={(value) => setSearchValue(value)}
          >
            <Input.Search placeholder="Search by product name" />
          </AutoComplete>
        </Col>
        {/* <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Select
            placeholder="Select role"
            allowClear
            style={{ width: "100%" }}
            // onChange={handleRoleChange}
            // value={selectedRole}
            // options={roleOptions}
          />
        </Col> */}
        <Col xs={24} sm={12} md={4} lg={4} xl={4}>
          <Button
            onClick={onBtnCreate}
            type="primary"
          >
            Create Product
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        {productData &&
          productData.map((product: any, index: number) => (
            <Col span={6} key={index} className="p-2 flex justify-center" >
              <ProductCard productDentail={product} refreshData={()=>setRefreshData(true)} />
            </Col>
          ))}
      </Row>
      <CustomModal
        title="Create Product"
        okText="Add new"
        visible={isOpenPopup}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: isDisabledCreate }}
      >
        <CreateProductForm
          form={form}
          onFieldsChange={onFieldsChange}
        />
      </CustomModal>
    </div>
  );
}
