import React from 'react';
import { Space, Typography } from 'antd'
const {Text} = Typography;

const MiniCurriculum = ({props}) => {
  return (
    <div className="text-left">
      <Space direction={'vertical'}>
        <Text>
          {props}
        </Text>
      </Space>
    </div>
  )
}

export default MiniCurriculum;