import styled from "styled-components";
import { Colors } from "../../../assets/colors";

const ContainerButtons = styled.div`
  width: 100%;
  padding: 2vh;
  background-color: ${Colors.gray2};
`;

const WrapperButtons = styled.div`
  display: flex;
  padding: 2vh 0;
  justify-content: space-between;
  gap: 2vw;
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
    gap: 1.3vh;

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
  width: 6vh;
  height: 6vh;
  border: 3px solid ${Colors.gray1};
  border-radius: 20000000px;
  img {
    height: 90%;
    width: 90%;
  }
`;

export { ContainerButtons, WrapperButtons, Buttons, Circle };
