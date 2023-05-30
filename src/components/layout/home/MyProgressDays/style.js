import styled from "styled-components";
import { Colors } from "../../../assets/colors";
import { Link } from "react-router-dom";

const WrapperMyProgressDays = styled.form`
  display: flex;
  height: 7vh;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  overflow-x: scroll;
  white-space: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const MyProgressDaysContent = styled.div`
  display: flex;
  flex-direction: row;
  color: ${Colors.white};
  gap: 8px;
`;

const Days = styled.div`
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 40px;
  }

  .btn_green {
    background-color: ${Colors.green};
  }

  .btn_red {
    border: 3px solid ${Colors.red_light};
  }

  .btn_white {
    border: 3px solid ${Colors.white};
  }
`;

export { WrapperMyProgressDays, MyProgressDaysContent, Days };
