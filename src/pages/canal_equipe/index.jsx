import Loading from '@/components/Loading'
import { getCis } from '@/redux/actions/cis'
import { getPonto, setPonto } from '@/redux/actions/ponto'
import { Button, Card, Space, Table, Typography } from 'antd'
import { useEffect } from 'react'
import { LuMegaphone } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

const ButtonCI = (
  <Button type="primary" shape="round" size="small" block>
    Ir para C.I
  </Button>
)

export default function CanalEquipe() {
  const disptach = useDispatch()
  const { data: dataCis, loading: loadingCis } = useSelector(state => state.cis)
  const { data: ponto, loading: loadingPonto } = useSelector(state => state.ponto)
  const { usuario } = useSelector(state => state.login)

  const insertPonto = () => {
    disptach(setPonto())
  }

  const refreshCI = () => {
    disptach(getCis())
  }

  useEffect(() => {
    disptach(getPonto())
    disptach(getCis())
  }, [])

  return (
    <Loading spinning={loadingCis}>
      <Space direction="vertical" size={16} className="w-100">
        {dataCis.disponiveis.length ? (
          dataCis.disponiveis.map(ci => (
            <Card
              title={ci.post_title}
              extra={
                <a
                  href={`https://pratiqueemcasa.com.br/pratique-em-casa/powergym/verifica.php?email=${usuario.user_email}&nome=teste&url=https://www.metodologiapowergym.com.br/novo/courses/${ci.post_name}`}
                  target="_blank"
                >
                  {ButtonCI}
                </a>
              }
            >
              <p>{ci.post_excerpt ? ci.post_excerpt : 'Sem descrição'}</p>
            </Card>
          ))
        ) : (
          <div className="text-center p-4">
            <Typography.Title level={5}>Nenhuma C.I</Typography.Title>
          </div>
        )}
        {!!dataCis.disponiveis.length && (
          <Button type="primary" onClick={refreshCI} loading={loadingCis} block>
            Atualizar
          </Button>
        )}

        <Button
          type="primary"
          style={ponto.length ? { background: '#b7eb8f' } : {}}
          disabled={!!dataCis.disponiveis.length || ponto.length}
          onClick={insertPonto}
          loading={loadingPonto}
          block
        >
          {ponto.length ? 'Ponto Registrado' : 'Ponto Digital'}
        </Button>

        <a href="https://grupopratique.typeform.com/to/WZUsTlXl" target="_blank">
          <Button icon={<LuMegaphone />} block>
            Fale com o Papai
          </Button>
        </a>
        <Typography.Title level={3}>C.Is Anteriores</Typography.Title>
        <Table
          dataSource={dataCis.anteriores}
          loading={loadingCis}
          columns={[
            {
              title: 'Nome',
              dataIndex: 'post_title',
              key: 'post_title'
            },
            {
              title: '',
              dataIndex: 'post_title',
              key: 'ci',
              render: (_, record) => (
                <a
                  href={`https://pratiqueemcasa.com.br/pratique-em-casa/powergym/verifica.php?email=${usuario.user_email}&nome=teste&url=https://www.metodologiapowergym.com.br/novo/courses/${record.post_name}`}
                  target="_blank"
                >
                  <Button shape="round" size="small" block>
                    Ir para C.I
                  </Button>
                </a>
              )
            }
          ]}
        />
      </Space>
    </Loading>
  )
}
