import styled from "styled-components";
import { Colors } from "../../assets/colors";

const InputForm = styled.input`
  border-radius: 0;
  border: none;
  background-color: ${Colors.background};
`;

const PasswordInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2vh;
  padding-bottom: 0;
  input {
    margin-bottom: 0;
  }
  button {
    border: none;
    right: 5%;
    position: absolute;
    padding: 2%;
    background-color: transparent;
    svg {
      mix-blend-mode: difference;
      height: 2.7vh;
      width: 2.7vh;
    }
  }
`;

export { InputForm, PasswordInputContainer };
