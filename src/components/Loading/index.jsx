import { Spin } from 'antd'

export default function Loading({ spinning, children }) {
  return spinning ? (
    <div className="w-100 p-10 text-center">
      <Spin spinning={true} />
    </div>
  ) : (
    children
  )
}
