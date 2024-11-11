import React, { useEffect, useState } from 'react'
import {
  personalDesvincularServico,
  getPersonal
} from '@/redux/actions/conta'
import { Button, Flex, Form, Input, Dropdown, MenuProps, Modal, AutoComplete, Empty } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import { List, Typography } from 'antd'
import { Loading } from '@/components'

const { confirm } = Modal
const { Text } = Typography

export default function Personal() {
  const dispatch = useDispatch();
  const { loadingPersonal, meuPersonal } = useSelector(state => state.conta);
  const { usuario } = useSelector(state => state.login);

  useEffect(() => {
    if(!usuario.personal?.length) return;
    dispatch(getPersonal(usuario.personal));
  }, []);

  const actionDesvincularPersonal = (personal) => {
    confirm({
      title: `Deseja desvincular ${personal.user_email}`,
      icon: <ExclamationCircleFilled />,
      content: 'Após esta ação, você não terá um personal.',
      okButtonProps: {
        style: { backgroundColor: 'red' }
      },
      okText: 'Desvincular',
      onOk() {
        dispatch(personalDesvincularServico())
      },
      onCancel() {
      }
    })
  }

  const DropDownComponet = ({ personal }) => {
    const items = [
      {
        key: '1',
        label: (
          <Text
            onClick={() => {
              actionDesvincularPersonal(personal)
            }}
            type={`danger`}>
            {`[Desvincular]`}
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
    <Loading spinning={loadingPersonal}>
      <>
        <div className={'align-center mt-6'}>
          <List
            size={'small'}
            bordered
            dataSource={meuPersonal}
            renderItem={(item) => (
              <List.Item>
                <Flex style={{ width: '100%' }} align="flex-start" justify={'space-between'}>
                  <Text>{item.user_email}</Text>
                  <DropDownComponet personal={item} />
                </Flex>
              </List.Item>
            )}
          />
        </div>
      </>
    </Loading>
  )
}
