import React, { useEffect } from "react";
import {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperButton,
  Button,
  WrapperExercisesInfo,
  WrapperExercises,
  WrapperExercisesInput,
  ExercisesInput,
} from "./style";

import Title from "../../layout/Title";
import HeaderBar from "../../layout/HeaderBar";
import LinkButton from "../../form/LinkButton";
import ButtonsAddRemove from "../../layout/ChangeExercises/ButtonsAddRemove";

import Image from "../../assets/image/image-change-exercises.svg";
import ChangeExercisesInput from "../../layout/ChangeExercises/ChangeExercisesInput";
import { useLocation } from "react-router-dom";

function ChangeExercises() {
  // const params = useParams();
  const { state } = useLocation();

  useEffect(() => {
    // console.log(state);
  }, []);

  return (
    <ContainerLogin>
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/recommendations" text="Alterar exercício" />
          <WrapperExercisesInfo>
            <Title title="Dados do exercício" />
            <img src={Image} alt="" />
            <Title title="Pack deck" />
            <WrapperExercisesInput>
              <ExercisesInput>
                <p>Tipo</p>
                <ChangeExercisesInput
                  type="text"
                  placeholder="Perna"
                  readOnly={true}
                />
              </ExercisesInput>
              <ExercisesInput>
                <p>Séries</p>
                <ButtonsAddRemove />
                <ChangeExercisesInput type="text" placeholder="4x" />
              </ExercisesInput>
              <ExercisesInput>
                <p>Repetições</p>
                <ButtonsAddRemove />
                <ChangeExercisesInput type="text" placeholder="10 a 20" />
              </ExercisesInput>
            </WrapperExercisesInput>
          </WrapperExercisesInfo>
          <WrapperButton>
            <Button>
              <LinkButton to="/" text="Cancelar" />
              <LinkButton to="/days-workout" text="Confirmar" />
            </Button>
          </WrapperButton>
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default ChangeExercises;
