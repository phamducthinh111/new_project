import React from 'react';
import { notification } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

type NotificationType = 'success' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  description: string;
}

const Notification: React.FC<NotificationProps> = ({ type, message, description }) => {
  const icon = {
    success: <CheckCircleOutlined className="text-green-500" />,
    warning: <ExclamationCircleOutlined className="text-yellow-500" />,
    error: <CloseCircleOutlined className="text-red-500" />,
  }[type];

  notification.open({
    message,
    description,
    icon,
    placement: 'bottomRight',
    className: `border-l-4 ${
      type === 'success' ? 'border-green-500' : type === 'warning' ? 'border-yellow-500' : 'border-red-500'
    }`,
    style: {
      backgroundColor: type === 'success' ? '#f6ffed' : type === 'warning' ? '#fffbe6' : '#fff1f0',
    },
  });

  return null; 
};

export default Notification;
