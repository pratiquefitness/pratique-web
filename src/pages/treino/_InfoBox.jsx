import { theme } from 'antd'

export default function InfoBox({ title, icon }) {
  const { token } = theme.useToken()
  return (
    <div
      style={{
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        color: 'white',
        textAlign: 'center',
        padding: 10,
        height: 54,
        marginBottom: 12,
        background: '#756483'
      }}
    >
      {icon}
      <br />
      <div style={{ fontSize: 8, lineHeight: '10px', height: 30 }}>{title}</div>
    </div>
  )
}
