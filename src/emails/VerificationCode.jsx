import { Html } from '@react-email/html'
import { Text } from '@react-email/text'
import { Section } from '@react-email/section'
import { Container } from '@react-email/container'

export default function EmailVerificationCode(name = 'Aluno', code = '000000') {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Olá {name}!</Text>
          <Text style={paragraph}>Seu código de verificação para alterar sua senha é:</Text>
          <Text style={verification}>{code}</Text>
        </Container>
      </Section>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff'
}

const container = {
  margin: '0 auto',
  padding: '20px'
}

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#000',
  textAlign: 'center'
}

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#000',
  textAlign: 'center'
}

const verification = {
  fontSize: '22px',
  color: '#000',
  textAlign: 'center'
}
