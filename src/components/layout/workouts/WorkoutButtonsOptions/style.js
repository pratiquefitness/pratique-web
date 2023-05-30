import styled from "styled-components";
import { Colors } from "../../../assets/colors";
import { Link } from "react-router-dom";


const WrapperButtonOptions = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px 16px 0 16px;
    background: ${Colors.gray3};
`;

const ButtonOptions = styled(Link)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid ${Colors.white};
        border-radius: 8px;
        padding: 16px;
        margin: 8px 0;
        height: 49px;
        text-decoration: none;
        color: ${Colors.white};
        font-weight: 300;

        :hover {
            border-color: ${Colors.red_light};
        }
        
        div {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .textBtn {
            padding: 4px 8px 4px 8px;
            border-radius: 8px;
            font-size: 10px;
            background-color: ${Colors.red_light};
        }
`;

export { WrapperButtonOptions, ButtonOptions };