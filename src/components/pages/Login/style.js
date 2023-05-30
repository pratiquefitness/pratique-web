import styled from "styled-components";
import { Colors } from "../../assets/colors";
import { Link } from "react-router-dom";

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

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (max-height: 851px) {
    height: 100%;
  }
`;

const InputIcon = styled.div`
  width: 100%;
  position: relative;
`;

const LinkForgotPassword = styled(Link)`
  width: 100%;
  text-align: end;
  text-decoration: none;

  p:first-of-type {
    color: ${Colors.white};
    font-size: 14px;
    font-weight: 400;

    :hover {
      color: ${Colors.red_light};
    }
  }
`;

const Image = styled.div`
  align-self: center;
`;

const ControlPanel = styled.div`
  height: 100%;
  margin: 0 24px 24px;
  padding: 40px 0 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .img {
    position: absolute;
    display: flex;
    margin: 18px;
    right: 0;
  }

  input {
    width: 100%;
    height: 53px;
    border: 1px solid ${Colors.gray4};
    border-width: 0.5px;
    border-radius: 8px;
    margin-bottom: 2vh;
    font-size: 14px;
    padding: 20px;
    color: ${Colors.gray1};
  }

  input::placeholder {
    font-size: 14px;
    color: ${Colors.gray1};
  }

  .textEnd {
    color: ${Colors.white};
    font-size: 16px;
    font-weight: 300;
    text-align: center;
  }
`;

export {
  ContainerLogin,
  WrapperControlPanel,
  InputIcon,
  LinkForgotPassword,
  Image,
  ControlPanel,
};
