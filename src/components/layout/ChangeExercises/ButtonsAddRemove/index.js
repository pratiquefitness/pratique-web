import { Colors } from '../../../assets/colors';
import AddIcon from '../../../assets/icones/workout/+.png';
import RemoveIcon from '../../../assets/icones/workout/-.png';

import { ContainerButtons, WrapperButtons, Button } from './style';

function ButtonsAddRemove() {
    return (
        <ContainerButtons>
            <WrapperButtons>
                <Button>
                    <img src={AddIcon} alt="" />
                </Button>
            </WrapperButtons>
            <WrapperButtons style={{ backgroundColor: Colors.red_light }}>
                <Button>
                    <img src={RemoveIcon} alt="" />
                </Button>
            </WrapperButtons>
        </ContainerButtons>
    )
}

export default ButtonsAddRemove;