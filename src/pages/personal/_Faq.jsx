import { Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'

const { Panel } = Collapse

const faqData = [
  {
    question: 'Eu pago algum valor para fazer a SUPER BIO de clientes que não são alunos da PRATIQUE?',
    answer:
      'Não, você fazendo parte do clube do personal e se validando no treinamento da SUPERBIO todos os seus alunos de personal, independentemente se for da PRATIQUE ou não, podem fazer a SUPERBIO com você.'
  },
  {
    question:
      'Existirá algum valor adicional para ter acesso ao SUPER APP da PRATIQUE para montagem de gestão de carteira dos meus clientes de PERSONAL?',
    answer:
      'Não, a sua assinatura do clube do personal com todos os benefícios que você possui, incluem também o SUPER APP, incrível né!'
  },
  {
    question:
      'No INSTITUTO EU TE QUERO BEM eu posso colocar apenas se a pessoa for PARENTE ou pode ser um amigo ou algum aluno meu de PERSONAL?',
    answer:
      'Você poderá colocar uma pessoa para treinar sem custo, mesmo não sendo sua parente. Apenas lembre que esta é uma ação social, pro-bono, onde o intuito é trazer alguém SEDENTÁRIO ou com alguma COMORBIDADE, desta forma, fará sentido ao projeto IETQB (INSTITUTO EU TE QUERO BEM).'
  },
  {
    question: 'Como faço para solicitar minhas camisas de PERSONAL?',
    answer:
      'Basta se dirigir à recepção da unidade para validação e liberação da mesma, lembre-se que para ter direito você precisa estar em dia com a sua assinatura do CLUBE PERSONAL.\n\n1ª camisa - no ato da sua assinatura\n2ª camisa - após 3 pagamentos da sua assinatura\n3ª camisa - após 6 pagamentos da sua assinatura\n4ª camisa - após 12 pagamentos da sua assinatura\n\nApós o primeiro ano você poderá retirar 1 camisa a cada 6 meses de pagamentos, totalizando 2 por ano.'
  }
]

export default function FAQ() {
  const panelStyle = {
    backgroundColor: 'rgb(237, 20, 61)',
    color: 'white',
    border: 'none',
    marginBottom: '8px'
  }

  const headerStyle = {
    color: 'white'
  }

  const customExpandIcon = ({ isActive }) => (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ color: '#bc0e2f' }} />
    </div>
  )

  return (
    <Collapse accordion expandIcon={customExpandIcon}>
      {faqData.map((item, index) => (
        <Panel header={<span style={headerStyle}>{item.question}</span>} key={index} style={panelStyle}>
          <p>{item.answer}</p>
        </Panel>
      ))}
    </Collapse>
  )
}
