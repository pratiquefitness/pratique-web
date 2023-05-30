import React, { useEffect, useState } from "react";
import {
  Container,
  WrapperControlPanel,
  ControlPanel,
  WrapperContent,
  WrapperResults,
  WrapperWorkoutIndications,
  WrapperHeatlhIndications,
  WrapperChangeButton,
  ChangeButton,
  WrapperButton,
} from "./style";

import Title from "../../layout/Title";
import TitleLarge from "../../layout/TitleLarge";
import HeaderBar from "../../layout/HeaderBar";
import LinkButton from "../../form/LinkButton";

import CloseRed from "../../assets/icones/fitday/close-red.svg";

import FitDayAPI from "../../../api/services/FitDay";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../assets/colors";

function Recomendations() {
  const [recommendations, setRecommendations] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();
  const getData = async () => {
    await FitDayAPI.recommendations().then((res) => {
      if (res.tipo !== "sucesso") {
        window.alert("Erro ao carregar as recomendações!");
        return;
      }
      let tempRes = res.resposta;
      let tempInd = tempRes.indicacao2.split(" | ");
      tempRes.indicacao2 = tempInd;
      setRecommendations(tempRes);
    });
  };

  const aceitar = async () => {
    await FitDayAPI.acceptRecommendations().then((res) =>
      navigate("/days-exercises")
    );
  };

  useEffect(() => {
    getData();
    // console.log(state);
  }, []);

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/fitday" text="Recomendações" />
          <WrapperContent>
            <WrapperResults>
              <Title fontSize="1.5em" title="Resultados" />
              <TitleLarge title={recommendations?.resultados1} />
              <p style={{ fontSize: "1em" }}>{recommendations?.resultados2}</p>
            </WrapperResults>
            <WrapperWorkoutIndications>
              <Title fontSize="1.5em" title="Indicações sobre o treino" />
              <TitleLarge title={recommendations?.indicacao1 + "%"} />
            </WrapperWorkoutIndications>
            <WrapperHeatlhIndications>
              <Title fontSize="1.5em" title="Indicações sobre saúde" />
              <div>
                {recommendations?.indicacao2?.map((ind) => (
                  <p>{ind}</p>
                ))}
              </div>
            </WrapperHeatlhIndications>
          </WrapperContent>
          <WrapperChangeButton>
            <ChangeButton to="/days-workout">
              <img src={CloseRed} alt="" />
              <p>Não modificar o treino</p>
            </ChangeButton>
          </WrapperChangeButton>
          <WrapperButton>
            <LinkButton
              bgColor={Colors.green}
              onClick={aceitar}
              text="Aceitar recomendações"
            />
          </WrapperButton>
        </ControlPanel>
      </WrapperControlPanel>
    </Container>
  );
}

export default Recomendations;
