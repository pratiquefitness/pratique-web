import React, { useEffect, useRef, useState } from "react";
import {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperOverview,
  WrapperCompleteWorkout,
  WrapperLinkCallInstructor,
  WrapperButton,
} from "./style";

import HeaderBar from "../../layout/HeaderBar";
import LinkButton from "../../form/LinkButton";
import TitleLarge from "../../layout/TitleLarge";
import Carousel from "../../layout/CompleteWorkout/Sliders";

import Hand from "../../assets/icones/evaluateInstructor/hand.svg";
import Slider from "../../layout/CompleteWorkout/Sliders";
import { useNavigate } from "react-router-dom";
import FitdayAPI from "../../../api/services/FitDay";
import Usuarios from "../../../api/services/Usuarios";

function CompleteWorkout() {
  const navigate = useNavigate();
  const [exercicios, setExercicios] = useState();
  const [finalizados, setFinalizados] = useState(0);
  const [tempoInicial, setTempoInicial] = useState({
    hora: 0,
    minuto: 0,
    segundo: 0,
  });

  const [tempoTreino, setTempoTreino] = useState({
    hora: "00",
    minuto: "00",
    segundo: "00",
  });

  const [tempoSec, setTempoSec] = useState(0);

  let timer = setTimeout(() => {
    if (mounted) {
      setTempoSec(tempoSec + 1);
      calculateTime(tempoSec);
    }
  }, 1000);

  const calculateTime = (timePassed) => {
    const h = Math.floor((timePassed % 86400) / 3600);
    const m = Math.floor((timePassed % 3600) / 60);
    const s = timePassed % 60;
    const time = {
      hora: h < 10 ? `0${h}` : h,
      minuto: m < 10 ? `0${m}` : m,
      segundo: s < 10 ? `0${s}` : s,
    };
    setTempoTreino(time);
  };

  const chamarInstrutor = async () => {
    await FitdayAPI.chamarInstrutor();
  };

  const mounted = useRef(false);

  useEffect(() => {
    const getData = async () => {
      await FitdayAPI.ficha().then((res) => {
        if (typeof res.resposta.length === "undefined") {
          setExercicios(Array(1).fill(res.resposta));
          return;
        }
        setExercicios(res.resposta);
      });
    };
    getData();
    const date = new Date();
    const inicio = {
      hora: date.getHours(),
      minuto: date.getMinutes(),
      segundo: date.getSeconds(),
    };
    setTempoInicial(inicio);
    // console.log(inicio);
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <ContainerLogin>
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/days-workout" text="Treino do dia" />
          <WrapperOverview>
            <div>
              <TitleLarge title={`${finalizados}/${exercicios?.length}`} />
              <p style={{ fontSize: "2vh" }}>Exercícios finalizados</p>
            </div>
            <div>
              <TitleLarge
                title={`${tempoTreino.hora}:${tempoTreino.minuto}:${tempoTreino.segundo}`}
              />
              <p style={{ fontSize: "2vh" }}>Tempo de treino</p>
            </div>
          </WrapperOverview>
          <WrapperCompleteWorkout>
            <Slider
              exercicios={exercicios}
              next={() => setFinalizados(finalizados + 1)}
              finalizar={(opt) => {
                if (opt === true) {
                  navigate("/evaluate-instructor", {
                    state: { finalizados: finalizados + 1, tempo: tempoTreino },
                  });
                  return;
                }
                navigate("/evaluate-instructor", {
                  state: { finalizados: finalizados, tempo: tempoTreino },
                });
              }}
            />
          </WrapperCompleteWorkout>
          <WrapperLinkCallInstructor onClick={chamarInstrutor}>
            <img src={Hand} alt="" />
            <p>Chamar o instrutor</p>
          </WrapperLinkCallInstructor>
          <WrapperButton>
            <LinkButton
              onClick={() =>
                navigate("/evaluate-instructor", {
                  state: { finalizados: finalizados, tempo: tempoTreino },
                })
              }
              text="Concluir o treino"
            />
          </WrapperButton>
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default CompleteWorkout;
