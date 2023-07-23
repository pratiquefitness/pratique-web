import { getTheme } from '@/configs/theme'
import { Collapse as AntdCollapse } from 'antd'
import { styled } from 'styled-components'

const { Panel: AntdPanel } = AntdCollapse

const { token } = getTheme()

export const CollapseStyled = styled(AntdCollapse)`
  .ant-collapse-header svg {
    fill: #fff;
  }
  .ant-collapse-header-text {
    color: #fff;
  }
`
export const PanelStyled = AntdPanel
