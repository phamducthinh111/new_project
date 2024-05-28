"use client";

import Loading from "@/components/loading/loading";
import {
  Button,
  Col,
  Input,
  Popover,
  Row,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { ListUser, roleOptions } from "../_components/user.type";
import { useMutation } from "react-query";
import { deleteUser, getAllUser, rollbackUser } from "@/api/user";
import {
  DeleteOutlined,
  EllipsisOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import ModalAlert from "@/components/AlertModal/AlertModal";

export default function UsersDeleted() {
  const [userData, setUserData] = useState<ListUser[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ListUser>();
  const [isPopupRollback, setIsPopupRollback] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );
  const activeUsers = true;
  const { mutate, isLoading } = useMutation(getAllUser, {
    onSuccess: (response) => {
      response.sort((a: any, b: any) => {
        const dateA = new Date(a.updateDate);
        const dateB = new Date(b.updateDate);
        return dateB.getTime() - dateA.getTime();
      });
      setUserData(response);
      setRefreshData(false);
    },
    onError: (error) => {
      message.error("Failed to fetch users");
      console.error(error);
    },
  });

  useEffect(() => {
    mutate(activeUsers);
  }, [refreshData]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const filteredData = userData.filter(
    (user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase()) &&
      (!selectedRole || user.role === selectedRole)
  );
  const onBtnRollback = (record: ListUser) => {
    setIsOpenPopup(true);
    setIsPopupRollback(true)
    setCurrentUser(record);
  }

  const onBtnDeleted = (record: ListUser) => {
    setIsOpenPopup(true);
    setIsPopupRollback(false)
    setCurrentUser(record);
  }

  const handleRollback = async () => {
    try {
      const response = await rollbackUser(currentUser?.userId);
      if (response) {
        message.success(`Rollback user successfully`);
        setIsOpenPopup(false);
        setRefreshData(true);
      }
    }catch(error) {
      console.error(error);
    }
  }

  const handleDeleted = async () => {
    try {
      const response = await deleteUser(currentUser?.userId);
      if (response) {
        message.success(`Rollback user successfully`);
        setIsOpenPopup(false);
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
    setIsOpenPopup(false);
  };

  const actionPopover = (record: ListUser) => (
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
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text: string) => {
        let color;
        switch (text.toUpperCase()) {
          case "ADMIN":
            color = "geekblue";
            break;
          case "MANAGER":
            color = "orange";
            break;
          case "EMPLOYEE":
            color = "green";
            break;
          case "USER":
            color = "default";
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
      render: (_: any, record: ListUser) => actionPopover(record),
    },
  ];

  return (
    <div className="mt-5">
      <Row justify="end" className="mb-5" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Input.Search
            placeholder="Search by username"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Select
            placeholder="Select role"
            allowClear
            style={{ width: "100%" }}
            onChange={handleRoleChange}
            value={selectedRole}
            options={roleOptions}
          />
        </Col>
      </Row>
      {isLoading ? (
        <Loading />
      ) : (
        <Table columns={columns} dataSource={filteredData} rowKey="id" />
      )}
      <ModalAlert
        visible={isOpenPopup}
        title={isPopupRollback ? "Rollback User" : "Deleted User"}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={isPopupRollback ? "OK" : "Deleted"}
        type={isPopupRollback ? "info" : "delete"}
        okButtonProps={{danger: !isPopupRollback}}
        content={
          isPopupRollback ? (
            <>
              Are you sure you want to restore user{" "}
              <strong>{currentUser?.username || ""}</strong>?
            </>
          ) : (
            <>
              This action is irreversible. Are you sure you want to delete{" "}
              <strong>{currentUser?.username || ""}</strong>?
            </>
          )
        }
      />
    </div>
  );
}
