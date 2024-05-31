import { buscarAlunosPersonal, personalAlunoServico, updateConta, setEmailAluno } from '@/redux/actions/conta'
import { Button, Flex, Form, Input, Dropdown, MenuProps, Modal } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import { List, Typography } from 'antd'
import { Loading } from '@/components'
import { useRouter } from 'next/router'
const {confirm} = Modal;
const { Text } = Typography

export default function Dados() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { usuario } = useSelector(state => state.login)
  const { alunosPersonal, vincularAluno, loadingAlunosPersonal } = useSelector(state => state.conta)
  const router = useRouter();

  const onSearch = values => {
    if (!checkEmail(values)) {
      return false
    }
    dispatch(
      buscarAlunosPersonal(values)
    )
  }

  const checkEmail = (email) => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return pattern.test(email)
  }

  const checkAlunoVinculado = () => {
    if(!Object.keys(vincularAluno).length) return true;
    const temVinculo =  alunosPersonal.filter(
      (aluno, index) => parseInt(aluno.id_personal) === parseInt(vincularAluno.personal));

    return temVinculo.length > 0;
  }

  const actionPersonalAluno = (id, aluno, verVinculo) => {
    const desvincular = () => {
      confirm({
        title: `Deseja desvincular ${aluno.email}`,
        icon: <ExclamationCircleFilled />,
        content: 'Após esta ação, você não será personal deste aluno.',
        okButtonProps: {
          style: { backgroundColor: 'red' }
        },
        okText: 'Desvincular',
        onOk() {
          dispatch(personalAlunoServico(id, verVinculo))
        },
        onCancel() {
        }
      })
    }

    if (verVinculo) {
      desvincular();
      form.resetFields();
      return false;
    }
    dispatch(personalAlunoServico(id, verVinculo))
    form.resetFields();
  }

  const DropDownComponet = ({ aluno }) => {
    const verVinculo = checkAlunoVinculado();
    const id = undefined === aluno.ID ? aluno.id : aluno.ID
    const items = [
      {
        key: '1',
        label: (
          <Text
            onClick={() => {
              actionPersonalAluno(id, aluno, verVinculo)
            }}
            type={verVinculo ? `danger` : `success`}>
            {verVinculo ? `[Desvincular]` : `[Vincular]`}
          </Text>
        )
      }
    ]
    return (
      <Dropdown
        size={'small'}
        menu={{
          items
        }}
        placement="topRight"
        arrow={{
          pointAtCenter: true
        }}
      >
        <Button>...</Button>
      </Dropdown>)
  }

  return (
    <Loading spinning={loadingAlunosPersonal}>
      <>
        <Form layout="vertical" form={form}>
          <Form.Item label="" name="email">
            <Input onChange={(e) => {
              onSearch(e.target.value)
            }} size="large" placeholder="Busque o aluno pelo e-mail" prefix={<SearchOutlined />} />
          </Form.Item>
        </Form>
        <div className={'align-center mt-6'}>
          <List
            size={'small'}
            bordered
            dataSource={Object.keys(vincularAluno).length > 0 ? [vincularAluno] : alunosPersonal}
            renderItem={(item) => (
              <List.Item>
                <Flex style={{ width: '100%' }} align="flex-center" justify={'space-start'}>
                  <Flex style={{ width: '100%' }} align="flex-center" justify={'space-start'}>
                    {
                      checkAlunoVinculado() &&
                      <Button
                        type={'primary'}
                        style={{ backgroundColor: '#1ABF63' }}
                        size={'small'}
                        onClick={() => {
                          router.push({
                            pathname: '/treino_alunos_personal',
                            query: { email: item.email, userId: item.id || item.ID }
                          }, '/treino_alunos_personal')
                        }}
                      >
                        Acessar
                      </Button>
                    }
                    <Text className={'ml-5'}>{item.email}</Text>
                  </Flex>
                  <DropDownComponet aluno={item} />
                </Flex>
              </List.Item>
            )}
          />
        </div>
      </>
    </Loading>
  )
}
