import { Spin, Typography } from 'antd';

export default function Loading({ spinning, children }) {
  return spinning ? (
    <div className="w-100 p-10 text-center">
      <Spin spinning={true} />
       <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
        Carregando...
      </Typography.Title>
    </div>
  ) : (
    children
  )
}
