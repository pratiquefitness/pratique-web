import styled from "styled-components";
import { Colors } from "../../../assets/colors";

const ContainerButtons = styled.div`
  width: 100%;
  padding: 2vh;
  background-color: ${Colors.gray3};
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2vh 0;
  /* gap: 6px; */
`;

const Buttons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12vh;
  height: 12vh;
  border: 1px solid ${Colors.gray1};
  border-radius: 8px;
  background-color: ${(props) =>
    props.selected ? Colors.red_light : Colors.gray2};
  cursor: pointer;

  :hover {
    background-color: ${Colors.red_light};
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1vh;
    p {
      font-size: 1.5vh;
      color: ${Colors.gray1};
    }
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vh;
  height: 5vh;
  border: 3px solid ${Colors.gray1};
  border-radius: 2000000px;

  img {
    height: 3.5vh;
    width: 3.5vh;
  }
`;

export { ContainerButtons, WrapperButtons, Buttons, Circle };
