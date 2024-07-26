"use client";

import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { login, LoginForm } from "@/api/auth";
import { sessionToken } from "../../../../configs/AxiosClient";
import { fetchUserProfile } from "@/store/action/user.action";
import { useAppDispatch } from "@/store/store";
import { errorMessages } from "@/constants/error-messages.constants";
import { regexConstant } from "@/constants/regex.constant";

export default function Login() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: async (newData) => {
      setIsLoadingConfirm(false);
      await fetch("api/auth", {
        method: "POST",
        body: JSON.stringify(newData.token),
        headers: {
          "Content-Type": "application/json",
        },
      });
      sessionToken.value = newData.token.access_Token;
      setIsNavigating(true);
      // Lấy thông tin hồ sơ người dùng sau khi đăng nhập thành công
      dispatch(fetchUserProfile());
      router.push("/");
    },
    onError: (err: any) => {
      setIsLoadingConfirm(false);
      if (err && err.message.includes("Password")) {
        form.setFields([
          {
            name: "password",
            errors: [(err.message)],
          },
        ]);
      } else if (err.message.includes("Username")) {
        form.setFields([
          {
            name: "username",
            errors: [(err.message)],
          },
        ]);
      }
    },
  });

  const onFinish = (values: LoginForm) => {
    setIsLoadingConfirm(true);
    form.setFields([
      { name: "username", errors: [] },
      { name: "password", errors: [] },
    ]); // Reset lỗi trước khi submit
    mutate(values);
  };

  if (isNavigating) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <div className="private-layout flex items-center justify-center">
      <div className="bg-white bg-opacity-80 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
              placeholder="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoadingConfirm}
              className="login-form-button w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-700 hover:text-orange-800" href="/register">
              Register now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
