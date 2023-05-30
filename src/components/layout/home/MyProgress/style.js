import styled from "styled-components";
import { Colors } from "../../../assets/colors";
import { Link } from "react-router-dom";

const Container = styled.form`
  /* flex: 0.4; */
  /* height: 40vh; */
  background-color: ${Colors.gray3};
`;
const WrapperMyProgress = styled.form`
  flex-direction: column;
  padding: 4%;
  height: 35vh;
  display: flex;
  justify-content: space-evenly;
`;

export { Container, WrapperMyProgress };
