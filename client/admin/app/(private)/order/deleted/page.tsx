"use client";

import { Button, Col, DatePicker, Input, message, Popover, Row, Select, Table, Tag } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppContetxt } from "@/app/AppProvider";
import { OrderDentail, OrderStatus, StatusOptions } from "../_components/order.type";
import { ArrowRightOutlined, DeleteOutlined, EllipsisOutlined, EyeOutlined, RollbackOutlined, SyncOutlined } from "@ant-design/icons";
import { deleteOrder, getAllOrders, rollbackOrder } from "@/api/order";
import { formatVND } from "@/constants/formatVND.constants";
import { Dayjs } from "dayjs";
import ModalAlert from "@/components/AlertModal/AlertModal";

export default function Order() {
  const { userProfile } = useAppContetxt();
  const [ordersData, setOrdersData] = useState<OrderDentail[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formDate, setFromDate] = useState<Dayjs>();
  const [toDate, setToDate] = useState<Dayjs>();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>();
  const [isPopupRollback, setIsPopupRollback] = useState<boolean>(false);
  const [isOpenPopupDelete, setIsOpenPopupDelete] = useState<boolean>(false);
  const [orderDentail, setOrderDentail] = useState<OrderDentail>();


  const activeProduct = true;
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    // mutate(searchValue, selectedRole);
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllOrders(
        selectedStatus,
        activeProduct,
        formDate,
        toDate
      );
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

  const onBtnRollback = (record: OrderDentail) => {
    setIsOpenPopupDelete(true);
    setIsPopupRollback(true)
    setOrderDentail(record);
  }

  const onBtnDeleted = (record: OrderDentail) => {
    setIsOpenPopupDelete(true);
    setIsPopupRollback(false)
    setOrderDentail(record);
  }

  const handleRollback = async () => {
    try {
      const response = await rollbackOrder(orderDentail?.orderId);
      if (response) {
        message.success(`Rollback order successfully`);
        setIsOpenPopupDelete(false);
        setRefreshData(true);
      }
    }catch(error) {
      console.error(error);
    }
  }

  const handleDeleted = async () => {
    try {
      const response = await deleteOrder(orderDentail?.orderId);
      if (response) {
        message.success(`Delete order successfully`);
        setIsOpenPopupDelete(false);
        setRefreshData(true);
      }
    }catch(error) {
      console.error(error);
    }
  }

  const handleOk = () => {
    if(isPopupRollback) {
      handleRollback()
    } else {
      handleDeleted()
    }
  };

  const handleCancel = () => {
    setIsOpenPopupDelete(false);
    setIsPopupRollback(false)
  };
  
  const actionPopover = (record: OrderDentail) => (
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
        render: (text: number) => <span className="text-base">{formatVND(text)}</span>,
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
      />
      <ModalAlert
        visible={isOpenPopupDelete}
        title={isPopupRollback ? "Rollback User" : "Deleted User"}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={isPopupRollback ? "OK" : "Deleted"}
        type={isPopupRollback ? "info" : "delete"}
        okButtonProps={{danger: !isPopupRollback}}
        content={
          isPopupRollback ? (
            <>
              Are you sure you want to restore Order{" "}
              <strong>#{orderDentail?.orderId || ""}</strong>?
            </>
          ) : (
            <>
              This action is irreversible. Are you sure you want to delete{" "}
              <strong>#{orderDentail?.orderId || ""}</strong>?
            </>
          )
        }
      />
    </div>
  );
}
