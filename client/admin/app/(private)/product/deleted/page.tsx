"use client";

import Image from "next/image";
import { useMutation } from "react-query";
import {
  deleteProduct,
  getAllProduct,
  getSearchSuggestions,
  rollbackProduct,
} from "@/api/product";
import { ChangeEvent, useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Input,
  Popover,
  Row,
  Table,
  message,
} from "antd";
import { ImageUrl, ProductDetail } from "../_components/product.type";
import ProductCard from "../_components/productCard";
import {
  DeleteOutlined,
  EllipsisOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import ModalAlert from "@/components/AlertModal/AlertModal";

export default function Product() {
  const [productData, setProductData] = useState<ProductDetail[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<ProductDetail>();
  const [isPopupRollback, setIsPopupRollback] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ProductDetail[]>([]);
  const activeProduct = true;

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
      const response = await getAllProduct(searchValue,activeProduct);
      if (response) {
        setProductData(response);
        setRefreshData(false);
      }
    };
    fetchData();
  }, [searchValue,refreshData]);

  const handleSearchChange = async (value: string) => {
    setSearchValue(value);
    if (value) {
      const response = await getSearchSuggestions(value, activeProduct);
      if (response) {
        setSuggestions(response);
      }
    } else {
      setSuggestions([]);
    }
  };

  const filteredData = productData.filter(
    (product) => product.name.toLowerCase().includes(searchValue.toLowerCase())
    // &&
    //   (!selectedRole || user.role === selectedRole)
  );

  const onBtnRollback = (record: ProductDetail) => {
    setIsOpenPopup(true);
    setIsPopupRollback(true);
    setCurrentProduct(record);
  };

  const onBtnDeleted = (record: ProductDetail) => {
    setIsOpenPopup(true);
    setIsPopupRollback(false);
    setCurrentProduct(record);
  };

  const handleRollback = async () => {
    try {
      const response = await rollbackProduct(currentProduct?.productId);
      if (response) {
        message.success(`Rollback product successfully`);
        setIsOpenPopup(false);
        setRefreshData(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleted = async () => {
    try {
      const response = await deleteProduct(currentProduct?.productId);
      if (response) {
        message.success(`Deleted user successfully`);
        setIsOpenPopup(false);
        setRefreshData(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = () => {
    if (isPopupRollback) {
      handleRollback();
    } else {
      handleDeleted();
    }
  };

  const handleCancel = () => {
    setIsOpenPopup(false);
  };

  const actionPopover = (record: ProductDetail) => (
    <Popover
      content={
        <>
          <Button
            key="rollback"
            onClick={() => onBtnRollback(record)}
            icon={<RollbackOutlined />}
            type="link"
          >
            Rollback
          </Button>
          <Button
            key="delete"
            onClick={() => onBtnDeleted(record)}
            icon={<DeleteOutlined />}
            type="link"
            danger
          >
            Delete
          </Button>
        </>
      }
      trigger="click"
    >
      <Button type="text" icon={<EllipsisOutlined />} />
    </Popover>
  );

  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1, // Hiển thị số thứ tự
    },
    {
      title: "Name Product",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrls: ImageUrl[]) => {
        const thumbnail = imageUrls.find(
          (img) => img.imageType === "thumbnail"
        );
        return thumbnail ? (
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${thumbnail.imageUrl}`}
            alt="Product Thumbnail"
            style={{ width: 70, height: 70, objectFit: "cover" }}
          />
        ) : (
          <img
            src="https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
            alt="Default Thumbnail"
            style={{ width: 70, height: 70, objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Type",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "Deleted Date",
      dataIndex: "updateDate",
      key: "deletedDate",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Deleted User",
      dataIndex: "updateUser",
      key: "deletedUser",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: ProductDetail) => actionPopover(record),
    },
  ];

  return (
    <div className="mt-5">
      <Row justify="end" className="mb-5" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
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
            onChange={handleRoleChange}
            value={selectedRole}
            options={roleOptions}
          />
        </Col> */}
      </Row>
      <Table columns={columns} dataSource={filteredData} />
      {/* <Row justify={"center"}>
        {productData &&
          productData.map((product: any, index: number) => (
            <Col span={8} key={index} className="p-2">
              <ProductCard
                productDentail={product}
                refreshData={() => setRefreshData(true)}
              />
            </Col>
          ))}
      </Row> */}
      <ModalAlert
        visible={isOpenPopup}
        title={isPopupRollback ? "Rollback User" : "Deleted User"}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={isPopupRollback ? "OK" : "Deleted"}
        type={isPopupRollback ? "info" : "delete"}
        okButtonProps={{ danger: !isPopupRollback }}
        content={
          isPopupRollback ? (
            <>
              Are you sure you want to restore product <br />
              <strong>{currentProduct?.name || ""}</strong>?
            </>
          ) : (
            <>
              This action is irreversible. Are you sure you want to delete{" "}
              <strong>{currentProduct?.name || ""}</strong>?
            </>
          )
        }
      />
    </div>
  );
}
