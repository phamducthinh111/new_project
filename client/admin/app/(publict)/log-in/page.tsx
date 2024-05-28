"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { LoginForm, login } from "@/api/auth";
import { sessionToken } from "@/configs/AxiosClient";
import { errorMessages } from "@/constants/error-messages.constants";
import { regexConstant } from "@/constants/regex.constant";

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  // const [isDisableConfirm, setIsDisableConfirm] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
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
      message.success('Login successfully');
      router.push("/dashboard");
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

  // const onFieldsChange = () => {
  //   const fieldErrors = form.getFieldsError();
  //   const hasFieldErrors = fieldErrors.some(
  //     ({ errors }) => errors && errors.length > 0
  //   );
  //   const { password, username } = form.getFieldsValue();
  //   const isAnyFieldEmpty = !password || !username;
  //   console.log(isAnyFieldEmpty)
  //   setIsDisableConfirm(isAnyFieldEmpty || hasFieldErrors)
  // }

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFieldsChange={onFieldsChange}
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
              placeholder="Username"
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
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoadingConfirm}
              // disabled={isDisableConfirm}
            >
              Log in
            </Button>
          </Form.Item>
          <div className="text-center">
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
