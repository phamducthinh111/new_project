"use client";

import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Popover,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import Image from "next/image";
import { ImageUrl } from "../product/_components/product.type";
import {
  OrderDentail,
  OrderStatus,
  StatusOptions,
} from "./_components/order.type";
import { useEffect, useState } from "react";
import { useAppContetxt } from "@/app/AppProvider";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  EyeOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import CustomModal from "@/components/Modal/Modal";
import FormChangeStatus from "./_components/popupChangeStatus";
import {
  getAllOrders,
  removeOrder,
  updatechangeOrderStatus,
} from "@/api/order";
import ModalAlert from "@/components/AlertModal/AlertModal";
import DeleteOrderForm from "./_components/popupDeleteOrder";
import { errorOrderMessages } from "@/constants/error-messages.constants";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { formatVND } from "@/constants/formatVND.constants";

const dateFormat = "DD/MM/YYYY";

export default function Order() {
  const { userProfile } = useAppContetxt();
  const router = useRouter();
  const [ordersData, setOrdersData] = useState<OrderDentail[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>();
  const [isOpenPopupChangeStatus, setIsOpenPopupChangeStatus] =
    useState<boolean>(false);
  const [isDisabledChangeStatus, setIsDisabledChangeStatus] =
    useState<boolean>(true);
  const [currentOrderId, setCurrentOrderId] = useState<number | undefined>();
  const [isOpenPopupDeleteOrder, setIsOpenPopupDeleteOrder] =
    useState<boolean>(false);
  const [formChangeStatusOrder] = Form.useForm();
  const [formDeleteOrder] = Form.useForm();
  const [formDate, setFromDate] = useState<Dayjs>();
  const [toDate, setToDate] = useState<Dayjs>();
  useEffect(() => {
    // mutate(searchValue, selectedRole);
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllOrders(
        selectedStatus,
        undefined,
        formDate,
        toDate
      );
      if (response) {
        response.sort((a: OrderDentail, b: OrderDentail) => {
          const dateA = new Date(a.createDate);
          const dateB = new Date(b.createDate);
          return dateB.getTime() - dateA.getTime();
        });
        setOrdersData(response);
        setRefreshData(false);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [refreshData, selectedStatus, formDate, toDate]);

  const handleStatusSelect = async (value: OrderStatus) => {
    setSelectedStatus(value);
  };

  const handleFromDateRangeChange = (date: Dayjs) => {
    setFromDate(date);
  };

  const handleToDateRangeChange = (date: Dayjs) => {
    setToDate(date);
  };

  const onBtnChangeStatus = (record: OrderDentail) => {
    formChangeStatusOrder.resetFields();
    setIsOpenPopupChangeStatus(true);
    setIsDisabledChangeStatus(true);
    setIsOpenPopupDeleteOrder(false);
    setCurrentOrderId(record.orderId);
  };

  const handleCancelChangeStatus = () => {
    setIsOpenPopupChangeStatus(false);
  };

  const handleOkChangeStatus = async () => {
    try {
      const status = formChangeStatusOrder.getFieldsValue();
      if (currentOrderId) {
        const response = await updatechangeOrderStatus(currentOrderId, status);
        if (response) {
          message.success(`Change Status successfully`);
          setRefreshData(true);
          setIsOpenPopupChangeStatus(false);
        }
      }
    } catch (err) {
      console.error(err);
      message.error(`Change Status Error`);
    }
    // setIsOpenPopupChangeStatus(false)
  };

  const onFieldsChangeStatusOrder = () => {
    const fieldErrors = formChangeStatusOrder.getFieldsError();
    const hasFieldErrors = fieldErrors.some(
      ({ errors }) => errors && errors.length > 0
    );
    setIsDisabledChangeStatus(hasFieldErrors);
  };

  const onBtnDeleteOrder = (record: OrderDentail) => {
    formDeleteOrder.resetFields();
    setIsOpenPopupChangeStatus(false);
    setIsOpenPopupDeleteOrder(true);
    setCurrentOrderId(record.orderId);
  };

  const handleCancelDeleteOrder = () => {
    setIsOpenPopupDeleteOrder(false);
  };

  const handleOkDeleteOrder = async () => {
    try {
      const desc = formDeleteOrder.getFieldsValue();
      const value = formDeleteOrder.getFieldValue("desc");
      if (!value) {
        formDeleteOrder.setFields([
          {
            name: "desc",
            errors: [errorOrderMessages.desc.required],
          },
        ]);
        return false;
      }

      if (currentOrderId) {
        const response = await removeOrder(currentOrderId, desc);
        if (response) {
          message.success(`Deleted Order successfully`);
          setRefreshData(true);
          setIsOpenPopupDeleteOrder(false);
        }
      }
    } catch (err) {
      console.error(err);
      message.error(`Deleted Order Error`);
    }
    // setIsOpenPopupDeleteOrder(false)
  };

  const onFieldsChangeDeleteOrder = () => {
    const fieldErrors = formDeleteOrder.getFieldsError();
    const hasFieldErrors = fieldErrors.some(
      ({ errors }) => errors && errors.length > 0
    );
  };

  const onBtnViewOrder = (record: OrderDentail) => {
    router.push(`order/${record.orderId}`);
  };

  const actionPopover = (record: OrderDentail) => (
    <Popover
      content={
        <div className="flex flex-col items-start space-y-2">
          <Button
            key="view"
            title="Title"
            onClick={() => onBtnViewOrder(record)}
            icon={<EyeOutlined />}
            type="link"
          >
            Detail
          </Button>
          <Button
            key="change"
            onClick={() => onBtnChangeStatus(record)}
            icon={<SyncOutlined />}
            type="link"
          >
            Change Status
          </Button>
          {userProfile?.role === "ADMIN" || userProfile?.role === "MANAGER" ? (
            <Button
              key="delete"
              onClick={() => onBtnDeleteOrder(record)}
              icon={<DeleteOutlined />}
              type="link"
              danger
            >
              Delete
            </Button>
          ) : null}
        </div>
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
      render: (_: string, __: OrderDentail, index: number) => index + 1, // Hiển thị số thứ tự
    },
    {
      title: "Product",
      dataIndex: "imageUrl",
      key: "imageUrl",
      className: "max-w-64",
      render: (_: string, record: OrderDentail) => (
        <div>
          {record.orderItems.map((orderItem) => {
            const product = orderItem.product;
            const thumbnail = product?.imageUrl.find(
              (img) => img.imageType === "thumbnail"
            );
            return (
              <div key={orderItem.id} className="flex mb-2 items-center">
                <span className="mr-2 text-base">x{orderItem.quantity}</span>
                {thumbnail ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${thumbnail.imageUrl}`}
                    alt="Product Thumbnail"
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <img
                    src="https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
                    alt="Default Thumbnail"
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                )}
                <strong className="ml-2">{product.name}</strong>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: "OrderCode",
      dataIndex: "orderId",
      key: "orderId",
      className: "max-w-24",
    },
    {
      title: "Order Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    // {
    //   title: "Customer",
    //   dataIndex: "createUser",
    //   key: "createUser",
    //   render: (text: string) => <strong>{text}</strong>,
    // },
    {
      title: "Price (VNĐ)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text: number) => (
        <span className="text-base">{formatVND(text)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "max-w-24",
      render: (text: string) => {
        let color;
        switch (text) {
          case OrderStatus.Pending:
            color = "gold";
            break;
          case OrderStatus.Processing:
            color = "geekblue";
            break;
          case OrderStatus.Shipped:
            color = "purple";
            break;
          case OrderStatus.Delivered:
            color = "green";
            break;
          case OrderStatus.Cancelled:
            color = "red";
            break;
          default:
            color = "cyan";
            break;
        }
        return (
          <Tag color={color}>
            <strong>{text.toUpperCase()}</strong>
          </Tag>
        );
      },
    },
    // Thêm các cột chỉ dành cho admin hoặc manager nếu có
    ...(userProfile?.role === "ADMIN" || userProfile?.role === "MANAGER"
      ? [
          {
            title: "Update User",
            dataIndex: "updateUser",
            key: "updateUser",
            className: "max-w-20",
          },
          {
            title: "Update Date",
            dataIndex: "updateDate",
            key: "updateDate",
            className: "max-w-20",
            render: (text: string) => new Date(text).toLocaleString(),
          },
        ]
      : []),
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: string, record: OrderDentail) =>
        // record.role === Role.admin ||
        // record.username === userProfile.username
        //   ? null
        //   :
        actionPopover(record),
    },
  ];

  return (
    <div className="mt-5">
      <Row className="mb-5 flex justify-between">
        <Col flex="1" className="flex items-center">
          <Input placeholder="Order Code" className="w-full max-w-xs" />
        </Col>
        <Col flex="1" className="flex items-center justify-center">
          <DatePicker
            format={dateFormat}
            placeholder="From date"
            style={{ width: "40%" }}
            onChange={handleFromDateRangeChange}
          />
          <span className="mx-3">
            <ArrowRightOutlined className="w-3" />
          </span>
          <DatePicker
            format={dateFormat}
            placeholder="To date"
            style={{ width: "40%" }}
            onChange={handleToDateRangeChange}
          />
        </Col>
        <Col flex="1" className="flex items-center justify-end">
          <Select
            placeholder="Select status"
            allowClear
            className="w-full max-w-xs"
            onChange={handleStatusSelect}
            options={StatusOptions}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={ordersData}
        rowKey="orderId"
        loading={isLoading}
        scroll={{ x: 1000 }}
      />
      <CustomModal
        title={"Change Order Status"}
        visible={isOpenPopupChangeStatus}
        onOk={handleOkChangeStatus}
        onCancel={handleCancelChangeStatus}
        okButtonProps={{ disabled: isDisabledChangeStatus }}
      >
        <FormChangeStatus
          form={formChangeStatusOrder}
          onFieldsChange={onFieldsChangeStatusOrder}
          currentOrderId={currentOrderId}
        />
      </CustomModal>
      <ModalAlert
        title="Delete Order"
        visible={isOpenPopupDeleteOrder}
        onOk={handleOkDeleteOrder}
        onCancel={handleCancelDeleteOrder}
        type="delete"
        okText="Delete"
        content={
          <>
            Are you sure you want to delete Order{" "}
            <strong>{currentOrderId || ""}</strong> ?
          </>
        }
        okButtonProps={{ danger: true }}
      >
        <DeleteOrderForm
          form={formDeleteOrder}
          onFieldsChange={onFieldsChangeDeleteOrder}
        />
      </ModalAlert>
    </div>
  );
}
