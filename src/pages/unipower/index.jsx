import Loading from "@/components/Loading";
import { getCursos } from "@/redux/actions/unipower";
import { setBrowserURL } from "@/redux/slices/global";
import utils from "@/utils";
import { Button, Col, Collapse, Input, Row, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const { Title, Paragraph } = Typography;

export default function Unipower() {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.login);
  const { data, loading } = useSelector((state) => state.unipower);
  const [dataSearch, setDataSearch] = useState([]);
  const [search, setSearch] = useState("");

  const searchData = (e) => {
    const value = e.currentTarget.value;
    const dataFiltered = utils.fieldSearch(data, value, "post_title");
    setSearch(value);
    setDataSearch(dataFiltered);
  };

  useEffect(() => {
    dispatch(getCursos());
  }, []);

  const list = search ? dataSearch : data;

  return (
    <Loading spinning={loading}>
      <div className="text-center">
        <Typography.Title level={4}>Cursos disponíveis para você!</Typography.Title>
        <Typography.Paragraph>Seu acesso na plataforma é:</Typography.Paragraph>
        <Typography.Paragraph>
          Usuário: seu e-mail
          <br />
          Senha: pratiqueemcasa
        </Typography.Paragraph>
      </div>
      <div className="p-1">
        <div className="py-4">
          <Input placeholder="Persquisar" suffix={<FaSearch />} onChange={searchData} />
        </div>

        {list.map((curso, key) => (
          <Row gutter={[16, 16]} key={key} className="pb-4" align="middle">
            <Col className="d-flex justify-center" span={8}>
              <img src={curso.post_image} className="w-100 rounded-extra" />
            </Col>
            <Col span={16}>
              <Title level={5}>{curso.post_title}</Title>
              <a
                href={`https://pratiqueemcasa.com.br/pratique-em-casa/powergym/verifica.php?email=${usuario.user_email}&nome=${usuario.user_nicename}&url=https://www.metodologiapowergym.com.br/novo/courses/${curso.post_name}`}
                target="_blank"
              >
                <Button type="primary" size="small">
                  Ver Curso
                </Button>
              </a>
            </Col>
          </Row>
        ))}
      </div>
    </Loading>
  );
}
