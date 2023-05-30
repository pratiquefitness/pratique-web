import {
  Container,
  WrapperMyDisposition,
  WrapperBoxMyDisposition,
  BoxMyDisposition,
  WrapperGreenBars,
} from "./style";

import Title from "../../Title";

import Smiley from "../../../assets/icones/home/smiley.svg";
import GreenBar from "../../../assets/icones/home/greenbar.svg";

function MyDisposition() {
  return (
    <Container>
      <WrapperMyDisposition>
        <Title fontSize={"2.5vh"} title="Minha disposição nesse mês" />
        <WrapperBoxMyDisposition>
          <BoxMyDisposition>
            <img style={{ width: "7vh" }} src={Smiley} alt="" />
            <p>
              <span>80%</span> disposto
            </p>
          </BoxMyDisposition>
          <BoxMyDisposition>
            <WrapperGreenBars>
              <img src={GreenBar} alt="" />
              <img src={GreenBar} alt="" />
              <img src={GreenBar} alt="" />
            </WrapperGreenBars>
            <p>
              <span>Muita</span> energia
            </p>
          </BoxMyDisposition>
          <BoxMyDisposition>
            <img style={{ width: "7vh" }} src={Smiley} alt="" />
            <p>
              <span>2022</span> calorias
            </p>
          </BoxMyDisposition>
        </WrapperBoxMyDisposition>
      </WrapperMyDisposition>
    </Container>
  );
}

export default MyDisposition;
