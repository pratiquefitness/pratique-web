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
  align-items: center;

  p {
    color: ${Colors.white};
    font-size: 14px;
  }
`;

const WrapperExercisesInfo = styled.div`
  width: 100%;
  padding: 16px;
  flex: 1;

  img {
    width: 100%;
    padding: 16px 0 16px 0;
  }
`;

const WrapperExercises = styled.div`
  width: 100%;
  flex: 1;
  padding: 16px;
`;

const WrapperExercisesInput = styled.div``;

const ExercisesInput = styled.div`
  position: relative;

  p {
    position: absolute;
    margin: 4px 12px;
    padding: 0 4px;
    font-size: 12px;
    background-color: ${Colors.gray2};
  }
`;

const WrapperButton = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.background};
`;

const Button = styled.div`
  display: flex;
  gap: 15.5px;
`;

export {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperExercisesInfo,
  WrapperExercises,
  WrapperExercisesInput,
  ExercisesInput,
  WrapperButton,
  Button,
};
