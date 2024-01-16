import React, {  useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Collapse, Input, Modal, Space,  Typography, message } from 'antd';
import { LuCheckCircle2 } from 'react-icons/lu';
import { Loading } from '@/components';
import utils from '@/utils';

const { Panel } = Collapse;

const columns = (setLinkID, dados, usuario, employee, showModal) => {
  return [
    {
      title: 'Pratique Med',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 100,
      render: (_, record) => {
        const linkFinal = `https://novo.pratiquefitness.com.br/checkoutpageplano/${record.unidade.slug}?pl=${record.plano}&saver=${record.saver}&obs=AFILIADO|${dados.token}|${dados.separador}|NULL|${employee ? employee : usuario.isAffiliate}|AFILIADO`;

        return (
          <Button
            type="primary"
            onClick={() => {
              showModal(linkFinal);
              setLinkID(linkFinal);
            }}
          >
            Link
          </Button>
        );
      },
    },
  ];
};

export default function JumperFit({ employee }) {
  const [dataSearch, setDataSearch] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLink, setModalLink] = useState('');
  const { unidades, loading } = useSelector((state) => state.afiliados);
  const { usuario } = useSelector((state) => state.login);
  const inputRef = useRef(null);

  const searchData = (e) => {
    const value = e.currentTarget.value;
    const dataFiltered = utils.fieldSearch(unidades, value, 'unidade');
    setSearch(value);
    setDataSearch(dataFiltered);
  };

  const list = search ? dataSearch : unidades;

  const handleButtonClick = (credits) => {
    const selectedPlan =
      credits === '1' ? '450' : credits === '2' ? '451' : credits === '3' ? '452' : '452';
    const link = `https://novo.pratiquefitness.com.br/checkoutpageplano/?pl=${selectedPlan}&saver=teste&obs=AFILIADO|d826fbbdd2c37d1342b8d16dfa5c75fd|1|NULL|${employee ? employee : usuario.isAffiliate}|AFILIADOMED`;
    showModal(link);
  };

  const showModal = (link) => {
    setModalLink(link);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalLink('');
    setModalVisible(false);
  };

  return (
    <Loading spinning={loading}>
      <Modal title="Link" visible={modalVisible} onCancel={closeModal} footer={null} width={300} centered>
        {modalLink.includes('http') ? (
          <div className="text-center">
            <LuCheckCircle2 style={{ fontSize: 50, color: '#25D366' }} />
            <Typography.Title level={4} className="mb-4">
              Link Gerado!
            </Typography.Title>
            <Input
              ref={inputRef}
              value={modalLink}
              onClick={() => {
                inputRef.current.focus({
                  cursor: 'all',
                });
              }}
              className="mb-4"
            />
            <Button
              type="primary"
              style={{ background: '#1677ff' }}
              size="small"
              onClick={() => {
                utils.copyTextToClipboard(modalLink);
                message.success('Link copiado!');
                closeModal();
              }}
            >
              Copiar Link
            </Button>
          </div>
        ) : (
          <Loading spinning />
        )}
      </Modal>
      <Space direction="vertical" className="w-100">
        <Space direction="horizontal" align="center">
          <Button type="primary" onClick={() => handleButtonClick('1')}>
            Individual
          </Button>
          <Button type="primary" onClick={() => handleButtonClick('2')}>
            Casal
          </Button>
          <Button type="primary" onClick={() => handleButtonClick('3')}>
            Familiar
          </Button>
          <Button type="primary" onClick={() => handleButtonClick('4')}>
            Multifamiliar
          </Button>
        </Space>
        <Collapse className="planos_academia" accordion>
        </Collapse>
      </Space>
    </Loading>
  );
}
