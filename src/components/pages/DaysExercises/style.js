import styled from "styled-components";
import { Colors } from "../../assets/colors";

const ContainerLogin = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WrapperControlPanel = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
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
  align-items: center;

  p {
    color: ${Colors.white};
    font-size: 14px;
  }
`;

const WrapperContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const WrapperOverview = styled.div`
  width: 100%;
  padding: 16px;
`;

const WrapperExercises = styled.div`
  width: 100%;
  height: 100px;
  padding: 16px;
`;

const WrapperButton = styled.div`
  width: 100%;
  padding: 16px 16px 0;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.background};
  margin-top: auto;
`;

const Button = styled.div`
  display: flex;
  gap: 15.5px;
`;

export {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperContent,
  WrapperOverview,
  WrapperExercises,
  WrapperButton,
  Button,
};
