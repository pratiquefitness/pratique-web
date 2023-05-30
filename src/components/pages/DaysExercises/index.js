import React, { useEffect, useState } from "react";
import {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperButton,
  Button,
  WrapperOverview,
  WrapperExercises,
  WrapperContent,
} from "./style";

import ListExercises from "../../layout/ListExercises";

import Title from "../../layout/Title";
import TitleLarge from "../../layout/TitleLarge";
import HeaderBar from "../../layout/HeaderBar";
import LinkButton from "../../form/LinkButton";
import DaysExercisesButtons from "../../layout/DaysExercises/DaysExercisesButtons";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../assets/colors";

function DaysExercises() {
  const { state } = useLocation();
  const [dificuldadeExercicios, setDificuldadeExercicios] = useState("");
  const [params, setParams] = useState(state);
  const navigate = useNavigate();
  const selectDificuldade = (dificuldade) => {
    // console.log(dificuldade);
    setDificuldadeExercicios(dificuldade);
    // console.log(params);
    // let temp = params;
    // temp["dificuldade"] = dificuldade;
    // setParams(temp);
  };

  useEffect(() => {
    // console.log(params);
  }, []);

  return (
    <ContainerLogin onSubmit={(e) => e.preventDefault()}>
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/recommendations" text="Exercícios do dia" />
          <WrapperOverview>
            <Title title="Visão geral" />
            <TitleLarge title="08 exercícios" />
          </WrapperOverview>
          <DaysExercisesButtons select={selectDificuldade} />
          <WrapperContent>
            <ListExercises />
          </WrapperContent>
          <WrapperButton>
            <Title
              fontSize="1.3em"
              title="Gostaria de alterar os exercícios?"
            />
            <Button>
              <LinkButton
                disabled={dificuldadeExercicios === ""}
                // to="/exercises/list"
                onClick={() => navigate("/exercises/list", { state: params })}
                text="Sim"
                bgColor={Colors.background}
                borderColor={
                  dificuldadeExercicios === ""
                    ? Colors.background
                    : Colors.white
                }
              />
              <LinkButton
                disabled={dificuldadeExercicios === ""}
                onClick={() => navigate("/days-workout", { state: params })}
                text="Não"
              />
            </Button>
          </WrapperButton>
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default DaysExercises;
