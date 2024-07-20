import React, { ReactNode } from 'react';
import { Modal } from 'antd';

interface CustomModalProps {
  title: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
  okButtonProps?: any;
  cancelButtonProps?:any
  children?: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  visible,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  okButtonProps = {}, // Mặc định là một đối tượng trống
  cancelButtonProps = {}, // Mặc định là một đối tượng trống
  children,
}) => {
  return (
    <Modal
      title={<h1 className="text-2xl text-center">{title}</h1>}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps} // Truyền okButtonProps vào Modal
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
