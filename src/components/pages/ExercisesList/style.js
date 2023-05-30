import { Link } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../assets/colors";

const ContainerLogin = styled.form`
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
  border: 1px solid black;
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
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.background};
`;

const Button = styled.div`
  display: flex;
  gap: 15.5px;
`;

const ListHeader = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  padding: 5%;
  background-color: ${Colors.gray3};
  p {
    font-size: 2.5vh;
  }
`;

const ListHeaderRow = styled.div`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  margin-top: 3%;
`;
const ListHeaderCol = styled.div`
  flex-direction: column;
  flex: 1;
  display: flex;
  justify-content: center;
  /* background-color: yellow; */
  align-items: flex-end;
`;

const Icon = styled(Link)``;

const SelectAllButton = styled(Link)`
  width: 100%;
  /* height: 53px; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5% 0 5% 0;
  background-color: ${Colors.gray2};
  color: ${Colors.white};
  /* font-weight: bold; */
  /* font-size: 18px; */
  padding: 5%;
  text-decoration: none;
  transition: 0.5s;
  cursor: pointer;
  border: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${Colors.white};
  :hover {
    background-color: ${Colors.gray1};
  }
`;

const ExercisesContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperButton,
  Button,
  ListHeader,
  ListHeaderRow,
  ListHeaderCol,
  SelectAllButton,
  ExercisesContainer,
  Icon,
};
