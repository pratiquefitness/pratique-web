import { theme as antheme } from 'antd'

const theme = {
  algorithm: {
    light: antheme.defaultAlgorithm,
    dark: antheme.darkAlgorithm
  },
  colorPrimary: {
    red: '#ed143d',
    green: '#acc571',
    gold: '#A2722A'
  }
}

export const getTheme = (color, mode = 'light') => {
  return {
    algorithm: theme.algorithm[mode],
    token: {
      colorPrimary: theme.colorPrimary[color],
      colorFillAlter: theme.colorPrimary[color],
      controlHeight: 50,
      controlHeightSM: 30
    }
  }
}

export default theme
