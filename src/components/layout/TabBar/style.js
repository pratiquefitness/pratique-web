import styled from "styled-components";
import { Colors } from "../../assets/colors";
import { Link } from "react-router-dom";

const TabBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 23px 0 23px;
    height: 72px;
    width: 100%;
    background-color: ${Colors.background} ;
`;

const ButtonTabBar = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    gap: 8px    ;

    p {
        color: ${Colors.gray1};
        font-size: 10px;
        font-weight: 700;

        :hover {
            color: ${Colors.white};
        }

        :active {
            color: ${Colors.white};

        }
    }

    :hover {
        color: ${Colors.white};
    }

    
`;


export { TabBarContainer, ButtonTabBar };