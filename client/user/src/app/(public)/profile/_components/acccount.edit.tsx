import { UserProfile } from "@/interface/user.interface";
import { useAppSelector } from "@/store/store";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import "../profile.css";
import { StyledButtonSave, StyledInput } from "./profile.style";

interface AccountEditProps {
  form: FormInstance<UserProfile>;
  onFieldsChange: () => void;
  onValuesChange: (changed: UserProfile) => void;
  isDisableSave: boolean;
  handleSaveEditAccount: () => void
}
const AccountEdit = (props: AccountEditProps) => {
  const { form, onFieldsChange, isDisableSave, onValuesChange, handleSaveEditAccount } = props;
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const isLanguageVN = activeLanguage === "vn";
  return (
    userProfile && (
      <Form
        form={form}
        onFieldsChange={onFieldsChange}
        onValuesChange={onValuesChange}
        name="profile"
        initialValues={{
          ...userProfile,
          birthday: userProfile.birthday ? dayjs(userProfile.birthday) : null,
        }}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name="username"
              label={
                <strong className="text-white text-base">
                  {isLanguageVN ? "Tên tài khoản" : "Username"}
                </strong>
              }
            >
              <StyledInput disabled readOnly size="large" placeholder="Username" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name="fullname"
              label={
                <strong className="text-white text-base">
                  {isLanguageVN ? "Họ và tên" : "Fullname"}
                </strong>
              }
            >
              <StyledInput
                size="large"
                placeholder={isLanguageVN ? "Họ và tên..." : "Fullname..."}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name="email"
              label={
                <strong className="text-white text-base">
                  {isLanguageVN ? "Email" : "Email"}
                </strong>
              }
            >
              <StyledInput disabled size="large" placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name="phone"
              label={
                <strong className="text-white text-base">
                  {isLanguageVN ? "Số điện thoại" : "Phone"}
                </strong>
              }
            >
              <StyledInput
                size="large"
                placeholder={isLanguageVN ? "Số điện thoại..." : "Phone..."}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name="sex"
              label={
                <strong className="text-white text-base">
                  {isLanguageVN ? "Giới tính" : "Sex"}
                </strong>
              }
            >
              <Radio.Group>
                <Radio className="text-white text-base pr-2" value="male">
                  {isLanguageVN ? "Nam" : "Male"}
                </Radio>
                <Radio className="text-white text-base pr-2" value="female">
                  {isLanguageVN ? "Nữ" : "Female"}
                </Radio>
                <Radio className="text-white text-base pr-2" value="other">
                  {isLanguageVN ? "Giới tính khác" : "Other"}
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name="birthday"
              label={
                <strong className="text-white text-base">
                  {isLanguageVN ? "Ngày sinh" : "Birthday"}
                </strong>
              }
            >
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="flex justify-center mt-10">
          <StyledButtonSave
            disabled={isDisableSave}
            onClick={handleSaveEditAccount}
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full text-base text-white"
          >
            Save
          </StyledButtonSave>
        </Form.Item>
      </Form>
    )
  );
};

export default AccountEdit;
