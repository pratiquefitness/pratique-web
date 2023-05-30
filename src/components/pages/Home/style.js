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
  width: 100%;
  height: 100%;
  background-color: ${Colors.gray3};

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (max-height: 851px) {
    height: 100%;
  }
`;

const ControlPanel = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WrapperContent = styled.div`
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  overflow: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export { ContainerLogin, WrapperControlPanel, ControlPanel, WrapperContent };
