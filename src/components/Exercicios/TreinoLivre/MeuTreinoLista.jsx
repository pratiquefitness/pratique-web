import {Button, Divider, Dropdown, Flex, List, Typography, Modal, Space} from "antd";
const {Text, Title} = Typography;
import {format} from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import {useDispatch} from "react-redux";
import {deleteTreinoLivre} from "@/redux/actions/exercicios";
import {ExclamationCircleFilled} from "@ant-design/icons";
const {confirm} = Modal;
import {useRouter} from 'next/router';

const MeuTreinoLista = ({
 treinoLivre,
 verMeusTreinos = () => {}
}) => {
  const dispatch = useDispatch();
  const router= useRouter();

  const deleteTreino = (id_ficha, id_user) => {
    confirm({
      title: 'Deseja excluir este treino?',
      icon: <ExclamationCircleFilled/>,
      content: 'Esta ação excluirá permanentemente o seu treino.',
      okType: 'danger',
      onOk() {
        dispatch(deleteTreinoLivre(id_ficha, id_user));
      },
      onCancel() {},
    });
  }

  const onVerMeusTreinos = (item) => {
    verMeusTreinos(item, true);
  }

  return (
    <>
      <Divider orientation="center"><Title level={3}>Meus Treinos</Title></Divider>
      <List
        header={
          <Flex
            justify={'space-between'}
            align={'center'}
            style={{width: '100%'}}
          >
            <Text strong>Data</Text>
            <Text className={'ml-12'} strong>Nome</Text>
            <Text strong>Treino</Text>
            <Text strong>Opções</Text>
          </Flex>
        }
        dataSource={treinoLivre.meus_treinos}
        renderItem={(item, i) => {
          const items = [
            {
              key: '1',
              label: (
                <Text
                  onClick={() => {
                    router.push({
                      pathname: `/editar_meus_treinos/${item.id_ficha}`,
                    })
                  }}
                  type="warning">[Editar]
                </Text>
              ),
            },
            {
              key: '2',
              label: (
                <Text
                  onClick={() => {
                    deleteTreino(item.id_ficha, item.id_user)
                  }}
                  type="danger">[Excluir]
                </Text>
              ),
            },
          ]
          return (
            <List.Item>
              <Flex
                justify={'space-between'}
                align={'center'}
                style={{width: '100%'}}
                key={i}
              >
                <Text>{`${format(new Date(item.data_criacao), 'dd-MM-yy-EEEEEE', {locale: ptBR})}`}</Text>
                <Text>{`${item?.nome_treino}`}</Text>
                <Button
                  className={'mr-4'}
                  size={'small'}
                  onClick={() => {onVerMeusTreinos(item)}}
                  style={{background: '#018000', color: 'white'}}
                >
                  VER
                </Button>
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
                </Dropdown>
              </Flex>
            </List.Item>
          )
        }}
      />
    </>
  )
}

export default MeuTreinoLista;
