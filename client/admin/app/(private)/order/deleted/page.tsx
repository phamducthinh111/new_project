"use client";

import { Button, Col, Popover, Row, Select, Table, Tag } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppContetxt } from "@/app/AppProvider";
import { OrderDentail, OrderStatus } from "../_components/order.type";
import { DeleteOutlined, EllipsisOutlined, EyeOutlined, SyncOutlined } from "@ant-design/icons";
import { getAllOrders } from "@/api/order";

export default function Order() {
  const { userProfile } = useAppContetxt();
  const [ordersData, setOrdersData] = useState<OrderDentail[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const activeProduct = true;

  useEffect(() => {
    // mutate(searchValue, selectedRole);
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllOrders(undefined, activeProduct);
      if (response) {
        response.sort((a: OrderDentail, b: OrderDentail) => {
          const dateA = new Date(a.updateDate);
          const dateB = new Date(b.updateDate);
          return dateB.getTime() - dateA.getTime();
        });
        setOrdersData(response);
        setRefreshData(false);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [refreshData]);

  const actionPopover = (record: OrderDentail) => (
    <Popover
      content={
        <>
          <Button
            key="view"
            // onClick={() => onBtnEdit(record)}
            icon={<EyeOutlined />}
            type="link"
          >
            Detail
          </Button>
          <Button
            key="view"
            // onClick={() => onBtnEdit(record)}
            icon={<SyncOutlined />}
            type="link"
          >
            Change Status
          </Button>
          <Button
            key="delete"
            // onClick={() => onBtnDelete(record)}
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
      render: (_: string, __: OrderDentail, index: number) => index + 1, // Hiển thị số thứ tự
    },
    // {
    //   title: "Product",
    //   dataIndex: "imageUrl",
    //   key: "imageUrl",
    //   className: "max-w-60",
    //   render: (_: string, record: OrderDentail) => (
    //     <div>
    //       {record.orderItems.map((orderItem) => {
    //         const product = orderItem.product;
    //         const thumbnail = product?.imageUrl.find(
    //           (img) => img.imageType === "thumbnail"
    //         );
    //         return (
    //           <div key={orderItem.id} className="flex mb-2 items-center">
    //             <span className="mr-2 text-base">x {orderItem.quantity}</span>
    //             {thumbnail ? (
    //               <img
    //                 src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${thumbnail.imageUrl}`}
    //                 alt="Product Thumbnail"
    //                 style={{
    //                   width: 70,
    //                   height: 70,
    //                   objectFit: "cover",
    //                   marginRight: "10px",
    //                 }}
    //               />
    //             ) : (
    //               <img
    //                 src="https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
    //                 alt="Default Thumbnail"
    //                 style={{
    //                   width: 70,
    //                   height: 70,
    //                   objectFit: "cover",
    //                   marginRight: "10px",
    //                 }}
    //               />
    //             )}
    //             <strong className="ml-2">{product.name}</strong>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   ),
    // },
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
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (text: string) => <i className="">{text}</i>,
    },
    {
        title: "Price (VNĐ)",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (text: string) => <span className="text-base">{text},000</span>,
      },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   className: "max-w-24",
    //   render: (text: string) => {
    //     let color;
    //     switch (text) {
    //       case OrderStatus.Pending:
    //         color = "gold";
    //         break;
    //       case OrderStatus.Processing:
    //         color = "geekblue";
    //         break;
    //       case OrderStatus.Shipped:
    //         color = "purple";
    //         break;
    //       case OrderStatus.Delivered:
    //         color = "green";
    //         break;
    //       case OrderStatus.Cancelled:
    //         color = "red";
    //         break;
    //       default:
    //         color = "cyan";
    //         break;
    //     }
    //     return (
    //       <Tag color={color}>
    //         <strong>{text.toUpperCase()}</strong>
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: "Deleted User",
      dataIndex: "updateUser",
      key: "updateUser",
    },
    {
      title: "Deleted Date",
      dataIndex: "updateDate",
      key: "updateDate",
      className: "max-w-20",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: string, record: any) =>
        // record.role === Role.admin ||
        // record.username === userProfile.username
        //   ? null
        //   : 
        actionPopover(record),
    },
  ];

  return (
    <div className="mt-5">
      <Row justify="center" className="mb-5" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={4} lg={4} xl={4}>
          <Select
            placeholder="Select status"
            allowClear
            style={{ width: "100%" }}
            // onChange={handleRoleChange}
            // value={selectedRole}
            // options={roleOptions}
          />
        </Col>
      </Row>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <Table
        columns={columns}
        dataSource={ordersData}
        rowKey="orderId"
        loading={isLoading}
      />
      {/* )} */}
    </div>
  );
}
