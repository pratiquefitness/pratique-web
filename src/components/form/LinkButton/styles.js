import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "../../assets/colors";

const WrapperButton = styled.div`
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2vh 0;
  background-color: ${(props) =>
    props.disabled ? Colors.gray1 : props.bgColor};
  color: ${(props) => (props.disabled ? Colors.white : props.textColor)};
  font-weight: bold;
  font-size: 2vh;
  text-decoration: none;
  transition: 0.5s;
  cursor: pointer;
  border: ${(props) =>
    props.borderColor !== props.bgColor ? "solid" : "none"};
  border-radius: 8px;

  :hover {
    background-color: ${Colors.gray1};
  }
`;

export { WrapperButton, Button };
