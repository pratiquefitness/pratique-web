import { buscarAlunosPersonal, updateConta } from '@/redux/actions/conta'
import { Button, Flex, Form, Input, Dropdown, MenuProps } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import { List, Typography } from 'antd'
import { Loading } from '@/components'
const { Text } = Typography;

export default function Dados() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { usuario } = useSelector(state => state.login)
  const { alunosPersonal, vincularAluno, loadingAlunosPersonal } = useSelector(state => state.conta)

  const checkEmail = (email) => {
    let pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
  }

  const checkAlunoVinculado = () => {

  }

  console.log(vincularAluno)

  const onSearch = values => {
    if (!checkEmail(values)) {
      return false
    }
    dispatch(
      buscarAlunosPersonal(values)
    )
  }

  const deleteTreino = (id_ficha, id_user) => {
    confirm({
      title: 'Deseja excluir este treino?',
      icon: <ExclamationCircleFilled/>,
      content: 'Esta ação excluirá permanentemente o seu treino.',
      okButtonProps: {
        style: { backgroundColor: 'red' }
      },
      okText: 'Deletar',
      onOk() {
        dispatch(deleteTreinoLivre(id_ficha, id_user));
      },
      onCancel() {},
    });
  }

  const DropDownComponet = () => {
    const items = [
      {
        key: '1',
        label: (
          <Text
            onClick={() => {
              //deleteTreino(opcoes.id_ficha, opcoes.id_user)
            }}
            type="danger">[Desvincular]
          </Text>
        ),
      },
    ]
    return (
      <Dropdown
        size={'small'}
        menu={{
          items
        }}
        placement="topRight"
        arrow={{
          pointAtCenter: true,
        }}
      >
        <Button>...</Button>
      </Dropdown>)
  }

  const onMenuClick = (e) => {
    console.log('click', e)
  }

  return (
    <Loading spinning={loadingAlunosPersonal}>
    <>
      <Form layout="vertical" form={form}>
        <Form.Item label="" name="email">
          <Input onChange={(e) => {onSearch(e.target.value)}} size="large" placeholder="Busque o aluno pelo e-mail" prefix={<SearchOutlined />} />
        </Form.Item>
      </Form>
      <div className={'align-center mt-6'}>
        <List
          size={'small'}
          bordered
          dataSource={vincularAluno.length > 0 ? vincularAluno : alunosPersonal}
          renderItem={(item) => (
            <List.Item>
              <Flex style={{width: '100%'}} align="flex-center" justify={'space-start'}>
                <Flex style={{width: '100%'}} align="flex-center" justify={'space-start'}>
                  <Button type={'primary'} style={{backgroundColor: '#1ABF63'}} size={'small'}>Acessar</Button>
                  <Text className={'ml-5'}>{item.email}</Text>
                </Flex>
                <DropDownComponet />
              </Flex>
            </List.Item>
          )}
        />
      </div>
    </>
    </Loading>
  )
}
