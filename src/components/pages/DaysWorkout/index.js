import React from "react";
import {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperContent,
  WrapperOverview,
  WrapperListExercises,
  WrapperButton,
} from "./style";

import HeaderBar from "../../layout/HeaderBar";
import LinkButton from "../../form/LinkButton";
import TitleLarge from "../../layout/TitleLarge";
import ListExercises from "../../layout/ListExercises";
import { useNavigate } from "react-router-dom";

function DaysWorkout() {
  const navigate = useNavigate();
  return (
    <ContainerLogin>
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/exercises/list" text="Treino do dia" />
          <WrapperContent>
            <WrapperOverview>
              <TitleLarge title="08 exercícios" />
            </WrapperOverview>
            <WrapperListExercises>
              <ListExercises />
            </WrapperListExercises>
          </WrapperContent>
          <WrapperButton>
            <LinkButton
              onClick={() => navigate("/complete-workout")}
              text="Iniciar o treino"
            />
          </WrapperButton>
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default DaysWorkout;
