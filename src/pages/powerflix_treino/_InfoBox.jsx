import { theme } from 'antd'

export default function InfoBox({ title, icon }) {
  const { token } = theme.useToken()
  return (
    <div
      style={{
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        background: '#756483',
      }}
      className="d-flex flex-column align-center justify-center mb-3 py-3 gap-2 text-white"
    >
      <>{icon}</>
      <div style={{ fontSize: 12, lineHeight: '15px', textAlign: 'center', verticalAlign: 'middle' }}>{title}</div>
    </div>
  )
}
