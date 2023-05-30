import React from "react";
import { ContainerLogin, WrapperControlPanel, ControlPanel } from "./style";

import Header from "../../layout/Header";
import TabBar from "../../layout/TabBar";

function Profile() {
  return (
    <ContainerLogin>
      <WrapperControlPanel>
        <ControlPanel>
          <Header />
          <p>Profile</p>
          <TabBar />
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default Profile;
