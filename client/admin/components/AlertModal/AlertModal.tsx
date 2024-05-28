import React from "react";
import { Modal, Button, Typography } from "antd";
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface ModalAlertProps {
  title: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  content: any;
  type?: "delete" | "warning" | "info" | "success";
}

const ModalAlert: React.FC<ModalAlertProps> = ({
  title,
  visible,
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  okButtonProps = {},
  cancelButtonProps = {},
  content,
  type = "info",
}) => {
  const renderIcon = () => {
    switch (type) {
      case "delete":
        return (
          <DeleteOutlined
            style={{
              color: "red",
              fontSize: "24px",
              borderRadius: "50%",
              background: "#fde7e7",
              padding: "15px",
            }}
          />
        );
      case "warning":
        return (
          <ExclamationCircleOutlined
            style={{
              color: "orange",
              fontSize: "24px",
              borderRadius: "50%",
              background: "#fef2e8",
              padding: "15px",
            }}
          />
        );
      case "info":
        return (
          <InfoCircleOutlined
            style={{
              color: "blue",
              fontSize: "24px",
              borderRadius: "50%",
              background: "#e6f7ff",
              padding: "15px",
            }}
          />
        );
      case "success":
        return (
          <CheckCircleOutlined
            style={{
              color: "green",
              fontSize: "24px",
              borderRadius: "50%",
              background: "#f6ffed",
              padding: "15px",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={null}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <div className="text-center">
        <div className="flex justify-center mb-4">{renderIcon()}</div>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <Text className="block mb-4 text-lg">{content}</Text>
        <div className="flex justify-center gap-4">
          <Button
            size="large"
            shape="round"
            onClick={onCancel}
            {...cancelButtonProps}
            className="bg-gray-200 hover:bg-gray-300"
          >
            {cancelText}
          </Button>
          <Button
            size="large"
            shape="round"
            type="primary"
            onClick={onOk}
            {...okButtonProps}
          >
            {okText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAlert;
