import styled from "styled-components";
import { Colors } from "../../../assets/colors";
import { Link } from "react-router-dom";

const WrapperMyProgressInfo = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 2vh 0;

  p:first-of-type {
    font-size: 12px;
    font-weight: 500;
    color: ${Colors.white};
  }
`;

const LeftColumnMyProgressInfo = styled.div`
  width: 45%;
`;

const RightColumnMyProgressInfo = styled.div`
  width: 45%;
  p {
  }
`;

export {
  WrapperMyProgressInfo,
  LeftColumnMyProgressInfo,
  RightColumnMyProgressInfo,
};
