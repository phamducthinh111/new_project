"use client";

import { createEmp, getAllUser, removeUser, resetPassword, updateRoleEmp } from "@/api/user";
import { useAppContetxt } from "@/app/AppProvider";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Menu,
  Popover,
  Row,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  UnlockOutlined,
  RedoOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import CustomModal from "@/components/Modal/Modal";
import CreateUserForm from "./_components/popupCreateUser";
import {
  ListUser,
  Role,
  defaultPassword,
  roleOptions,
} from "./_components/user.type";
import { useMutation, useQuery } from "react-query";
import Loading from "@/components/loading/loading";
import ModalAlert from "@/components/AlertModal/AlertModal";

export default function User() {
  const { userProfile } = useAppContetxt();
  const [userData, setUserData] = useState<ListUser[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ListUser[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [form] = Form.useForm();
  const [isPopupCreate, setisPopupCreate] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isOpenDelPopup, setIsOpenDelPopup] = useState<boolean>(false);
  const [isDisabledCreate, setIsDisabledCreate] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<ListUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenPopupResetPassword, setIsOpenPopupResetPassword] =
    useState<boolean>(false);

  // const { mutate, isLoading } = useMutation(getAllUser, {
  //   onSuccess: (response) => {
  //     response.sort((a: any, b: any) => {
  //       if (a.role === Role.admin) return -1;
  //       if (b.role === Role.admin) return 1;
  //       const dateA = new Date(a.updateDate);
  //       const dateB = new Date(b.updateDate);
  //       return dateB.getTime() - dateA.getTime();
  //     });
  //     setUserData(response);
  //     setRefreshData(false);
  //   },
  //   onError: (error) => {
  //     message.error("Failed to fetch users");
  //     console.error(error);
  //   },
  // });

  useEffect(() => {
    // mutate(searchValue, selectedRole);
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllUser(searchValue, selectedRole);
      if (response) {
        response.sort((a: ListUser, b: ListUser) => {
          if (a.role === Role.admin) return -1;
          if (b.role === Role.admin) return 1;
          const dateA = new Date(a.updateDate);
          const dateB = new Date(b.updateDate);
          return dateB.getTime() - dateA.getTime();
        });
        setUserData(response);
        setRefreshData(false);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [refreshData, searchValue, selectedRole]);

  const handleSearchChange = async (value: string) => {
    setSearchValue(value);
    if (value) {
      const response = await getAllUser(value);
      if (response) {
        setSuggestions(response);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleRoleChange = async (value: Role) => {
    setSelectedRole(value);
    if (value) {
      const response = await getAllUser(undefined, value);
      if (response) {
        setSuggestions(response);
      }
    } else {
      setSuggestions([]);
    }
  };

  /// create account
  const onBtnCreate = () => {
    form.resetFields();
    setIsOpenPopup(true);
    setisPopupCreate(true);
    setIsOpenDelPopup(false);
    setIsOpenPopupResetPassword(false);
  };
  const onCreateNew = async () => {
    try {
      const value = form.getFieldsValue();
      const response = await createEmp({
        ...value,
        password: defaultPassword,
      });
      if (response) {
        message.success("Create account successfully");
        setIsOpenPopup(false);
        setRefreshData(true);
      }
    } catch (error: any) {
      console.error(error);
      if (error && error.message.includes("Username")) {
        form.setFields([
          {
            name: "username",
            errors: [error.message],
          },
        ]);
      } else if (error.message.includes("Email")) {
        form.setFields([
          {
            name: "email",
            errors: [error.message],
          },
        ]);
      }
    }
  };

  const onBtnEdit = (record: ListUser) => {
    setIsOpenPopup(true);
    setisPopupCreate(false);
    setIsOpenDelPopup(false);
    setIsOpenPopupResetPassword(false);
    setCurrentUser(record);
  };

  const onBtnDelete = async (record: ListUser) => {
    setIsOpenDelPopup(true);
    setCurrentUser(record);
    setIsOpenPopup(false);
    setIsOpenPopupResetPassword(false);
  };

  const handleEdit = async () => {
    try {
      const value = form.getFieldsValue(["role"]);
      const response = await updateRoleEmp(currentUser?.userId, value);
      if (response) {
        message.success(`Update role account successfully`);
        setIsOpenPopup(false);
        setRefreshData(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOkDelete = async () => {
    // setIsOpenDelPopup(true)
    try {
      const response = await removeUser(currentUser?.userId);
      if (response) {
        message.success(`Deleted account successfully`);
        setIsOpenDelPopup(false);
        setRefreshData(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = async () => {
    try {
      if (isPopupCreate) {
        onCreateNew();
      } else {
        handleEdit();
      }
      setIsDisabledCreate(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsOpenPopup(false);
    setIsOpenDelPopup(false);
    setisPopupCreate(false);
    setIsOpenPopupResetPassword(false);
  };

  const onFieldsChange = () => {
    const fieldErrors = form.getFieldsError();
    const hasFieldErrors = fieldErrors.some(
      ({ errors }) => errors && errors.length > 0
    );
    const accountForm = form.getFieldsValue();
    const fieldsWithoutPassword = Object.keys(accountForm).filter(
      (field) => field !== "password"
    );
    const isAnyFieldEmpty = fieldsWithoutPassword.some(
      (field) => !accountForm[field]
    );
    setIsDisabledCreate(isAnyFieldEmpty || hasFieldErrors);
  };

  const onBtnResetPassword = (record: ListUser) => {
    setIsOpenDelPopup(false);
    setCurrentUser(record);
    setIsOpenPopup(false);
    setIsOpenPopupResetPassword(true);
  };

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword(currentUser?.userId);
      if (response) {
        message.success(`Reset password successfully`);
        setIsOpenPopupResetPassword(false);
        setRefreshData(true);
      }
    } catch (error) {
      console.error(error);
      message.error(`Reset password error`);
    }
  }

  const actionPopover = (record: ListUser) => (
    <Popover
      content={
        <div className="flex flex-col items-start space-y-2">
          <Button
            key="edit"
            onClick={() => onBtnEdit(record)}
            icon={<EditOutlined />}
            type="link"
          >
            Edit
          </Button>
          <Button
            key="edit"
            onClick={() => onBtnResetPassword(record)}
            icon={<SyncOutlined />}
            type="link"
          >
            Reset Password
          </Button>
          <Button
            key="delete"
            onClick={() => onBtnDelete(record)}
            icon={<DeleteOutlined />}
            type="link"
            danger
          >
            Delete
          </Button>
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
      render: (_: string, __: ListUser, index: number) => index + 1, // Hiển thị số thứ tự
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
    // Thêm các cột chỉ dành cho admin hoặc manager nếu có
    ...(userProfile?.role === "ADMIN" || userProfile?.role === "MANAGER"
      ? [
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: (text: string) => new Date(text).toLocaleString(),
          },
          {
            title: "Update Date",
            dataIndex: "updateDate",
            key: "updateDate",
            render: (text: string) => new Date(text).toLocaleString(),
          },
          {
            title: "Create User",
            dataIndex: "createUser",
            key: "createUser",
          },
          {
            title: "Update User",
            dataIndex: "updateUser",
            key: "updateUser",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_: string, record: ListUser) =>
              record.role === Role.admin ||
              record.username === userProfile.username
                ? null
                : actionPopover(record),
          },
        ]
      : []),
  ];

  return (
    <div className="mt-5">
      <Row justify="end" className="mb-5" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={4} lg={4} xl={4}>
          {/* <Input.Search
            placeholder="Search by username"
            value={searchValue}
            onChange={handleSearchChange}
          /> */}
          <AutoComplete
            // style={{ width: 300, marginBottom: 20 }}
            onSearch={handleSearchChange}
            options={suggestions.map((item) => ({ value: item.username }))}
            onSelect={(value) => setSearchValue(value)}
          >
            <Input.Search placeholder="Search by username" />
          </AutoComplete>
        </Col>
        <Col xs={24} sm={12} md={4} lg={4} xl={4}>
          <Select
            placeholder="Select role"
            allowClear
            style={{ width: "100%" }}
            onChange={handleRoleChange}
            value={selectedRole}
            options={roleOptions}
          />
        </Col>
        {userProfile?.role === Role.admin ||
        userProfile?.role === Role.manager ? (
          <Col xs={24} sm={12} md={4} lg={4} xl={4}>
            <Button onClick={onBtnCreate} type="primary">
              Create User
            </Button>
          </Col>
        ) : null}
      </Row>
      {isLoading ? (
        <Loading />
      ) : (
        <Table columns={columns} dataSource={userData} rowKey="userId" />
      )}
      <CustomModal
        title={isPopupCreate ? "Create User" : "Update User"}
        okText={isPopupCreate ? "Add New" : "Save"}
        visible={isOpenPopup}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: isDisabledCreate }}
      >
        <CreateUserForm
          form={form}
          onFieldsChange={onFieldsChange}
          isPopupCreate={isPopupCreate}
          currentUser={currentUser}
        />
      </CustomModal>
      <ModalAlert
        title="Delete User"
        visible={isOpenDelPopup}
        onOk={handleOkDelete}
        onCancel={handleCancel}
        okText="Delete"
        content={
          <>
            Are you sure you want to delete user{" "}
            <strong>{currentUser?.username || ""}</strong>?
          </>
        }
        okButtonProps={{ danger: true }}
        type="delete"
      ></ModalAlert>
      <ModalAlert
        title="Reset Password"
        visible={isOpenPopupResetPassword}
        onOk={handleResetPassword}
        onCancel={handleCancel}
        okText="Reset"
        content={
          <>
            Are you sure you want to reset password user{" "}
            <strong>{currentUser?.username || ""}</strong>?
          </>
        }
      ></ModalAlert>
    </div>
  );
}
