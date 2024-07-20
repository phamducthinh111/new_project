import { Form, FormInstance, Input, Row } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { errorOrderMessages } from "@/constants/error-messages.constants";
import { DeleteForm } from "./order.type";

interface CreateUserFormProps {
  form: FormInstance<DeleteForm>;
  onFieldsChange: any;
}

const DeleteOrderForm = (props: CreateUserFormProps) => {
    const {form, onFieldsChange} = props
  return (
    <Form
    layout="vertical"
    form={form}
    onFieldsChange={onFieldsChange}
    >
        <Form.Item
          name="desc"
        //   label={<strong>Description</strong>}
          rules={[
            { required: true, message: errorOrderMessages.desc.required },
          ]}
        >
          <Input.TextArea
            placeholder="Why do you want to delete..."
          />
        </Form.Item>
    </Form>
  );
};

export default DeleteOrderForm;
