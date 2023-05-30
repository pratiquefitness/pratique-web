import styled from "styled-components";
import { Colors } from "../../../assets/colors";

const Container = styled.form`
  flex: 0.4;
  background-color: ${Colors.gray2};
`;

const WrapperMyDisposition = styled.div`
  padding: 3vh 2vh;
  width: 100%;
`;

const WrapperBoxMyDisposition = styled.form`
  display: flex;
  margin: 3vh 0;
  justify-content: space-around;
  overflow-x: scroll;
  white-space: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BoxMyDisposition = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 13vh;
  width: 13vh;
  padding: 1vh 2vh;
  border: 1px solid gray;
  border-radius: 8px;

  span {
    color: ${Colors.red_light};
  }

  p {
    color: ${Colors.white};
    font-size: 3vw;
  }
`;

const WrapperGreenBars = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 7vh;
  width: 7vh;
`;

export {
  Container,
  WrapperMyDisposition,
  WrapperBoxMyDisposition,
  BoxMyDisposition,
  WrapperGreenBars,
};
