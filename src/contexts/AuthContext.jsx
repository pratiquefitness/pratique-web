import { createContext, useEffect } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { setLogin, unsetLogin, setLoading } from '@/redux/slices/login'
import { signInRequest, signInVerify } from '@/redux/actions/login'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

export const tokenName = 'pratiqueemcasa.token'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    //signOut()
    const { [tokenName]: token } = parseCookies()
    if (token) {
      dispatch(setLoading(true))
      //const login = await signInVerify(token)
      const login = true
      if (login) {
        const { usuario } = login
        dispatch(setLogin(usuario))
      } else {
        destroyCookie(undefined, tokenName)
        dispatch(setLoading(false))
      }
    }
  }, [])

  async function signIn({ email, senha }) {
    dispatch(setLoading(true))
    const login = await signInRequest(email, senha)

    if (login?.ID) {
      const token = login.ID

      setCookie(undefined, tokenName, token, {
        expires: new Date()
      })

      dispatch(setLogin(login))

      router.push('/')
      dispatch(setLoading(false))
      return true
    } else {
      dispatch(setLoading(false))
      return false
    }
  }

  function signOut() {
    dispatch(unsetLogin())
    destroyCookie(undefined, tokenName)
    router.push('/')
  }

  return <AuthContext.Provider value={{ signIn, signOut }}>{children}</AuthContext.Provider>
}
