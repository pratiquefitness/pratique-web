import React, { useEffect, useState } from "react";
import {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperOverview,
  WrapperButton,
  WrapperHeader,
  WrapperEvaluateInstructor,
} from "./style";

import HeaderBar from "../../layout/HeaderBar";
import LinkButton from "../../form/LinkButton";
import TitleLarge from "../../layout/TitleLarge";
import Title from "../../layout/Title";
import ButtonsFeelings from "../../layout/CompleteWorkout/ButtonsFeelings";
import Sliders from "../../layout/EvaluateInstructor/Sliders";
import StarRatingComponent from "../../layout/EvaluateInstructor/StarRating";
import { useLocation, useNavigate } from "react-router-dom";
import Usuarios from "../../../api/services/Usuarios";
import FitdayAPI from "../../../api/services/FitDay";

function EvaluateInstructor() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [exercicios, setExercicios] = useState();
  const [instrutores, setInstrutores] = useState([]);
  const [finalizados, setFinalizados] = useState();
  const [tempo, setTempo] = useState();

  useEffect(() => {
    const getData = async () => {
      await Usuarios.finalizados().then((res) => setInstrutores(res.resposta));
      await FitdayAPI.ficha().then((res) => {
        if (typeof res.resposta.length === "undefined") {
          setExercicios(Array(1).fill(res.resposta));
          return;
        }
        setExercicios(res.resposta);
      });
    };
    getData();
    setTempo(state.tempo);
    setFinalizados(state.finalizados);
  }, []);

  return (
    <ContainerLogin>
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/complete-workout" text="Treino do dia" />
          <WrapperOverview>
            <Title title="Visão geral" />
            <WrapperHeader>
              <div>
                <TitleLarge title={`${finalizados}/${exercicios?.length}`} />
                <p>Exercícios finalizados</p>
              </div>
              <div>
                <TitleLarge
                  title={`${tempo?.hora}:${tempo?.minuto}:${tempo?.segundo}`}
                />
                <p>Tempo de treino</p>
              </div>
            </WrapperHeader>
          </WrapperOverview>
          <WrapperEvaluateInstructor>
            <Title title="Avalie o(s) instrutores(s)" />
            <Sliders instrutores={instrutores} />
          </WrapperEvaluateInstructor>
          <ButtonsFeelings select={(e) => e.preventDefault()} />
          <WrapperButton>
            <LinkButton onClick={() => navigate("/")} text="Completar" />
          </WrapperButton>
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default EvaluateInstructor;
