import { theme as antheme } from 'antd'

const theme = {
  algorithm: {
    light: antheme.defaultAlgorithm,
    dark: antheme.darkAlgorithm
  },
  colorPrimary: {
    red: '#ed143d',
    green: '#acc571',
    gold: '#A2722A',
    dark: '#ed143d'
  },
  logo: {
    red: '/logo-min.svg',
    green: '/logo-nutri-min.svg',
    gold: '/logo-prime-min.svg',
    dark: '/logo-min.svg'
  },
  colorBgBase: {
    dark: '#1a1a1a',
    light: '#fff'
  }
}

export const getTheme = (themeColor, themeMode) => {
  return {
    algorithm: theme.algorithm[themeMode],
    token: {
      colorPrimary: theme.colorPrimary[themeColor],
      colorBgBase: theme.colorBgBase[themeMode],
      controlHeight: 50,
      controlHeightSM: 30
    },
    logo: theme.logo[themeColor]
  }
}

export default theme
