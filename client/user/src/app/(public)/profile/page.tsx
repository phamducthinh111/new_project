"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  Typography,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import dayjs from "dayjs";
import convertSexToVietnamese from "./_components/convertSex";
import AccountInfomation from "./_components/account.info";
import AccountEdit from "./_components/account.edit";
import { UserProfile } from "@/interface/user.interface";
import { useDispatch } from "react-redux";
import {
  fetchUserProfile,
  updateProfileAction,
} from "@/store/action/user.action";
import Notification from "@/components/notification/NotificationComponent";
import ChangePasswordForm from "./_components/changePassword";
import { changePassword } from "@/api/profile";

const { Option } = Select;
const { Title, Text } = Typography;
const Profile: React.FC = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const isLanguageVN = activeLanguage === "vn";
  const [isButtonAccount, setIsButtonAccount] = useState<boolean>(true);
  const [isEditAccoutn, setIsEditAccount] = useState<boolean>(false);
  const [isDisableSave, setIsDisableSave] = useState<boolean>(true);
  const [changedValues, setChangedValues] = useState<Partial<UserProfile>>({});
  const [isDisableSaveChangePassword, setIsDisableSaveChangePassword] =
  useState<boolean>(true);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   // Nếu không có userProfile, có thể bạn muốn fetch lại hoặc kiểm tra
  //   if (!userProfile) {
  //     dispatch(fetchUserProfile());
  //   }
  // }, [userProfile, dispatch]);

  const onFieldsChangeEditAccount = () => {
    const fieldErrors = profileForm.getFieldsError();
    const hasFieldErrors = fieldErrors.some(
      ({ errors }) => errors && errors.length > 0
    );
    const formValues = profileForm.getFieldsValue();
    const { username, email, ...rest } = formValues;
    const isAnyFieldEmpty = !rest;
    setIsDisableSave(isAnyFieldEmpty || hasFieldErrors);
  };

  const onValuesChangeEditAccount = (changed: UserProfile) => {
    setChangedValues((prev) => ({
      ...prev,
      ...changed,
    }));
  };

  const handleSaveEditAccount = async () => {
    try {
      const action = await dispatch(updateProfileAction(changedValues));
      if (updateProfileAction.fulfilled.match(action)) {
        Notification({
          type: "success",
          message: "Success",
          description: isLanguageVN
            ? " Cập nhật thông tin tài khoản thành công"
            : "Update account successfully",
        });
        setIsEditAccount(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonChangePasswordClick = () => {
    setIsButtonAccount(true);
    setIsEditAccount(false);
    passwordForm.resetFields();
    profileForm.resetFields();
  };
  const handleButtonAndressClick = () => {
    setIsButtonAccount(false);
  };

  const onFieldsChangePassword = () => {
    const fieldErrors = passwordForm.getFieldsError();
    const hasFieldErrors = fieldErrors.some(
      ({ errors }) => errors && errors.length > 0
    );
    const { oldPassword, newPassword, confirmPassword } =
    passwordForm.getFieldsValue();
    const isAnyFieldEmpty = !oldPassword || !newPassword || !confirmPassword;
    setIsDisableSaveChangePassword(isAnyFieldEmpty || hasFieldErrors);
  };

  const handleSaveChangePassword = async () => {
    const { oldPassword, newPassword } = passwordForm.getFieldsValue();
    const body = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const response = await changePassword(body);
      if (response) {
        Notification({
          type: "success",
          message: "Success",
          description: isLanguageVN
            ? " Đổi mật khẩu thành công"
            : "Change Password successfully",
        });
        setIsButtonAccount(true);
      }
    } catch (error: any) {
      console.error(error);
      passwordForm.setFields([
        {
          name: "oldPassword",
          errors: [error.message],
        },
      ]);
    }
  };

  // Chuyển đổi giới tính nếu là tiếng Việt
  const displaySex = userProfile?.sex ? (
    isLanguageVN ? (
      convertSexToVietnamese(userProfile.sex)
    ) : (
      userProfile.sex
    )
  ) : (
    <span className="italic text-gray-400">
      {isLanguageVN ? "Chưa có thông tin" : "No information"}
    </span>
  );

  return (
    <div className="container mx-auto lg:w-3/4 my-10 bg-stone-700 bg-opacity-70 backdrop-blur-lg rounded-lg h-100">
      <Row className="">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={5}
          className="bg-stone-700 bg-opacity-70 p-5 rounded-lg"
        >
          <div>
            <div className="mb-5">
              <Button
                type="link"
                className={`text-xl ${
                  isButtonAccount ? "text-orange-800" : "text-white"
                }`}
                onClick={() => handleButtonChangePasswordClick()}
              >
                {isLanguageVN ? "Quản lý tài khoản" : "Account Management"}
              </Button>
            </div>
            <div>
              <Button
                type="link"
                className={`text-xl ${
                  isButtonAccount ? "text-white" : "text-orange-800"
                }`}
                onClick={() => handleButtonAndressClick()}
              >
                {isLanguageVN ? "Đổi mật khẩu" : "Change password"}
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={19} className=" p-5 pb-10">
          {isButtonAccount ? (
            isEditAccoutn ? (
              <AccountEdit
                form={profileForm}
                onFieldsChange={onFieldsChangeEditAccount}
                onValuesChange={onValuesChangeEditAccount}
                handleSaveEditAccount={handleSaveEditAccount}
                isDisableSave={isDisableSave}
              />
            ) : (
              <AccountInfomation
                setIsEditAccount={() => setIsEditAccount(true)}
                setIsDisableSave={() => setIsDisableSave(true)}
              />
            )
          ) : (
            <ChangePasswordForm
            isDisableSaveChangePassword= {isDisableSaveChangePassword}
            form={passwordForm}
            onFieldsChange={onFieldsChangePassword}
            handleSaveChangePassword={handleSaveChangePassword} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
