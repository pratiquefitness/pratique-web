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
  /* border: 1px solid black; */
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

  p {
    color: ${Colors.white};
    /* font-size: 14px; */
  }
`;

const WrapperContent = styled.div`
  overflow: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3vh;

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const WrapperResults = styled.div`
  width: 100%;
  /* background-color: blue; */
  padding: 2vh 2vw 0 2vw;
  div {
    margin: 8px 0 4px 0;
  }
`;

const WrapperWorkoutIndications = styled.div`
  width: 100%;
  background-color: ${Colors.gray2};
  padding: 2vh 2vw;
  div {
    margin: 8px 0 4px 0;
  }
`;

const WrapperHeatlhIndications = styled.div`
  width: 100%;
  padding: 2vh 2vw;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 2vh;
    gap: 3vh;
    /* height: 15vh; */
  }
`;

const WrapperButton = styled.div`
  width: 100%;
  padding: 0 16px 0 16px;
`;

const WrapperChangeButton = styled.div`
  height: 10%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ChangeButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  gap: 15.54px;

  p {
    color: ${Colors.red_light};
    font-size: 16px;
  }
`;

export {
  Container,
  WrapperControlPanel,
  ControlPanel,
  WrapperContent,
  WrapperResults,
  WrapperWorkoutIndications,
  WrapperHeatlhIndications,
  WrapperChangeButton,
  ChangeButton,
  WrapperButton,
};
