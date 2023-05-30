import React from "react";
import {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  WrapperContent,
} from "./style";

import Header from "../../layout/Header";
import TabBar from "../../layout/TabBar";
import MyProgress from "../../layout/home/MyProgress";
import MyDisposition from "../../layout/home/MyDisposition";
import LastMonth from "../../layout/home/LastMonth";

function Home() {
  return (
    <ContainerLogin>
      <WrapperControlPanel>
        <ControlPanel>
          <Header />
          <WrapperContent>
            <MyProgress />
            <MyDisposition />
            <LastMonth />
          </WrapperContent>
          <TabBar />
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default Home;
