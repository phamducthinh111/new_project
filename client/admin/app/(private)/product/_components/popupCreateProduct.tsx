import { errorProductMessages } from "@/constants/error-messages.constants";
import {
  DollarOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  NumberOutlined,
  ProfileOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Form, FormInstance, Input, Select } from "antd";
import { Type, typeOptions } from "./product.type";
import { CreateEmpForm } from "../../user/_components/user.type";

interface CreateUserFormProps {
  form: FormInstance<CreateEmpForm>;
  onFieldsChange: () => void;
}

const CreateProductForm = (props: CreateUserFormProps) => {
  const { form, onFieldsChange } = props;

  return (
    <Form
      layout="vertical"
      name="create_product_form"
      form={form}
      onFieldsChange={onFieldsChange}
    >
      <Form.Item
        name="name"
        label={<strong>Product Name :</strong>}
        rules={[
          { required: true, message: errorProductMessages.name.required },
        ]}
      >
        <Input prefix={<ProfileOutlined className="site-form-item-icon" />} />
      </Form.Item>
      <Form.Item
        name="type"
        label={<strong>Type :</strong>}
        rules={[
          { required: true, message: errorProductMessages.type.required },
        ]}
      >
        <Select placeholder="Select Type" allowClear options={typeOptions} />
      </Form.Item>
      <Form.Item
        name="price"
        label={<strong>Price :</strong>}
        rules={[
          { required: true, message: errorProductMessages.price.required },
        ]}
      >
        <Input
          type="number"
          name="price"
          prefix={<DollarOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name="quantity"
        label={<strong>Quantity</strong>}
        rules={[
          { required: true, message: errorProductMessages.quantity.required },
        ]}
      >
        <Input
          type="number"
          prefix={<NumberOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name="loc"
        label={<strong>Location</strong>}
        rules={[{ required: true, message: errorProductMessages.loc.required }]}
      >
        <Input
          prefix={<EnvironmentOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name="label"
        label={<strong>Label</strong>}
        rules={[
          { required: true, message: errorProductMessages.label.required },
        ]}
      >
        <Input prefix={<TagOutlined className="site-form-item-icon" />} />
      </Form.Item>
      <Form.Item
        name="desc"
        label={<strong>Description</strong>}
        rules={[
          { required: true, message: errorProductMessages.desc.required },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default CreateProductForm;
