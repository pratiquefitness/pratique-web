import React, { useState } from "react";
import {
  HeaderContainer,
  LeftColumnHeader,
  RightColumnContainer,
  Button,
} from "./style";
import Halter from "../../assets/icones/header/halter.svg";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/index";

function Header() {
  const auth = useAuth();

  const [userName, setUserName] = useState("");

  const getTime = () => {
    const hour = new Date().getHours();
    if (hour >= 6) {
      if (hour <= 12) {
        return "Bom dia,";
      }
      if (hour <= 18) {
        return "Boa tarde,";
      }
      return "Boa noite,";
    }
    return "Boa noite";
  };

  useEffect(() => {
    getTime();
    setUserName(auth.currentUser.nome);
  }, []);

  return (
    <HeaderContainer>
      <LeftColumnHeader>
        <p>{getTime()}</p>
        <p>{userName}</p>
      </LeftColumnHeader>
      <RightColumnContainer>
        <Button to="/fitday">
          <img src={Halter} alt="" />
          <p>Iniciar FitDay</p>
        </Button>
      </RightColumnContainer>
    </HeaderContainer>
  );
}

export default Header;
