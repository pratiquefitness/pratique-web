import styled from "styled-components";
import { Colors } from "../../../assets/colors";
import { Link } from "react-router-dom";


const WrapperButtonOtherOptions = styled.div`
    width: 100%;
    height: 107px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: ${Colors.gray2};
    color: ${Colors.white};

    div p {
        padding: 16px;
    }
`;

const ButtonOtherOptions = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${Colors.gray4};
    border-bottom: 1px solid ${Colors.gray4};
    height: 56px;
    padding: 16px;
    text-decoration: none;
    color: ${Colors.white};
    font-weight: 300;

    :hover {
        background-color: ${Colors.gray4};
    }

`;

export { WrapperButtonOtherOptions, ButtonOtherOptions };