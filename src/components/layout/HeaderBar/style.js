import styled from "styled-components";
import { Colors } from "../../assets/colors";

const HeaderContainer = styled.form`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    height: 56px;
    width: 100%;
    background-color: ${Colors.background};
    color: ${Colors.white};

    div {
        display: flex;
        align-items: center;
        gap: 20px;

        p {
            font-size: 20px;
            font-weight: 700;
        }
    }
`;

export { HeaderContainer };