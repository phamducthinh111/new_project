import { Form, FormInstance, Input, Row } from "antd";
import { PasswordForm } from "./profile.type";
import { LockOutlined } from "@ant-design/icons";
import { errorMessages } from "@/constants/error-messages.constants";
import { regexConstant } from "@/constants/regex.constant";

interface CreateUserFormProps {
  form: FormInstance<PasswordForm>;
  onFieldsChange: any;
}

const ChangePasswordForm = (props: CreateUserFormProps) => {
    const {form, onFieldsChange} = props
  return (
    <Form
    layout="vertical"
    form={form}
    onFieldsChange={onFieldsChange}
    >
        <Form.Item
          name="oldPassword"
          label={<strong>Current Password</strong>}
          rules={[
            { required: true, message: errorMessages.password.required },
            {
              pattern: regexConstant.password,
              message: errorMessages.password.pattern,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Current Password"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={<strong>New Password</strong>}
          rules={[
            { required: true, message: errorMessages.password.required },
            {
              pattern: regexConstant.password,
              message: errorMessages.password.pattern,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={<strong>Confirm Password</strong>}
          rules={[
            { required: true, message: errorMessages.confirmPassword.required},
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(errorMessages.confirmPassword.notMatch);
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
