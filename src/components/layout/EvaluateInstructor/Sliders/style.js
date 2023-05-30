import styled from "styled-components";
import { Colors } from "../../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  /* gap: 5vh; */
  align-items: center;
  justify-content: center;
`;

export const DoneButton = styled.button`
  width: 50vw;
  padding: 1vh 1vw;
  background-color: ${Colors.gray2};
  border-radius: 10px;
  border: solid;
  border-color: ${Colors.white};
  border-width: 1px;
  p {
    color: ${Colors.white};
    font-size: 2vh;
  }
`;

export const SlideContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 35vw;
  overflow-x: hidden;
  width: 100vw;
  gap: 2vw;
  /* height: 100%; */
  align-items: center;
  /* justify-content: center; */
  position: relative;
  .inactive {
    transform: scale(0.7);
  }

  .toNext {
    animation-name: zoomIn;
    animation-duration: 0.2s;
    @keyframes zoomIn {
      from {
        transform: scale(0.7);
      }

      to {
        transform: scale(1);
      }
    }
  }
  .toPrev {
    animation-name: zoomOut;
    animation-duration: 0.2s;
    @keyframes zoomOut {
      from {
        transform: scale(1);
      }

      to {
        transform: scale(0.7);
      }
    }
  }
`;

export const Slide = styled.div`
  border: none;
  border-width: 3px;
  border-radius: 5%;
  border-color: ${Colors.red_light};
  height: 15vh;
  width: 30vw;
  min-width: 30vw;
  /* display: flex; */
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  img {
    height: 10vh;
  }
  .title {
    margin-top: 1vh;
    color: ${Colors.white};
    font-size: 1.5vh;
    width: 100%;
    text-align: center;
    /* padding: 2vh 2vw; */
  }
`;

export const BallsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
`;

export const SlideNumberBall = styled.div`
  height: 1vh;
  width: 1vh;
  background-color: ${(props) =>
    props.active ? Colors.red_light : Colors.white};
  border-radius: 100000px;
`;
