import React from 'react';
import { Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
const {Text} = Typography;

const MiniCurriculum = () => {
  const { usuario } = useSelector(state => state.login)
  return (
    <div className="text-left">
      <Space direction={'vertical'}>
        <Text>
          {usuario.curriculo}
        </Text>
      </Space>
    </div>
  )
}

export default MiniCurriculum;