import React from "react";
import {
  ContainerLogin,
  WrapperControlPanel,
  ControlPanel,
  Image,
  LinkForgotPassword,
} from "./style";

import Input, { PasswordInput } from "../../form/Input/Input";
import LinkButton from "../../form/LinkButton";
import Logo from "../../assets/image/logo.png";
import Background from "../../assets/image/background.png";

import { useAuth } from "../../../hooks";

function Home() {
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await auth.login(e.target.email.value, e.target.password.value);
    if (res === false) {
      window.alert("Credenciais de login inválidas!");
    }
  };

  return (
    <ContainerLogin onSubmit={handleSubmit}>
      <WrapperControlPanel
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ControlPanel>
          <Image>
            <img src={Logo} alt="" />
          </Image>
          <div>
            <Input
              name="email"
              type="email"
              placeholder="E-mail ou CPF"
              required
            />
            <PasswordInput
              name="password"
              placeholder="Senha de acesso"
              required
            />
            <LinkForgotPassword to="#">
              <p>Esqueci a senha</p>
            </LinkForgotPassword>
            <LinkButton to="/" type="submit" text="Entrar" />
            <p className="textEnd">
              Ao clicar em ENTRAR você concorda com os nossos termos
            </p>
          </div>
        </ControlPanel>
      </WrapperControlPanel>
    </ContainerLogin>
  );
}

export default Home;
