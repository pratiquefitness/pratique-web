import styled from "styled-components";
import { Colors } from "../../assets/colors";

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

const WrapperButton = styled.div`
  width: 100%;
  padding: 0 16px 0 16px;
  background-color: ${Colors.background};
`;

export { Container, WrapperControlPanel, ControlPanel, WrapperButton };
