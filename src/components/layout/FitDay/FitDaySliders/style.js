import styled from "styled-components";
import { Colors } from "../../../assets/colors";

const ContainerButtons = styled.div`
  padding: 2vh;
  width: 100%;
  flex: 1;
  background-color: ${Colors.gray2};
  display: flex;
  gap: 2vh;
  flex-direction: column;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 35%;
  gap: 3vw;
`;

const Buttons = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* flex: 1; */
  /* height: 74px; */
  border: 1px solid ${Colors.gray1};
  border-radius: 8px;
  background-color: ${Colors.gray2};
  /* div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    p {
      font-size: 12px;
      color: ${Colors.gray1};
    }
  } */
  padding: 3%;
`;

export const ButtonTitle = styled.text`
  color: ${Colors.white};
  font-size: 1.7vh;
  /* text-align: justify; */
`;

export const SliderContainer = styled.div`
  background-color: ${Colors.white};
  border-radius: 10000px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 2%;
`;

export const Slider = styled.input`
  -webkit-appearance: none;
  background-color: ${Colors.white};
  border-radius: 10000px;
  width: 95%;
  overflow: visible;
  /* margin: 2%; */
  ::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 1.5vh; /* Set a specific slider handle width */
    height: 1.5vh; /* Slider handle height */
    background: ${Colors.white}; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 100000px;
    scale: 1.5;
    box-shadow: -80px 0 0 75px
      ${(props) =>
        props.value <= 2 ? "red" : props.value == 3 ? "orange" : "green"};
  }
  ::-moz-range-thumb {
    width: 1.5vh; /* Set a specific slider handle width */
    height: 1.5vh; /* Slider handle height */
    background: #04aa6d; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
  ::-webkit-slider-runnable-track {
    border-radius: 1000px;
    background-color: ${Colors.gray1};
    overflow: hidden;
    /* margin:0 2%; */
  }
`;

export const SelectionWrapper = styled.div`
  display: flex;
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  /* padding: 5%; */
`;

export const SelectionText = styled.text`
  color: ${Colors.white};
  font-size: 80%;
`;

export const SelectionIcon = styled.img`
  margin-right: 3%;
  flex: 1;
`;

export { ContainerButtons, Buttons };
