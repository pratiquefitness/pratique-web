import React from "react";
import { CustomModalWindow, HeaderWrapper } from "./style";
import Close from "../../assets/icones/headerBar/close.svg";
function ModalVideoExercicio({ video_id, close }) {
  return (
    <CustomModalWindow>
      <div>
        <HeaderWrapper>
          <div>
            <p>Instruções do Exercício</p>
          </div>
          <a onClick={close} href="#fechar">
            <img src={Close} alt="" />
          </a>
        </HeaderWrapper>
        <iframe src={`https://www.youtube.com/embed/${video_id}`} />
      </div>
    </CustomModalWindow>
  );
}

export default ModalVideoExercicio;
