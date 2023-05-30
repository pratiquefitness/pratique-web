import styled from "styled-components";
import { Colors } from "../../assets/colors";

const CustomModalWindow = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4vh 3vw;
  div {
    display: flex;
    background-color: ${Colors.gray3};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2vh;
    /* margin: 0 2vw; */
  }
  iframe {
    width: 86vw;
    height: 22vh;
    border-radius: 10px;
    margin: 2vh 2vw;
  }
`;

export const HeaderWrapper = styled.span`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-top: 2vh;
  justify-content: center;
  align-content: center;
  align-items: center;
  a {
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    color: ${Colors.white};
    padding: 1%;
    height: 3vh;
    width: 3vh;
    right: 5vw;
    margin-bottom: 2vh;
    position: absolute;
    border: solid;
    border-radius: 100%;
    border-width: 2px;
    border-color: ${Colors.white};
    img {
      height: 1.5vh;
    }
  }
`;
export { CustomModalWindow };
