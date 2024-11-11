import {Button, Divider, Dropdown, Flex, List, Typography, Modal, Space, Table} from "antd";
const {Text, Title} = Typography;
import {format} from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import {useDispatch} from "react-redux";
import {deleteTreinoLivre} from "@/redux/actions/exercicios";
import {ExclamationCircleFilled} from "@ant-design/icons";
const {confirm} = Modal;
import {useRouter} from 'next/router';

const TreinosLivresSalvos = ({
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
  
  const DropDownComponet = ({opcoes}) => {
    const items = [
      {
        key: '1',
        label: (
          <Text
            onClick={() => {
              router.push({
                pathname: `/editar_meus_treinos/${opcoes.id_ficha}`,
                query: { id_user: opcoes.id_user }
              }, `/editar_meus_treinos/${opcoes.id_ficha}`)
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
              deleteTreino(opcoes.id_ficha, opcoes.id_user)
            }}
            type="danger">[Excluir]
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

  const onVerMeusTreinos = (item) => {
    verMeusTreinos(item, true);
  }
  
  const columns = [
    {
      title: <Text>Data</Text>,
      dataIndex: 'data',
      key: 'data',
    },{
      title: <Text>Nome</Text>,
      dataIndex: 'nome',
      key: 'nome',
    },{
      title: <Text>Treino</Text>,
      dataIndex: 'treino',
      key: 'treino',
      render: (_, {treino}) => (
        <>
          <Button
            size={'small'}
            onClick={() => {
              onVerMeusTreinos(treino)
            }}
            style={{background: '#018000', color: 'white'}}
          >
            VER
          </Button>
        </>
      ),
    },{
      title: <Text>Opções</Text>,
      dataIndex: 'opcoes',
      key: 'opcoes',
      render: (_, {opcoes}) => (
        <DropDownComponet opcoes={opcoes} />
      )
    }
  ];
  
  const data = treinoLivre.meus_treinos?.map((treino, i) => {
    return {
      key: i,
      data: <Text>{`${format(new Date(treino.data_criacao), 'dd-MM-yy-EEEEEE', {locale: ptBR})}`}</Text>,
      nome: <Text>{`${treino?.nome_treino}`}</Text>,
      treino: treino,
      opcoes: treino,
    }
  });
  
  return (
    <>
      <Divider orientation="center"><Title level={3}>Treinos Livres Salvos</Title></Divider>
      <Table pagination={false} columns={columns} dataSource={data} />
    </>
  )
}

export default TreinosLivresSalvos;
