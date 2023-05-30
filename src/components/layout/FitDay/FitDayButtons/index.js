import { ContainerButtons, WrapperButtons, Buttons, Circle } from "./style";

import Title from "../../Title";

import SadFace from "../../../assets/icones/fitday/sad-face.svg";
import HappyFace from "../../../assets/icones/fitday/happy-face.svg";
import SmileyFace from "../../../assets/icones/fitday/smiley-face.svg";
import { useEffect, useState } from "react";

function FitDayButtons({ select }) {
  const [selected, setSelected] = useState(5);

  const selectDisposicao = (event, newValue) => {
    event.preventDefault();
    if (selected === newValue) {
      // setSelected();
      // select("animo", null);
      return;
    }
    setSelected(newValue);
    select("animo", newValue);
  };

  useEffect(() => {
    select("animo", 5);
  }, []);

  return (
    <ContainerButtons>
      <Title fontSize={"2vh"} title="Como está a sua disposição agora?" />
      <WrapperButtons>
        <Buttons
          selected={selected === 0}
          value={0}
          onClick={(e) => selectDisposicao(e, 0)}
        >
          <div>
            <Circle>
              <img src={SadFace} alt="" />
            </Circle>
            <p>Sem ânimo</p>
          </div>
        </Buttons>
        <Buttons
          selected={selected === 5}
          value="5"
          onClick={(e) => selectDisposicao(e, 5)}
        >
          <div>
            <Circle>
              <img src={HappyFace} alt="" />
            </Circle>
            <p>Normal</p>
          </div>
        </Buttons>
        <Buttons
          selected={selected === 10}
          value="10"
          onClick={(e) => selectDisposicao(e, 10)}
        >
          <div>
            <Circle>
              <img src={SmileyFace} alt="" />
            </Circle>
            <p>Animado</p>
          </div>
        </Buttons>
      </WrapperButtons>
    </ContainerButtons>
  );
}

export default FitDayButtons;
