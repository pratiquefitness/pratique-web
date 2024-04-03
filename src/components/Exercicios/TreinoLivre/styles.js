import {getTheme} from '@/configs/theme'
import {Checkbox} from 'antd'
import {styled} from 'styled-components'
const backgroundColor = '#018000';

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${backgroundColor};
  }
}`
export default CustomCheckbox;
