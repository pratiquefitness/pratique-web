import React, { createContext, useEffect, useState } from "react";
import Usuarios from "../api/services/Usuarios";
import { api } from "../api/api";
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const logout = () => {
    setCurrentUser();
  };

  const login = async (email, password) => {
    const res = await Usuarios.login(email, password);
    if (res.tipo === "sucesso") {
      localStorage.setItem("@App:user", JSON.stringify(res.resposta));
      localStorage.setItem("@App:token", JSON.stringify(res.resposta.token));
      setCurrentUser(res.resposta);
      api.defaults.headers.Authorization = `Bearer ${res.resposta.token}`;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const storageUser = localStorage.getItem("@App:user");
    const storageToken = localStorage.getItem("@App:token");
    if (storageUser && storageUser) {
      setCurrentUser(JSON.parse(storageUser));
      api.defaults.headers.Authorization = `Bearer ${storageToken}`;
    }
    // setCurrentUser({ nome: "Adelmo", status: 1 });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(currentUser),
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
