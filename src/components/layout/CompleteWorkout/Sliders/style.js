import styled from "styled-components";
import { Colors } from "../../../assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  width: 100vw;
  height: 100%;
  gap: 5vh;
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
  padding: 0 12.5vw;
  overflow-x: hidden;
  width: 100vw;
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
  border: solid;
  border-width: 3px;
  border-radius: 5%;
  border-color: ${Colors.red_light};
  height: 30vh;
  width: 75vw;
  min-width: 75vw;
  /* display: flex; */
  position: relative;
  overflow: hidden;
  img {
    height: 25vh;
  }
  .bottomRow {
    position: absolute;
    bottom: 0;
    width: 100%;
    .title {
      background-color: ${Colors.gray4};
      width: 100%;
      height: 20%;
      color: ${Colors.white};
      font-size: 2vh;
      padding: 2vh 2vw;
    }
    .info {
      display: flex;
      flex-direction: row;
      background-color: ${Colors.white};
      justify-content: space-between;
      padding: 1vh 2vw;
      div {
        display: flex;
        flex-direction: column;
        gap: 0.5vh;
        .infoTitle {
          font-weight: bold;
        }
        p {
          color: ${Colors.gray3};
        }
      }
    }
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
