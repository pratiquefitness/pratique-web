import React, { useState } from "react";
import {
  Container,
  WrapperControlPanel,
  ControlPanel,
  WrapperButton,
} from "./style";

import Title from "../../layout/Title";
import HeaderBar from "../../layout/HeaderBar";
import LinkButton from "../../form/LinkButton";
import FitDayButtons from "../../layout/FitDay/FitDayButtons";
import FitDaySliders from "../../layout/FitDay/FitDaySliders";
import { useNavigate } from "react-router-dom";
import FitdayAPI from "../../../api/services/FitDay";

function FitDay() {
  const [params, setParams] = useState([]);
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(true);

  const handleValueChange = (slider, value) => {
    let temp = params;
    temp[slider] = value;
    setParams(temp);
    // setParams([...params, { [slider]: value }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await FitdayAPI.salvar(params).then((res) => navigate("/recommendations"));
  };

  return (
    <Container>
      <WrapperControlPanel>
        <ControlPanel>
          <HeaderBar to="/" text="FitDay" />
          <FitDayButtons select={handleValueChange} />
          <FitDaySliders select={handleValueChange} />
          <WrapperButton>
            <LinkButton
              style={{ backgroundColor: "red" }}
              text="Próximo"
              onClick={handleSubmit}
            />
          </WrapperButton>
        </ControlPanel>
      </WrapperControlPanel>
    </Container>
  );
}

export default FitDay;
