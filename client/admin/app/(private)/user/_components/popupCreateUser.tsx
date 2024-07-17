import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { errorMessages } from "@/constants/error-messages.constants";
import {
  CreateEmpForm,
  ListUser,
  Role,
  defaultPassword,
  roleOptions,
} from "./user.type";
import { regexConstant } from "@/constants/regex.constant";
import { useAppContetxt } from "@/app/AppProvider";

interface CreateUserFormProps {
  form: FormInstance<CreateEmpForm>;
  onFieldsChange: () => void;
  isPopupCreate: boolean;
  currentUser?: ListUser;
}

const CreateUserForm = (
  props: CreateUserFormProps
) => {
  const { form, onFieldsChange, isPopupCreate, currentUser } = props;
  const { userProfile } = useAppContetxt();

  let updatedRoleOptions = [...roleOptions];
  if (userProfile?.role === Role.manager) {
    updatedRoleOptions = updatedRoleOptions.filter(
      (option) => option.value !== Role.manager && option.value !== Role.admin
    );
  }
  
  useEffect(() => {
    if (!isPopupCreate && currentUser) {
      form.setFieldsValue(currentUser);
    } else {
      form.resetFields(); // Đặt lại các trường form nếu không có currentUser
    }
  }, [isPopupCreate, currentUser, form]);

  return (
    <Form
      onFieldsChange={onFieldsChange}
      form={form}
      layout="vertical"
      name="create_user_form"
    >
      <Form.Item
        name="username"
        label={<strong>Username</strong>}
        rules={[
          { required: true, message: errorMessages.username.required },
          { max: 64, message: errorMessages.username.maxlength },
          {
            pattern: regexConstant.username,
            message: errorMessages.username.pattern,
          },
        ]}
        initialValue={isPopupCreate ? '' : currentUser?.username}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          disabled={!isPopupCreate}
          defaultValue={isPopupCreate ? '' : currentUser?.username}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label={<strong>Email</strong>}
        rules={[
          { required: true, message: errorMessages.email.require },
          {
            pattern: regexConstant.validEmail,
            message: errorMessages.email.pattern,
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      {isPopupCreate && (
        <Form.Item
          name="password"
          label={<strong>Password</strong>}
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            readOnly
            defaultValue={defaultPassword}
          />
        </Form.Item>
      )}
      <Form.Item
        name="phone"
        label={<strong>Phone</strong>}
        rules={[
          { required: true, message: errorMessages.phone.required },
          {
            pattern: regexConstant.validPhone,
            message: errorMessages.phone.pattern,
          },
          { max: 20, message: errorMessages.phone.maxlength },
          { min: 9, message: errorMessages.phone.minlength },
        ]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Phone number"
        />
      </Form.Item>
      <Form.Item
        name="address"
        label={<strong>Address</strong>}
        rules={[{ required: true, message: errorMessages.address.required }]}
      >
        <Input
          prefix={<HomeOutlined className="site-form-item-icon" />}
          placeholder="Address"
        />
      </Form.Item>
      <Form.Item
        name="role"
        label={<strong>Role</strong>}
        rules={[{ required: true, message: errorMessages.role.required }]}
      >
        <Select
          placeholder="Select role"
          allowClear
          value={Role.employess}
          options={updatedRoleOptions}
          disabled={!isPopupCreate && userProfile?.role !== Role.admin}
        />
      </Form.Item>
    </Form>
  );
};

export default CreateUserForm;
