import { theme as antheme } from 'antd'
import store from '@/redux/store'

const theme = {
  algorithm: {
    light: antheme.defaultAlgorithm,
    dark: antheme.darkAlgorithm
  },
  colorPrimary: {
    red: '#ed143d',
    green: '#acc571',
    gold: '#A2722A'
  },
  logo: {
    red: '/logo-min.svg',
    green: '/logo-nutri-min.svg',
    gold: '/logo-prime-min.svg'
  }
}

export const getTheme = () => {
  const mode = 'light'
  const { themeMode } = store.getState().global
  return {
    algorithm: theme.algorithm[mode],
    token: {
      colorPrimary: theme.colorPrimary[themeMode],
      colorFillAlter: theme.colorPrimary[themeMode],
      controlHeight: 50,
      controlHeightSM: 30
    },
    logo: theme.logo[themeMode]
  }
}

export default theme
