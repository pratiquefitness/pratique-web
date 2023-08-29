import { createContext, useEffect } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { setLogin, unsetLogin, setLoading } from '@/redux/slices/login'
import { setTheme, signInRequest, signInVerify } from '@/redux/actions/login'
import { tokenName } from '@/configs/global'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import utils from '@/utils'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    checkCookie()
  }, [])

  function checkCookieOfWebView(event) {
    if (utils.isInWebView()) {
      if (typeof window !== 'undefined') {
        const data = JSON.parse(event.data)
        alert(JSON.stringify(event.data))
        if (data.type === 'IOS_LOGIN_COOKIE') {
          setCookieToken(data.message)
        }
      }
    }
  }

  function setCookieInWebView() {
    if (utils.isInWebView()) {
      if (typeof window !== 'undefined') {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'IOS_LOGIN_POST',
            message: login.ID
          })
        )
      }
    }
  }

  function clearCookieInWebView() {
    if (utils.isInWebView()) {
      if (typeof window !== 'undefined') {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'IOS_LOGIN_CLEAR'
          })
        )
      }
    }
  }

  async function signIn({ email, senha }) {
    dispatch(setLoading(true))
    const login = await signInRequest(email, senha)
    if (login?.ID) {
      setCookie(undefined, tokenName, login.ID)
      setCookieInWebView()
      dispatch(setLogin(login))
      dispatch(setTheme(login.plano))
      router.push('/')
      dispatch(setLoading(false))
      return true
    } else {
      dispatch(setLoading(false))
      return false
    }
  }

  async function setCookieToken(token) {
    if (token) {
      dispatch(setLoading(true))
      const login = await signInVerify(token)
      if (login) {
        dispatch(setLogin(login))
        dispatch(setTheme(login.plano))
      } else {
        destroyCookie(undefined, tokenName)
        dispatch(setLoading(false))
      }
    }
  }

  async function checkCookie() {
    const { [tokenName]: token } = parseCookies()
    await setCookieToken(token)
  }

  function signOut() {
    clearCookieInWebView()
    dispatch(unsetLogin())
    destroyCookie(undefined, tokenName)
    router.push('/')
  }

  return <AuthContext.Provider value={{ signIn, signOut, checkCookieOfWebView }}>{children}</AuthContext.Provider>
}
