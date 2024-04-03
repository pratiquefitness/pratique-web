import Image from 'next/image'
import {Typography} from 'antd'
const { Text } = Typography;

const IconPlay = ({
  width = 22,
  height = 22
}) => {
  return (
    <>
      <Image src="/no-data-removebg-preview.png" alt="Descrição da imagem" width={width} height={height} style={{
        verticalAlign: 'middle',
      }} />
    </>
  )
}

export default IconPlay
