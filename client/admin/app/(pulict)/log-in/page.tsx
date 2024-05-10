"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import axios from "axios";
import Link from "next/link";
// import 'antd/dist/antd.css'; // Import CSS của Ant Design
import { useState } from "react";
import { useMutation } from "react-query";
import { LoginForm, login } from "./_components/login.fetcher";
import { useRouter } from "next/navigation";
import { useAppContetxt } from "@/app/AppProvider";

const Login = () => {
  const router = useRouter();
  const {setSessionToken} = useAppContetxt();
  const [isloadingConfỉm, setIsloadingConfỉm] = useState(false);
  const { mutate, isLoading, isError, error, data } = useMutation(login, {
    onSuccess: async (newData) => {
      setIsloadingConfỉm(false);
      const response = await fetch("api/auth", {
        method: "POST",
        body: JSON.stringify(newData.token),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSessionToken(newData.token.access_Token)

      router.push('/dashboard')
    },
    onError: () => {
      setIsloadingConfỉm(false);
    },
  });
  const onFinish = (values: LoginForm) => {
    setIsloadingConfỉm(true);
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isloadingConfỉm}
            >
              Log in
            </Button>
          </Form.Item>
          <div className="text-center ">
            <p>
              Don't have an account?{" "}
              <Link className="text-blue-700" href="/register">
                Register now!
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
