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

const WrapperOverview = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${Colors.gray3};
`;

const WrapperHeader = styled.div`
  margin: 8px 0 0;
  display: flex;
  flex-direction: row;
  gap: 33px;

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const WrapperEvaluateInstructor = styled.div`
  width: 100%;
  flex: 1;
  padding: 16px;
  background-color: ${Colors.gray2};
`;

const WrapperButton = styled.div`
  width: 100%;
  padding: 0 16px 0;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.gray3};
`;

export {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperOverview,
  WrapperHeader,
  WrapperEvaluateInstructor,
  WrapperButton,
};
