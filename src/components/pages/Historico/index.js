import React, { useEffect, useState } from "react";
import { ContainerLogin, WrapperControlPanel, ControlPanel } from "./style";

import Header from "../../layout/Header";
import TabBar from "../../layout/TabBar";

import Usuarios from "../../../api/services/Usuarios";
import Exercise from "../../layout/Exercise";

function Historico() {
  const [historico, setHistorico] = useState();

  useEffect(() => {
    const getData = async () => {
      await Usuarios.historico().then((res) => setHistorico(res.resposta));
    };
    getData();
  }, []);
  return (
    <ContainerLogin>
      <WrapperControlPanel>
        <ControlPanel>
          <Header />
          <div className="historico">
            {historico?.map((item, index) => (
              <Exercise data={item} editable={false} />
            ))}
          </div>
          <TabBar />
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default Historico;
