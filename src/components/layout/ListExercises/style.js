import styled from "styled-components";
import { Colors } from "../../assets/colors";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 2vh;
  width: 100%;
  display: flex;
  border-top: 1px solid ${Colors.gray4};
  justify-content: space-between;
  gap: 2vw;
  div {
    width: 100%;
  }
  p {
    font-size: 2.4vh;
    font-weight: 400;
  }
`;

const WrapperList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 2vw;
  /* padding: 2vh 0; */
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  gap: 1vw;
  span {
    display: flex;
    gap: 1vw;
    flex-direction: row;
    font-size: 1.6vh;
    flex: 1;
    color: white;
    width: 30%;
  }
`;

export const Thumbnail = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 10%;
`;

export { Container, WrapperList, List };
