import React, { useEffect, useState } from "react";
import {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperButton,
  Button,
  ListHeader,
  SelectAllButton,
  ExercisesContainer,
  ListHeaderCol,
  ListHeaderRow,
  Icon,
} from "./style";

import HeaderBar from "../../layout/HeaderBar";
import LinkButton from "../../form/LinkButton";

import Image from "../../assets/image/image-change-exercises.svg";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../assets/colors";
import Exercise from "../../layout/Exercise";
import Fitday from "../../../api/services/FitDay";

function ExercisesList() {
  // const params = useParams();
  const [exercicios, setExercicios] = useState();
  const [selected, setSelected] = useState([]);

  const selectExercise = (e, exercise) => {
    e.preventDefault();
    const temp = selected;
    temp[exercise] = !temp[exercise];
    setSelected(temp);
  };

  const selectAll = (e) => {
    e.preventDefault();
    let temp = [];
    exercicios.forEach(({ exercicio, index }) => {
      temp[index] = true;
    });
    setSelected(temp);
  };

  useEffect(() => {
    const getData = async () => {
      await Fitday.ficha().then((res) => {
        if (typeof res.resposta.length === "undefined") {
          setExercicios(Array(1).fill(res.resposta));
          return;
        }
        setExercicios(res.resposta);
      });
    };
    getData();
  }, []);

  return (
    <ContainerLogin onSubmit={(e) => e.preventDefault()}>
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/days-exercises" text="Exercícios do dia" />
          <ListHeader>
            <p>Qual você gostaria de alterar?</p>
            {/* <ListHeaderRow>
              <ListHeaderCol>
                <SelectAllButton onClick={selectAll}>
                  Selecionar todos
                </SelectAllButton>
              </ListHeaderCol>
              <ListHeaderCol>
                <Icon>
                  <FontAwesomeIcon
                    icon={faTrash}
                    color={Colors.red_light}
                    size="xl"
                  />
                </Icon>
              </ListHeaderCol>
            </ListHeaderRow> */}
          </ListHeader>
          <ExercisesContainer>
            {exercicios
              ? exercicios.map((exercise, index) => (
                  <Exercise
                    data={exercise}
                    select={(e) => {
                      selectExercise(e, index);
                    }}
                  />
                ))
              : null}
          </ExercisesContainer>
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

export default ExercisesList;
