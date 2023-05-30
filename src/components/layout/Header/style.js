import styled from "styled-components";
import { Colors } from "../../assets/colors";
import { Link } from "react-router-dom";

const HeaderContainer = styled.form`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    height: 77px;
    width: 100%;
    background-color: ${Colors.background};
`;

const LeftColumnHeader = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
        font-size: 14px;
        color: ${Colors.white};
    }

    p:nth-of-type(2) {
        font-size: 20px;
        font-weight: 700;
    }
`;

const RightColumnContainer = styled.form`
    display: flex;
    align-items: center;
`;

const Button = styled(Link)`
    padding: 8px 23.5px 8px 23.5px;
    display: flex;
    justify-content: center;
    gap: 12px;
    align-items: center;
    height: 35px;
    border-radius: 8px;
    background-color: ${Colors.red_light};
    text-decoration: none;
    transition: .5s;
    color: ${Colors.white};

    :hover {
        background-color: ${Colors.gray1};
    }

`;


export { HeaderContainer, LeftColumnHeader, RightColumnContainer, Button };