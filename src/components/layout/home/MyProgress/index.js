import Title from "../../Title";
import { Container, WrapperMyProgress } from "./style";
import MyProgressInfo from "../MyProgressInfo";
import MyProgressDays from "../MyProgressDays";
import MyProgressHistoricButton from "../MyProgressHistoricButton";
import { useEffect } from "react";
import { useState } from "react";
import Usuarios from "../../../../api/services/Usuarios";

function MyProgress() {
  const [progresso, setProgresso] = useState();

  const fetchProgresso = async () => {
    await Usuarios.progresso().then((res) => {
      // console.log(res.resposta);
      setProgresso(res.resposta);
    });
  };

  useEffect(() => {
    fetchProgresso();
  }, []);
  return (
    <Container>
      <WrapperMyProgress>
        <Title fontSize={"3vh"} title="Meu progresso" />
        <MyProgressInfo
          percentage={progresso?.progresso}
          workoutNumber={progresso?.faltam}
        />
        <MyProgressDays />
        <MyProgressHistoricButton />
      </WrapperMyProgress>
    </Container>
  );
}

export default MyProgress;
