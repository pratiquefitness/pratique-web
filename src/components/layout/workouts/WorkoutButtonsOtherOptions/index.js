import React from 'react';
import { WrapperButtonOtherOptions, ButtonOtherOptions } from './style';

import ArrowRed from '../../../assets/icones/workout/arrow-red.svg';


function WorkoutButtonOtherOptions() {
    return (
            <WrapperButtonOtherOptions>
                <div>
                <p>Outras opções</p>
                </div>
                <ButtonOtherOptions>
                    <p>Solicitar revisão de treino</p>
                    <img src={ArrowRed} alt="" />
                </ButtonOtherOptions>
                
            </WrapperButtonOtherOptions>

  );
}

export default WorkoutButtonOtherOptions;
