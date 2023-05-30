import styled from "styled-components";
import { Colors } from "../../assets/colors";

const ContainerLogin = styled.form`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WrapperControlPanel = styled.div`
  margin: 32px 0;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: ${Colors.gray2};
`;

const ControlPanel = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    color: ${Colors.white};
    font-size: 14px;
  }
`;

const WrapperContent = styled.div`
  overflow: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export { ContainerLogin, WrapperControlPanel, ControlPanel, WrapperContent };
