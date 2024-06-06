import React, { useEffect, useState } from 'react'
import {
  personalAlunoServico,
  buscarAlunosSemPersonal
} from '@/redux/actions/conta'
import { Button, Flex, Form, Input, Dropdown, MenuProps, Modal, AutoComplete, Empty } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import { List, Typography } from 'antd'
import { Loading } from '@/components'
import { useRouter } from 'next/router'
import { setVincularAluno } from '@/redux/slices/conta'

const { confirm } = Modal
const { Text } = Typography

export default function Alunos() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { usuario } = useSelector(state => state.login)
  const { alunosPersonal, vincularAluno, loadingAlunosPersonal } = useSelector(state => state.conta)
  const router = useRouter()
  const [value, setValue] = useState({
    busca: ''
  })
  const [options, setOptions] = useState({
    data: []
  })

  const [emailEscolhido, setEmailEscolhido] = useState([])

  useEffect(() => {
    if (vincularAluno.length) {
      setOptions(prevState => ({
        ...prevState,
        data: vincularAluno.reduce((o, option) => {
          return [...o, { value: option.user_email }]
        }, [])
      }))
    }
  }, [vincularAluno])

  useEffect(() => {
    if (!value.busca.length) {
      dispatch(setVincularAluno([]))
      setOptions(prevState => ({
        ...prevState,
        data: []
      }))
    }
  }, [value])

  const onSearch = values => {
    if (values.length < 6) {
      return false
    }
    if (!vincularAluno.length) {
      dispatch(
        buscarAlunosSemPersonal(values)
      )
    }
  }

  const onSelect = value => {
    setEmailEscolhido(
      vincularAluno.filter((aluno) => aluno.user_email === value)
    )
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

    const resetState = () => {
      setValue(prevState => ({
        ...prevState,
        busca: ''
      }));
      dispatch(setVincularAluno([]))
      setEmailEscolhido([])
    }

    if (verVinculo) {
      desvincular();
      form.resetFields();
      resetState();
      return false;
    }
    dispatch(personalAlunoServico(id, verVinculo))
    form.resetFields();
    resetState();
  }

  const DropDownComponet = ({ aluno, vinculo }) => {
    const id = undefined === aluno.ID ? aluno.id : aluno.ID
    const items = [
      {
        key: '1',
        label: (
          <Text
            onClick={() => {
              actionPersonalAluno(id, aluno, vinculo)
            }}
            type={vinculo ? `danger` : `success`}>
            {vinculo ? `[Desvincular]` : `[Vincular]`}
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
            <AutoComplete
              id={'email'}
              value={value.busca}
              options={options.data}
              style={{
                width: '100%'
              }}
              onSelect={(e) => onSelect(e)}
              onSearch={onSearch}
              onChange={(value) => setValue(prevState => ({
                ...prevState,
                busca: value
              }))}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              placeholder="Pesquise o email do aluno"
              allowClear
              defaultOpen
              autoFocus
              onClear={() => {
                setEmailEscolhido([])
                dispatch(setVincularAluno([]))
                setOptions(prevState => ({
                  ...prevState,
                  data: []
                }))
              }}
            />
          </Form.Item>
        </Form>
        {
          !!emailEscolhido.length &&
            <div className={'align-center mt-6'}>
              <List
                size={'small'}
                bordered
                dataSource={emailEscolhido}
                renderItem={(item) => (
                  <List.Item>
                    <Flex style={{ width: '100%' }} align="flex-start" justify={'space-between'}>
                      <Text>{item.user_email}</Text>
                      <DropDownComponet aluno={item} vinculo={false} />
                    </Flex>
                  </List.Item>
                )}
              />
            </div>
        }

        <div className={'align-center mt-6'}>
          <List
            size={'small'}
            bordered
            dataSource={alunosPersonal}
            renderItem={(item) => (
              <List.Item>
                <Flex style={{ width: '100%' }} align="flex-center" justify={'space-start'}>
                  <Flex style={{ width: '100%' }} align="flex-center" justify={'space-start'}>
                    <Button
                      type={'primary'}
                      style={{ backgroundColor: '#1ABF63' }}
                      size={'small'}
                      onClick={() => {
                        router.push({
                          pathname: '/treino_alunos_personal',
                          query: { email: item.email || item.user_email, userId: item.id || item.ID }
                        }, '/treino_alunos_personal')
                      }}
                    >
                      Acessar
                    </Button>
                    <Text className={'ml-5'}>{item.email}</Text>
                  </Flex>
                  <DropDownComponet aluno={item} vinculo={true} />
                </Flex>
              </List.Item>
            )}
          />
        </div>
      </>
    </Loading>
  )
}
