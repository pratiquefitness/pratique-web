import React from 'react';
import { ContainerLogin, WrapperControlPanel, ControlPanel } from './style';

import Header from '../../layout/Header';
import TabBar from '../../layout/TabBar';

function Poins() {
    return (
        <ContainerLogin >
            <WrapperControlPanel>
                <ControlPanel>
                    <Header />
                    <p>Points</p>
                    <TabBar />
                </ControlPanel>
            </WrapperControlPanel>
        </ContainerLogin>
    
  );
}

export default Poins;
