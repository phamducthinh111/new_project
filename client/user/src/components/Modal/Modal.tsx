import React, { ReactNode } from 'react';
import { Button, Modal } from 'antd';

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
  okClassName?: string; 
  cancelClassName?: string;
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
  okClassName = '', // Mặc định là một chuỗi trống
  cancelClassName = '', // Mặc định là một chuỗi trống
  
  children,
}) => {
  return (
    <Modal
      title={<h1 className="text-2xl text-center">{title}</h1>}
      open={visible}
      footer={
        <div className="flex justify-center gap-4 mt-5">
          <Button className={cancelClassName} {...cancelButtonProps} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className={okClassName} type="primary" {...okButtonProps} onClick={onOk}>
            {okText}
          </Button>
        </div>
      }
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
