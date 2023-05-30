import styled from "styled-components";
import { Colors } from "../../../assets/colors";

const ContainerButtons = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${Colors.gray3};
`;

const WrapperButtons = styled.div`
  display: flex;
  padding: 2vh 0;
  justify-content: space-between;
  /* gap: 6px; */
`;

const Buttons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 109px;
  height: 102px;
  padding: 9px;
  border: 1px solid ${Colors.gray1};
  border-radius: 8px;
  background-color: ${Colors.gray2};
  cursor: pointer;

  :hover {
    background-color: ${Colors.red_light};
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    p {
      font-size: 12px;
      color: ${Colors.gray1};
    }
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 3px solid ${Colors.gray1};
  border-radius: 20px;
`;

export { ContainerButtons, WrapperButtons, Buttons, Circle };
