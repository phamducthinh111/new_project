import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import { OrderDentail, StatusOptions } from "./order.type";
import { useEffect, useState } from "react";
import { getOrderDentail } from "@/api/order";

interface ChangeStatusFormProps {
  form: FormInstance<OrderDentail>;
  onFieldsChange: () => void;
  currentOrderId?: number;
}

const FormChangeStatus = (props: ChangeStatusFormProps) => {
  const { form, onFieldsChange, currentOrderId } = props;
  const [orderDentail, setOrderDentail] = useState<OrderDentail>();
  useEffect(() => {
    const fetchData = async () => {
      if (currentOrderId) {
        const response = await getOrderDentail(currentOrderId);
        if (response) {
          setOrderDentail(response);
          form.setFieldsValue(response);
        }
      }
    };
    fetchData();
  }, [currentOrderId, form]);
  return (
    <>
      {orderDentail && (
        <div className="mt-8">
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={8}>
              <strong className="text-base">OrderCode:</strong>{" "}
            </Col>
            <Col span={16}>
              <span className="text-base">{orderDentail.orderId}</span>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={8}>
              <strong className="text-base">Customer Name:</strong>{" "}
            </Col>
            <Col span={16}>
              <span className="text-base">
                {orderDentail.user.fullname
                  ? orderDentail.user?.fullname
                  : orderDentail.user?.username}
              </span>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={8}>
              <strong className="text-base">Phone Number:</strong>{" "}
            </Col>
            <Col span={16}>
              <span className="text-base">{orderDentail.user.phone}</span>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={8}>
              <strong className="text-base">Address:</strong>{" "}
            </Col>
            <Col span={16}>
              <span className="text-base">{orderDentail.user.address}</span>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={8}>
              <strong className="text-base">Total Price:</strong>{" "}
            </Col>
            <Col span={16}>
              <span className="text-base">{orderDentail.totalPrice},000 VNĐ</span>
            </Col>
          </Row>
          <Form
            form={form}
            layout="vertical"
            onFieldsChange={onFieldsChange}
            initialValues={orderDentail}
            name="change_status_form"
          >
            <Form.Item
              // label={<strong className="text-base">Status: </strong>}
              name="status"
              rules={[
                { required: true, message: "Please select the order status!" },
              ]}
            >
                  <Select
                    // className="ml-20"
                    allowClear
                    // style={{ width: "80%" }}
                    options={StatusOptions}
                  />
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default FormChangeStatus;
