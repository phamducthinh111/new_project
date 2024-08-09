import { Button } from "antd";
import styled from "styled-components";

export const StyledButtonDelOrderItem = styled(Button)`
  &&& {
      color: #ffffff;
      &:hover {
        color: #9a3412; 
      }
    }
  }
`;

export const StyledButtonDelOrder = styled(Button)`
  &&& {
      background-color: #A52F21;
      color: #ffffff;
      padding: 12px 24px; 
    height: 60px; 
      &:hover {
      color: #ffffff;
        background-color: #8E2612; 
        border:none
      }
    }
  }
`;
