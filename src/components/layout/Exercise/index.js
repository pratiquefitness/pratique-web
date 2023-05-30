import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../assets/colors";
import Image from "../../assets/image/image-change-exercises.svg";
import {
  ExerciseCol,
  ExerciseContainer,
  ExerciseEdit,
  ExerciseImage,
  ExerciseImageContainer,
  ExerciseInfoCol,
  ExerciseInfoContainer,
  ExerciseInfoRow,
  ExerciseInfoTitle,
  ExerciseInfoValue,
  ExerciseSelect,
  ExerciseTitle,
} from "./style";

function Exercise({ select, edit, data, selected, editable = true }) {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(selected);

  return (
    <ExerciseContainer>
      {/* <ExerciseSelect
        selected={isSelected}
        onClick={(e) => {
          select(e);
          setIsSelected(!isSelected);
        }}
      /> */}
      <ExerciseImageContainer>
        <ExerciseImage src={data?.thumb} />
      </ExerciseImageContainer>
      <ExerciseInfoContainer>
        <ExerciseInfoRow>
          <ExerciseTitle>{data?.nome}</ExerciseTitle>
        </ExerciseInfoRow>
        <ExerciseInfoRow>
          <ExerciseInfoCol>
            <ExerciseInfoTitle>Séries</ExerciseInfoTitle>
            <ExerciseInfoValue>{data?.series}</ExerciseInfoValue>
          </ExerciseInfoCol>
          <ExerciseInfoCol>
            <ExerciseInfoTitle>Repetições</ExerciseInfoTitle>
            <ExerciseInfoValue>{data?.repeticoes}</ExerciseInfoValue>
          </ExerciseInfoCol>
          <ExerciseInfoCol>
            <ExerciseInfoTitle>Descanso</ExerciseInfoTitle>
            <ExerciseInfoValue>{data?.descanco}s</ExerciseInfoValue>
          </ExerciseInfoCol>
        </ExerciseInfoRow>
      </ExerciseInfoContainer>
      {editable ? (
        <ExerciseEdit
          onClick={() => navigate("/recommentadions", { state: data })}
        >
          <FontAwesomeIcon icon={faPen} color={Colors.white} size="lg" />
        </ExerciseEdit>
      ) : null}
    </ExerciseContainer>
  );
}

export default Exercise;
