import { WrapperHistoricButton, HistoricButton } from "./style";

import Arrow from "../../../assets/icones/home/arrow.svg";
import { useNavigate } from "react-router-dom";

function MyProgressHistoricButton({ percentage, workoutNumber }) {
  const navigate = useNavigate();
  return (
    <WrapperHistoricButton
      onClick={(e) => (e.preventDefault(), navigate("/historico"))}
    >
      <HistoricButton>
        <p>Visualizar todo o histórico</p>
        <img src={Arrow} alt="" />
      </HistoricButton>
    </WrapperHistoricButton>
  );
}

export default MyProgressHistoricButton;
