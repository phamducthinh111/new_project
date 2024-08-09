import { Button, Rate } from "antd";
import styled from "styled-components";

export const StyledButtonDirectional = styled(Button)`
  &&& {

    &:disabled {
      background-color: #686a6d; /* Màu nền khi disabled */
      border-color: #686a6d; /* Màu border khi disabled */
      color: #ffffff; /* Màu chữ khi disabled */
      cursor: not-allowed; /* Con trỏ khi disabled */

      &:hover {
        background-color: #686a6d; /* Màu nền không thay đổi khi hover khi disabled */
        color: #ffffff; /* Màu chữ không thay đổi khi hover khi disabled */
      }
    }
  }
`;

export const StyledButtonCoutn = styled(Button)`
  &&& {

    &:disabled {
      background-color: #686a6d; /* Màu nền khi disabled */
      border-color: #686a6d; /* Màu border khi disabled */
      color: #ffffff; /* Màu chữ khi disabled */
      cursor: not-allowed; /* Con trỏ khi disabled */

      &:hover {
        background-color: #686a6d; /* Màu nền không thay đổi khi hover khi disabled */
        color: #ffffff; /* Màu chữ không thay đổi khi hover khi disabled */
      }
    }
  }
`;

export const StyledRate = styled(Rate)`
  font-size: 16px; // Đặt kích thước nhỏ hơn cho các sao

  .ant-rate-star-zero .ant-rate-star-second {
    color: #686a6d; // Màu xám cho các sao không được chọn
  }

  .ant-rate-star-half .ant-rate-star-first {
    color: #ffd700; // Màu vàng cho phần đầu của sao
  }

  .ant-rate-star-half .ant-rate-star-second {
    color: #686a6d; // Màu xám cho phần sau của sao
  }
`;