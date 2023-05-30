import styled from "styled-components";
import { Colors } from "../../../assets/colors";
import { Link } from "react-router-dom";

const ContainerButtons = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 9px;
    right: 2px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`;

const WrapperButtons = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 54px;
    border-left: 1px solid ${Colors.white};
    
    .btn {
        background: purple;
    }
`;

const Button = styled.div`

`;


export { ContainerButtons, WrapperButtons, Button };