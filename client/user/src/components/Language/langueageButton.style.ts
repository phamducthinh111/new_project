import { Button } from "antd";
import styled from "styled-components";

export const StyledButtonLanguage = styled(Button)`
  &&& {
    border: none; /* Bỏ border mặc định */
    // transition: background-color 0.3s ease; /* Hiệu ứng chuyển màu nền khi hover */

    &:hover {
        color: #9a3412; /* Màu chữ không thay đổi khi hover khi disabled */
      }

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