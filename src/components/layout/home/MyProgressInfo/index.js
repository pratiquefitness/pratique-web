import {
  WrapperMyProgressInfo,
  LeftColumnMyProgressInfo,
  RightColumnMyProgressInfo,
} from "./style";
import { Colors } from "../../../assets/colors";

import TitleLarge from "../../TitleLarge";
import ProgressBarHome from "../ProgressBarHome";

function MyProgressInfo({ percentage, workoutNumber }) {
  return (
    <WrapperMyProgressInfo>
      <LeftColumnMyProgressInfo>
        <TitleLarge title={`${percentage}%`} />
        <ProgressBarHome progress={percentage} bgcolor={Colors.red_light} />
      </LeftColumnMyProgressInfo>
      <RightColumnMyProgressInfo>
        <TitleLarge title={`Faltam ${workoutNumber}`} />
        <p>Treinos para atingir a sua meta de FitDay</p>
      </RightColumnMyProgressInfo>
    </WrapperMyProgressInfo>
  );
}

export default MyProgressInfo;
