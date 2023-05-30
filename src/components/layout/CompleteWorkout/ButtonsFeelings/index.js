import { ContainerButtons, WrapperButtons, Buttons, Circle } from "./style";

import Title from "../../Title";

import SadFace from "../../../assets/icones/fitday/sad-face.svg";
import HappyFace from "../../../assets/icones/fitday/happy-face.svg";
import SmileyFace from "../../../assets/icones/fitday/smiley-face.svg";

function ButtonsFeelings({ select }) {
  return (
    <ContainerButtons>
      <Title title="Como está se sentindo agora?" />
      <WrapperButtons>
        <Buttons onClick={select}>
          <div>
            <Circle>
              <img src={SadFace} alt="" />
            </Circle>
            <p>Exausto(a). Não me restam forças</p>
          </div>
        </Buttons>
        <Buttons onClick={select}>
          <div>
            <Circle>
              <img src={HappyFace} alt="" />
            </Circle>
            <p>Tranquilo(a). Faria tudo de novo</p>
          </div>
        </Buttons>
        <Buttons onClick={select}>
          <div>
            <Circle>
              <img src={SmileyFace} alt="" />
            </Circle>
            <p>Satisfeito(a) com tudo que fiz hoje</p>
          </div>
        </Buttons>
      </WrapperButtons>
    </ContainerButtons>
  );
}

export default ButtonsFeelings;
