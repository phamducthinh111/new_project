"use client";

import { useAppContetxt } from "@/app/AppProvider";
import { errorMessages } from "@/constants/error-messages.constants";
import { regexConstant } from "@/constants/regex.constant";
import moment from "moment";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { UserProfile } from "./_components/profile.type";
import { updateProfile } from "@/api/user";
import { useRouter } from "next/navigation";

const dateFormat = "DD/MM/YYYY";

const Profile = () => {
  const router = useRouter();
  const { userProfile, setUserProfile } = useAppContetxt();
  const [form] = Form.useForm();
  const [isDisableSave, setIsDisableSave] = useState(true);
  const [changedValues, setChangedValues] = useState<Partial<UserProfile>>({});

  const onValuesChange = (changed: UserProfile) => {
    setChangedValues((prev) => ({
      ...prev,
      ...changed,
    }));
  };

  const onFieldsChange = () => {
    const fieldErrors = form.getFieldsError();
    const hasFieldErrors = fieldErrors.some(
      ({ errors }) => errors && errors.length > 0
    );
    const formValues  = form.getFieldsValue();
    const { username, email, ...rest } = formValues;
    const isAnyFieldEmpty = !rest
    setIsDisableSave(isAnyFieldEmpty || hasFieldErrors)
  }

  const handleSave = async () => {
    try {
      const response = await updateProfile(changedValues);
      if (response) {
        setUserProfile(response);
        message.success(`Update profile successfully`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl text-center font-semibold mb-5">Profile</h1>
      {/* <p className="mb-4 text-gray-500">Quản lý thông tin hồ sơ để bảo mật tài khoản</p> */}
      {userProfile && (
        <Form
          onFieldsChange={onFieldsChange}
          form={form}
          layout="vertical"
          onValuesChange={onValuesChange}
          initialValues={{
            ...userProfile,
            birthday: userProfile?.birthday
              ? dayjs(userProfile.birthday)
              : undefined,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="username"
                label={<strong>Username</strong>}
                rules={[
                  // { required: true, message: errorMessages.username.required },
                  { max: 64, message: errorMessages.username.maxlength },
                  {
                    pattern: regexConstant.username,
                    message: errorMessages.username.pattern,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="fullname"
                label={<strong>Full Name</strong>}
                // rules={[
                //   { required: true, message: errorMessages.username.required },
                //   { max: 64, message: errorMessages.username.maxlength },
                //   {
                //     pattern: regexConstant.username,
                //     message: errorMessages.username.pattern,
                //   },
                // ]}
              >
                <Input
                  placeholder="Your name"
                  // disabled
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="email"
                label={<strong>Email</strong>}
                rules={[
                  // { required: true, message: errorMessages.email.require },
                  {
                    pattern: regexConstant.validEmail,
                    message: errorMessages.email.pattern,
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={18}>
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
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Phone"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Form.Item name="role" label={<strong>Role</strong>}>
                <div className="flex items-center">
                  <UserOutlined className="mr-2" />
                  <span>{userProfile?.role}</span>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="sex" label={<strong>Sex</strong>}>
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="birthday"
                label={<strong>Birthday</strong>}
                // initialValue={userProfile?.birthday ? dayjs(userProfile.birthday) : undefined}
              >
                <DatePicker className="w-full" format={dateFormat} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                initialValue={userProfile?.password}
                name="password"
                label={<strong>Password</strong>}
              >
                <div className="flex items-center">
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    defaultValue="******"
                    readOnly
                  />
                  <Button type="link" className="ml-auto">
                    Change
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                initialValue={userProfile?.address}
                name="address"
                label={<strong>Address</strong>}
              >
                <Input.TextArea
                  // prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="address"
                  autoSize={{ minRows: 4 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Form.Item>
              <Button
                onClick={handleSave}
                size={"large"}
                type="primary"
                htmlType="submit"
                disabled={isDisableSave}
              >
                Save
              </Button>
            </Form.Item>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default Profile;
