import { errorMessages } from "@/constants/error-messages.constants";
import { regexConstant } from "@/constants/regex.constant";
import { useAppSelector } from "@/store/store";
import { Form, FormInstance, Row, Typography } from "antd";
import { StyledButtonSave, StyledInput } from "./profile.style";
import { LockOutlined } from "@ant-design/icons";
import { PasswordForm } from "@/interface/user.interface";

interface CreateUserFormProps {
  isDisableSaveChangePassword: boolean;
  form: FormInstance<PasswordForm>;
  onFieldsChange: () => void;
  handleSaveChangePassword: () => void;
}

const ChangePasswordForm = (props: CreateUserFormProps) => {
  const {isDisableSaveChangePassword, form, onFieldsChange, handleSaveChangePassword } = props;
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const isLanguageVN = activeLanguage === "vn";
  const { Text } = Typography;
  return (
    <div className="lg:px-10">
      <Row className="mb-5 flex items-center">
        <Text className="text-xl text-slate-50 ">
          {isLanguageVN ? "ĐỔI MẬT KHẨU" : "CHANGE PASSWORD"}
        </Text>
      </Row>
        <Form layout="vertical" form={form} onFieldsChange={onFieldsChange}>
          <Form.Item
            name="oldPassword"
            label={
                <strong className="text-[#E8CA72] text-base">
                  {isLanguageVN ? "Mật khẩu hiện tại: " : "Current password"}
                </strong>
              }
            rules={[
              { required: true, message: errorMessages.password.required },
              {
                pattern: regexConstant.password,
                message: errorMessages.password.pattern,
              },
            ]}
          >
            <StyledInput.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              size="large"
              placeholder= {isLanguageVN ? "Mật khẩu hiện tại... " : "Current password..."}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={
                <strong className="text-[#E8CA72] text-base">
                  {isLanguageVN ? "Mật khẩu mới: " : "New password"}
                </strong>
              }
            rules={[
              { required: true, message: errorMessages.password.required },
              {
                pattern: regexConstant.password,
                message: errorMessages.password.pattern,
              },
            ]}
          >
            <StyledInput.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              size="large"
              placeholder={isLanguageVN ? "Mật khẩu mới... " : "New password..."}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={
                <strong className="text-[#E8CA72] text-base">
                  {isLanguageVN ? "Xác nhận mật khẩu: " : "Confirm password"}
                </strong>
              }
            rules={[
              {
                required: true,
                message: errorMessages.confirmPassword.required,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(errorMessages.confirmPassword.notMatch);
                },
              }),
            ]}
          >
            <StyledInput.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              size="large"
              placeholder={isLanguageVN ? "Nhập lại mật khẩu... " : "Confirm password..."}
            />
          </Form.Item>
          <Form.Item className="flex justify-center mt-10">
            <StyledButtonSave
              disabled={isDisableSaveChangePassword}
              onClick={handleSaveChangePassword}
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full text-base text-[#E8CA72]"
            >
              {isLanguageVN?'Lưu':'Save'}
            </StyledButtonSave>
          </Form.Item>
        </Form>
    </div>
  );
};

export default ChangePasswordForm;
