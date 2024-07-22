"use client";

import { getOrderDentail, updatechangeOrderStatus } from "@/api/order";
import { useEffect, useState } from "react";
import {
  getStatusColor,
  OrderDentail,
  OrderStatus,
} from "../_components/order.type";
import {
  Button,
  Card,
  Col,
  Descriptions,
  message,
  Row,
  Steps,
  Table,
  Tag,
} from "antd";
import Loading from "@/components/loading/loading";
import dayjs from "dayjs";
import {
  ImageUrl,
  ProductDetail,
} from "../../product/_components/product.type";
import { formatVND } from "@/constants/formatVND.constants";
import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ModalAlert from "@/components/AlertModal/AlertModal";
import { useRouter } from "next/navigation";

const { Step } = Steps;

const statusSteps = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Shipped,
  OrderStatus.Delivered,
];

const getStatusStepIndex = (status: OrderStatus) => {
  return statusSteps.indexOf(status);
};

const getNextStatus = (status?: OrderStatus) => {
  switch (status) {
    case OrderStatus.Cancelled:
    case OrderStatus.Pending:
      return OrderStatus.Processing;
    case OrderStatus.Processing:
      return OrderStatus.Shipped;
    case OrderStatus.Shipped:
      return OrderStatus.Delivered;
    default:
      return null;
  }
};

export default function ProductDetailPage({ params }: any) {
  const { orderId } = params;
  const router = useRouter();
  const [orderDentail, setOrderDentail] = useState<OrderDentail>();
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [isCancelStatus, setIsCancelStatus] = useState<boolean>(false);
  const [isOpentPopupChangeStatus, setIsOpentPopupChangeStatus] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (orderId) {
        const response = await getOrderDentail(orderId);
        if (response) {
          setOrderDentail(response);
          setRefreshData(false);
        }
      }
    };
    fetchData();
  }, [orderId, refreshData]);
  const columns = [
    {
      // title: 'Thumbnail',
      dataIndex: "product",
      key: "thumbnail",
      className: "max-w-14",
      render: (product: ProductDetail) => {
        const thumbnail = product.imageUrl.find(
          (image: ImageUrl) => image.imageType === "thumbnail"
        );
        return thumbnail ? (
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
        );
      },
    },
    {
      // title: "Product Name",
      dataIndex: ["product", "name"],
      key: "name",
      render: (text: string) => {
        return <strong>{text}</strong>;
      },
    },
    {
      // title: "Price",
      dataIndex: "price",
      key: "price",
      className: "text-base",
      render: (text: number) => `${formatVND(text)}`,
    },
    {
      // title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      className: "text-base",
    },
    {
      // title: "Total",
      key: "total",
      className: "text-base",
      render: (record: any) => `${formatVND(record.price * record.quantity)}`,
    },
  ];
  const totalQuantity = orderDentail?.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const onBtnCancelStatusOrder = () => {
    setIsCancelStatus(true);
    setIsOpentPopupChangeStatus(true);
  };

  const onBtnNextStatusOrder = () => {
    setIsCancelStatus(false);
    setIsOpentPopupChangeStatus(true);
  };

  const handleCancelOrder = async () => {
    try {
      const status: any = {
        status: OrderStatus.Cancelled,
      };
      if (orderDentail) {
        const response = await updatechangeOrderStatus(
          orderDentail.orderId,
          status
        );
        if (response) {
          message.success(`Cancel Order successfully`);
          setRefreshData(true);
          setIsOpentPopupChangeStatus(false);
          router.back()
        }
      }
    } catch (err) {
      console.error(err);
      message.error(`Cancel Order Error`);
    }
  };

  const handleNextStatus = async () => {
    try {
      const nextStatus = getNextStatus(orderDentail?.status);
      if (nextStatus && orderDentail) {
        // Xử lý logic cập nhật trạng thái đơn hàng ở đây, ví dụ như gọi API để cập nhật trạng thái đơn hàng
        console.log(`Cập nhật trạng thái đơn hàng sang: ${nextStatus}`);
      }
      const status: any = {
        status: nextStatus,
      };
      if (orderDentail) {
        const response = await updatechangeOrderStatus(
          orderDentail.orderId,
          status
        );
        if (response) {
          message.success(`Change Order Status successfully`);
          setRefreshData(true);
          setIsOpentPopupChangeStatus(false);
          router.back()
        }
      }
    } catch (err) {
      console.error(err);
      message.error(`Change Order Status Error`);
    }
  };

  const handleCancelPopup = async () => {
    setIsOpentPopupChangeStatus(false);
  }

  const handleOk = () => {
    if(isCancelStatus) {
      handleCancelOrder();
    } else {
      handleNextStatus()
    }
  }

  return (
    orderDentail && (
      <div className="mt-5">
        <div className="mt-5 flex items-center">
          <b className="text-2xl mr-5">Order code: #{orderDentail.orderId}</b>
          <Tag color={getStatusColor(orderDentail.status) || ""}>
            <strong>{orderDentail?.status.toUpperCase()}</strong>
          </Tag>
        </div>
        <i>Date: {dayjs(orderDentail.createDate).format("DD-MM-YYYY")}</i>
        <div className="mt-5">
          <Steps current={getStatusStepIndex(orderDentail.status)}>
            {statusSteps.map((status) => (
              <Step
                key={status}
                title={status.charAt(0).toUpperCase() + status.slice(1)}
                //   icon={<div style={{ color: getStatusColor(status) }}>●</div>}
              />
            ))}
          </Steps>
        </div>
        <div className="mt-5">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title={`Order Detail`} className="mb-5">
                <Descriptions bordered>
                  <Descriptions.Item label="Order ID" span={3}>
                    {orderDentail.orderId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status" span={3}>
                    <Tag color={getStatusColor(orderDentail.status)}>
                      <b>{orderDentail.status.toUpperCase()}</b>
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Price" span={3}>
                    {formatVND(orderDentail.totalPrice)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Create Date" span={3}>
                    {dayjs(orderDentail.createDate).format(
                      "HH:mm - DD/MM/YYYY"
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={16}>
              <Card title="User Information" className="mb-5">
                <Descriptions bordered>
                  <Descriptions.Item
                    label={
                      <>
                        <UserOutlined /> Username
                      </>
                    }
                    span={3}
                  >
                    {orderDentail.user.username}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <UserAddOutlined /> Full Name
                      </>
                    }
                    span={3}
                  >
                    {orderDentail.user.fullname}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <MailOutlined /> Email
                      </>
                    }
                    span={3}
                  >
                    {orderDentail.user.email}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <PhoneOutlined /> Phone
                      </>
                    }
                    span={3}
                  >
                    {orderDentail.user.phone}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <HomeOutlined /> Address
                      </>
                    }
                    span={3}
                  >
                    {orderDentail.user.address}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <CalendarOutlined /> Birthday
                      </>
                    }
                    span={3}
                  >
                    {orderDentail.user.birthday &&
                      dayjs(orderDentail.user.birthday).format("DD-MM-YYYY")}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="mt-5">
          <Card title="Order Items">
            <Table
              dataSource={orderDentail.orderItems}
              columns={columns}
              rowKey="id"
              pagination={false}
              showHeader={false}
              summary={() => {
                return (
                  <Table.Summary.Row className="bg-gray-100">
                    <Table.Summary.Cell
                      index={0}
                      colSpan={2}
                    ></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <strong className="text-base">Total</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <strong className="text-base">{totalQuantity}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <strong className="text-base">
                        {formatVND(orderDentail.totalPrice)}
                      </strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </Card>
        </div>
        <div className="flex justify-end gap-4 mt-5">
          <Button
            size="large"
            type="primary"
            danger
            disabled={
              orderDentail.status === OrderStatus.Cancelled ? true : false
            }
            onClick={onBtnCancelStatusOrder}
          >
            Cancel
          </Button>
          {getNextStatus(orderDentail.status) && (
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: getStatusColor(
                  getNextStatus(orderDentail.status)!
                ),
                borderColor: getStatusColor(
                  getNextStatus(orderDentail.status)!
                ),
              }}
              onClick={onBtnNextStatusOrder}
            >
              {getNextStatus(orderDentail.status)!.charAt(0).toUpperCase() +
                getNextStatus(orderDentail.status)!.slice(1)}
            </Button>
          )}
        </div>
        <ModalAlert
          visible={isOpentPopupChangeStatus}
          type={isCancelStatus ? "warning": "info"}
          title={isCancelStatus ? `Cancel status` : `Change status`}
          okText={isCancelStatus ? "Save": "OK"}
          onCancel={handleCancelPopup}
          onOk={handleOk}
          okButtonProps={isCancelStatus && {danger : true}}
          content={
            getNextStatus(orderDentail.status) &&
            (isCancelStatus ? (
              <>
                Do you want cancel order{" "}
                <strong>#{orderDentail.orderId}</strong>
              </>
            ) : (
              <>
                Do you want change status Ordercode{" "}
                <strong>#{orderDentail.orderId}</strong>
                {" "}to{" "}
                <strong>
                  {getNextStatus(orderDentail.status)!.charAt(0).toUpperCase() +
                    getNextStatus(orderDentail.status)!.slice(1)}
                </strong>
              </>
            ))
          }
        />
      </div>
    )
  );
}
