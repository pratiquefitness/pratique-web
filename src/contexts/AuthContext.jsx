import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { setLogin, unsetLogin, setLoading } from "@/redux/slices/login";
import { setTheme, signInRequest, signInVerify } from "@/redux/actions/login";
import { tokenName } from "@/configs/global";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null); // Adicionar estado do usuário

  useEffect(() => {
    checkCookie();
  }, []);

  async function signIn({ email, senha }) {
    dispatch(setLoading(true));
    const response = await signInRequest(email, senha);
    dispatch(setLoading(false));

    if (response?.ID) {
      setCookie(undefined, tokenName, response.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/"
      });
      dispatch(setLogin(response));
      dispatch(setTheme(response.plano));
      setUser(response); // Armazenar o usuário no estado
      router.push("/");
      return true;
    } else {
      return false;
    }
  }

  async function setCookieToken(token) {
    if (token) {
      dispatch(setLoading(true));
      const login = await signInVerify(token);
      if (login) {
        dispatch(setLogin(login));
        dispatch(setTheme(login.plano));
        setUser(login); // Armazenar o usuário no estado
      } else {
        destroyCookie(undefined, tokenName);
        dispatch(setLoading(false));
      }
    }
  }

  async function checkCookie() {
    const { [tokenName]: token } = parseCookies();
    await setCookieToken(token);
  }

  function signOut() {
    dispatch(unsetLogin());
    destroyCookie(undefined, tokenName);
    setUser(null); // Limpar o estado do usuário
    router.push("/");
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}
