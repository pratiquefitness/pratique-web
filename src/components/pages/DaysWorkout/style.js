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
  border: 1px solid black;
  background-color: ${Colors.gray2};

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
  justify-content: space-between;
  height: 100%;
`;

const WrapperOverview = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${Colors.gray3};
`;

const WrapperListExercises = styled.div`
  width: 100%;
  flex: 1;
  background-color: ${Colors.gray2};
`;

const WrapperButton = styled.div`
  width: 100%;
  padding: 0 16px 0;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.background};
`;

export {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperContent,
  WrapperOverview,
  WrapperListExercises,
  WrapperButton,
};
