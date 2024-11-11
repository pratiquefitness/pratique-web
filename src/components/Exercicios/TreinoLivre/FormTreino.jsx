import { Form, Input, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAlunosPersonal } from '@/redux/actions/conta'
import { Loading } from '@/components'

const { Text } = Typography

const FormTreino = ({
  onSetNomeTreino = () => {},
  onSetIdAluno = () => {},
  nome,
  treinoPersonal,
  id_user = ''
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm()
  const [nomeTreino, setNomeTreino] = useState('')
  const [idUser, setIdUser] = useState('')
  const { usuario } = useSelector(state => state.login)
  const { alunosPersonal, loadingIsPersonal } = useSelector(state => state.conta)

  useEffect(() => {
    dispatch(getAlunosPersonal())
  }, []);

  useEffect(() => {
    form.validateFields(['nome_treino'])
  }, [nomeTreino])

  useEffect(() => {
    form.validateFields(['id_user'])
  }, [idUser])

  useEffect(() => {
    if (nome === '') {
      setNomeTreino('')
      onSetNomeTreino('')
      form.resetFields(['nome_treino'])
    }
  }, [nome])

  const onChange = (e) => {
    setNomeTreino(e.target.value)
    onSetNomeTreino(e.target.value)
  }

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const onSearch = (value) => {
    onSetIdAluno(value)
  }

  const selectedValue = alunosPersonal.find((aluno) => {
    return aluno.id === parseInt(id_user)
  })

  return (
    <>
      <Loading spinning={loadingIsPersonal}>
        <Text>Dê um nome a este programa de treino:</Text>
        <Form
          style={{ marginTop: '10' }}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="" name="nome_treino" rules={[
            {
              max: 20,
              message: 'Máximo 20 caracteres!'
            }
          ]}>
            <Input defaultValue={nome || ''} onChange={onChange} autoFocus />
          </Form.Item>
          {
            (usuario.professor === 1 || usuario.plano?.includes('PERSONAL TRAINER')) && treinoPersonal &&
            <Form.Item label="Selecione um aluno" name="id_user" rules={[
              {
                required: true,
                message: 'Selecione um aluno'
              }
            ]}>
              <Select
                showSearch
                placeholder="Selecione um aluno"
                optionFilterProp="children"
                onChange={onSearch}
                defaultValue={selectedValue.id}
                filterOption={filterOption}
                options={alunosPersonal.map((alunos) => {
                  return {
                    value: alunos.id,
                    label: alunos.nome
                  }
                })}
              />
            </Form.Item>
          }
        </Form>
      </Loading>
    </>
  )
}

export default FormTreino
