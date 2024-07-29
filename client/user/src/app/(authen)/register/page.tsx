"use client";

import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import Link from "next/link";
import { errorMessages } from "@/constants/error-messages.constants";
import { regexConstant } from "@/constants/regex.constant";
import { register } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import Notification from "@/components/notification/NotificationComponent";
import { RegisterForm } from "@/interface/user.interface";
import { useAppSelector } from "@/store/store";

export default function Register() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isloadingConfỉm, setIsLoadingConfirm] = useState(false);
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const isLanguageVN = activeLanguage === "vn";
  const {mutate} = useMutation(register, {
    onSuccess: async (newData) => {
      router.push('log-in')
      Notification({ type: 'success', message: 'Success', description: 'Account create successfully' });
    },
    onError: (err:any) => {
      setIsLoadingConfirm(false);
      // Notification({ type: 'error', message: 'Error', description: 'Account creation failed' });
      console.log('err',err)
      if (err && err.message.includes("Username")) {
        form.setFields([
          {
            name: "username",
            errors: [(err.message)],
          },
        ]);
      } else if (err.message.includes("Email")) {
        form.setFields([
          {
            name: "email",
            errors: [(err.message)],
          },
        ]);
      }
    },
  })

  const onFinish = (values: RegisterForm) => {
    setIsLoadingConfirm(true);
    const {confirmPassword, ...valueRegister} = values
    console.log(valueRegister)
    mutate(valueRegister);
  };

  return (
    <div className="private-layout flex items-center justify-center">
      <div className="bg-white bg-opacity-80  p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLanguageVN?'Đăng ký':'Register'}</h2>
        <Form
          name="normal_register"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: errorMessages.username.required },
              { max: 50, message: errorMessages.username.maxlength },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={isLanguageVN?'Tên tài khoản':"Username"}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: errorMessages.password.required },
              {
                pattern: regexConstant.password,
                message: errorMessages.password.pattern,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type='password'
              placeholder={isLanguageVN?'Mật khẩu':"Password"}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: errorMessages.confirmPassword.required},
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(errorMessages.confirmPassword.notMatch);
                },
              }),
            ]}
          >
            <Input
              prefix={
                <ExclamationCircleOutlined className="site-form-item-icon" />
              }
              type="password"
              placeholder={isLanguageVN?'Xác nhận mật khẩu':"Confirm Password"}
            />
          </Form.Item>
          <Form.Item
            name="email"
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
          <Form.Item
            name="phone"
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
              placeholder={isLanguageVN?'Số điện thoại':"Phone number"}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: errorMessages.address.required }]}
          >
            <Input
              prefix={<EnvironmentOutlined className="site-form-item-icon" />}
              placeholder={isLanguageVN?'Địa chỉ':"Address"}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              // loading={isloadingConfỉm}
            >
              {isLanguageVN?'Đăng ký':'Register'}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <p>
            {isLanguageVN?"Bạn đã có tài khoản? ":`Already have an account?`}
            <Link className="text-blue-700 hover:text-orange-800" href="/log-in">
              {isLanguageVN?'Đăng nhập ngay! ':'Log in now!'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
