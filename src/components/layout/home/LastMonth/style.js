import styled from "styled-components";
import { Colors } from "../../../assets/colors";
import { Link } from "react-router-dom";

const Container = styled.div`
  /* flex:0.2; */
  background-color: ${Colors.gray3};
`;

const WrapperLastMonth = styled.div`
  padding: 16px;
`;

const WrapperLastMonthInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 16px;
`;

const LastMonthInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 20vw;
  gap: 1vh;

  p {
    color: ${Colors.white};
    font-size: 1.4vh;
    font-weight: 300;
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vh;
  height: 5vh;
  border: 3px solid ${Colors.red_light};
  border-radius: 20000000px;

  p {
    font-size: 2.7vh;
    font-weight: 500;
  }

  img {
    height: 4vh;
    width: 4vh;
  }
`;

export {
  Container,
  WrapperLastMonth,
  WrapperLastMonthInfo,
  LastMonthInfo,
  Circle,
};
