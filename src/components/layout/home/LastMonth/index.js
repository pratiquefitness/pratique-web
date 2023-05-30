import {
  Container,
  WrapperLastMonth,
  WrapperLastMonthInfo,
  LastMonthInfo,
  Circle,
} from "./style";

import Title from "../../Title";
import SadFace from "../../../assets/icones/fitday/sad-face.svg";
import HappyFace from "../../../assets/icones/fitday/happy-face.svg";
import SmileyFace from "../../../assets/icones/fitday/smiley-face.svg";
import { useEffect } from "react";
import Usuarios from "../../../../api/services/Usuarios";
import { useState } from "react";

function LastMonth() {
  const [ultimo, setUltimo] = useState();
  const fetchUltimo = async () => {
    await Usuarios.ultimo().then((res) => {
      // console.log(res);
      setUltimo(res?.resposta);
    });
  };

  const getSmile = (value) => {
    if (value <= 3) {
      return SadFace;
    }
    if (value <= 6) {
      return HappyFace;
    }
    if (value <= 10) {
      return SmileyFace;
    }
    return null;
  };

  useEffect(() => {
    fetchUltimo();
  }, []);

  return (
    <Container>
      <WrapperLastMonth>
        <Title fontSize={"2.5vh"} title="Último mês" />
        <WrapperLastMonthInfo>
          <LastMonthInfo>
            <Circle>
              <p>{ultimo?.treinos}</p>
            </Circle>
            <p>Treinos realizados</p>
          </LastMonthInfo>
          <LastMonthInfo>
            <Circle>
              <p>{ultimo?.novos}</p>
            </Circle>
            <p>Novos FitDays</p>
          </LastMonthInfo>
          <LastMonthInfo>
            <Circle>
              <p>{ultimo?.horas}</p>
            </Circle>
            <p>Horas de treino</p>
          </LastMonthInfo>
          <LastMonthInfo>
            <Circle>
              <img src={getSmile(ultimo?.disposto)} alt="" />
            </Circle>
            <p>Disposto</p>
          </LastMonthInfo>
          <LastMonthInfo>
            <Circle>
              <img src={getSmile(ultimo?.energia)} alt="" />
            </Circle>
            <p>Muita energia</p>
          </LastMonthInfo>
        </WrapperLastMonthInfo>
      </WrapperLastMonth>
    </Container>
  );
}

export default LastMonth;
