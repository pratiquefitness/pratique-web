import React from 'react';
import { Container, WrapperControlPanel, ControlPanel, 
WrapperMyWorkouts } from './style';

import Header from '../../layout/Header';
import TabBar from '../../layout/TabBar';
import Title from '../../layout/Title';
import WorkoutButtonsOptions from '../../layout/workouts/WorkoutButtonsOptions';
import WorkoutButtonOtherOptions from '../../layout/workouts/WorkoutButtonsOtherOptions';
import MyProgressDays from '../../layout/home/MyProgressDays';


function Workouts() {
    return (
        <Container >
            <WrapperControlPanel>
                <ControlPanel>
                    <Header />
                    <WrapperMyWorkouts>
                        <Title title="Meus treinos" />
                        <div>
                            <MyProgressDays />
                        </div>
                    </WrapperMyWorkouts>
                    <WorkoutButtonsOptions />
                    <WorkoutButtonOtherOptions />
                    <TabBar />
                </ControlPanel>
            </WrapperControlPanel>
        </Container>
    
  );
}

export default Workouts;
