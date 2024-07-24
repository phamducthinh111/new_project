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
import React from "react";
import Link from "next/link";

export default function Register() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="private-layout flex items-center justify-center">
      <div className="bg-white bg-opacity-80  p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Form
          name="normal_register"
          className="register-form"
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
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={
                <ExclamationCircleOutlined className="site-form-item-icon" />
              }
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone number!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone number"
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input
              prefix={<EnvironmentOutlined className="site-form-item-icon" />}
              placeholder="Address"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              // loading={isloadingConfỉm}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link className="text-blue-700" href="/log-in">
              Log in now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
