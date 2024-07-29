import { Button } from "antd";
import styled from "styled-components";

export const StyledButtonAddView = styled(Button)`
  &&& {
    border: none; /* Bỏ border mặc định */
    &:hover {
        background-color: #9a3412; /* Màu chữ không thay đổi khi hover khi disabled */
        color: #B89D64
      }
  }
`;
