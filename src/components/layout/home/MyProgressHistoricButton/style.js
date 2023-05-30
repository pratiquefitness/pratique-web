import styled from "styled-components";
import { Colors } from "../../../assets/colors";
import { Link } from "react-router-dom";

const WrapperHistoricButton = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const HistoricButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-self: center;
  text-decoration: none;
  margin: 21px 0 0 0;
  gap: 6px;
  width: fit-content;
  
    p {
      font-size: 12px;
      color: ${Colors.white};
    }

    :hover p {
      color: ${Colors.gray1};
      transition: .5s;

    }
`;



export { WrapperHistoricButton, HistoricButton };