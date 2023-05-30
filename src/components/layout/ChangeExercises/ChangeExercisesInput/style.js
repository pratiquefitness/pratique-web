import styled from "styled-components";
import { Colors } from "../../../assets/colors";

const InputChangeExercises = styled.input`
    width: 100%;
    height: 56px;
    border-radius: 5px;
    border: 1px solid ${Colors.white};
    background-color: ${Colors.gray2};
    margin: 8px 0 8px 0;

    ::placeholder {
        color: ${Colors.white};
        font-weight: 300;
        padding: 16px;
    }
`;

export { InputChangeExercises };