import { HeaderContainer } from './style';
import { Link } from 'react-router-dom';

import BackArrow from '../../assets/icones/headerBar/back-arrow.svg';
import Close from '../../assets/icones/headerBar/close.svg';

function HeaderBar({ text, to }) {
    return (
        <HeaderContainer>
            <div>
                <Link to={to}>
                    <img src={BackArrow} alt="" />
                </Link>
                <p>{text}</p>   
            </div>
            <Link to={to}>
                <img src={Close} alt="" />
            </Link>
        </HeaderContainer>
    )
}

export default HeaderBar;