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
import { List } from "../../layout/ListExercises/style";
import { useNavigate } from "react-router-dom";

function WorkoutC() {
  const navigate = useNavigate();
  return (
    <ContainerLogin>
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/workouts" text="Treino do dia" />
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
              text="Iniciar FitDay"
            />
          </WrapperButton>
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default WorkoutC;
