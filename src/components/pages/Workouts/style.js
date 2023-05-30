import styled from "styled-components";
import { Colors } from "../../assets/colors";
import { Link } from "react-router-dom";

const Container = styled.form`
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
  align-items: center;
`;

const WrapperMyWorkouts = styled.div`
  width: 100%;
  padding: 16px 0 16px 16px;
  background-color: ${Colors.gray3};

  div {
    div {
      padding: 16px 0 0;
    }
  }
`;

export { Container, WrapperControlPanel, ControlPanel, WrapperMyWorkouts };
