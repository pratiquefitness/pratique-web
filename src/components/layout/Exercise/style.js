import { Link } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../assets/colors";

export const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 5%;
  /* height: 20%; */
  width: 100%;
  gap: 0 3%;
  border: solid;
  border-width: 0 0 0 0;
  border-bottom-color: ${Colors.gray1};
  border-bottom-width: 1px;
  p {
    font-size: 1.7vh;
  }
`;
export const ExerciseSelect = styled.div`
  /* margin: 0 3%; */
  border-radius: 10000px;
  width: 2vh;
  height: 2vh;
  border: solid;
  background-color: ${(props) =>
    props.selected ? Colors.red_light : Colors.gray2};
  border-color: ${Colors.red_light};
  border-width: 2px;
`;
export const ExerciseImageContainer = styled.div`
  /* background-color: white; */
  /* border-radius: 10px; */
  /* width: 100%;
  height: 100%; */
  /* flex: 1; */
`;

export const ExerciseImage = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 10%;
`;

export const ExerciseCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ExerciseRow = styled.div`
  display: flex;
  flex-direction: row;
  p {
    color: ${Colors.white};
  }
  margin: 3% 0;
`;

export const ExerciseInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;
export const ExerciseInfoCol = styled.div``;
export const ExerciseInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0 1vw;
`;

export const ExerciseTitle = styled.p`
  flex: 1;
  /* padding: 3%; */
  /* background-color: yellow; */
  font-family: Rubik;
`;

export const ExerciseInfoTitle = styled.p`
  flex: 1;
  /* padding: 3%; */
  font-family: Rubik;
`;

export const ExerciseInfoValue = styled.p`
  flex: 1;
  /* padding: 3%; */
  font-family: Rubik;
  font-size: 12px !important;
`;

export const ExerciseEdit = styled(Link)`
  /* width: 100%; */
  /* height: 53px; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 5% 0 5% 0; */
  background-color: ${Colors.gray2};
  color: ${Colors.white};
  /* font-weight: bold; */
  /* font-size: 18px; */
  padding: 1.5%;
  text-decoration: none;
  transition: 0.5s;
  cursor: pointer;
  border: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${Colors.red_light};
  :hover {
    background-color: ${Colors.gray1};
  }
`;
