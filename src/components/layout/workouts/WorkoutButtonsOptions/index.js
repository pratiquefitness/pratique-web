import React from 'react';
import { WrapperButtonOptions, ButtonOptions } from '../WorkoutButtonsOptions/style';
import IconA from '../../../assets/icones/workout/icon-A.svg';
import IconB from '../../../assets/icones/workout/icon-B.svg';
import IconC from '../../../assets/icones/workout/icon-C.svg';
import ArrowRed from '../../../assets/icones/workout/arrow-red.svg';


function WorkoutButtonOptions() {
    return (
                    <WrapperButtonOptions>
                        <ButtonOptions>
                            <div>
                                <img src={IconA} alt="" />
                                <p>Ombro, Tríceps, Peitoral</p>
                            </div>
                            <img src={ArrowRed} alt="" />
                        </ButtonOptions>
                        <ButtonOptions>
                            <div>
                                <img src={IconB} alt="" />
                                <p>Pernas, Bíceps, Dorsal</p>
                            </div>
                            <img src={ArrowRed} alt="" />
                        </ButtonOptions>
                        <ButtonOptions to="/workout-c">
                            <div>
                                <img src={IconC} alt="" />
                                <p>Pernas</p>
                            </div>
                            <div>
                                <p className="textBtn">Sugerido</p>
                                <img src={ArrowRed} alt="" />
                            </div>
                        </ButtonOptions>
                    </WrapperButtonOptions>

  );
}

export default WorkoutButtonOptions;
