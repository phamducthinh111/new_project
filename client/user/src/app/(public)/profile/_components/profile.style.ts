import { Button, Input } from "antd";
import styled from "styled-components";

export const StyledInput = styled(Input)`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   outline: none;

  &:disabled {
    background-color: #686a6d;
    border-color: #686a6d;
    color: #ffffff;
    cursor: not-allowed;
  }
`;

export const StyledButtonSave = styled(Button)`
  &&& {
    color: #ffffff; /* Màu chữ */
    border: none; /* Bỏ border mặc định */
    transition: background-color 0.3s ease; /* Hiệu ứng chuyển màu nền khi hover */

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
