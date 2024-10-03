import Loading from "@/components/Loading";
import { getDiagnose, getPerguntasDiagnose } from "@/redux/actions/diagnose";
import { Button, Table, Tag, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TreinoLayout from "../_Layout2";
import Link from "next/link";
import Diagnose from "./Cards";
import { format } from "date-fns";
import React, { useState } from "react";
import styles from "./primeira.module.css";

const columns = [
  {
    title: "Data",
    dataIndex: "diagnose_data",
    key: "diagnose_data",
    render: (text) => (text ? format(new Date(text), "dd-MM-yy") : "-")
  },
  {
    title: "Método",
    dataIndex: "diagnose_produto",
    key: "diagnose_produto",
    render: (text) => <Tag>{text}</Tag>
  },
  {
    title: "Tratamento",
    dataIndex: "diagnose_subproduto",
    key: "diagnose_subproduto",
    render: (text) => <Tag>{text}</Tag>
  },
  {
    title: "",
    dataIndex: "acoes",
    key: "acoes",
    width: 60,
    render: (_, record) => (
      <Link href={`/treino/diagnose/${record.diagnose_id}`}>
        <Button type="primary" size="small">
          Visualizar
        </Button>
      </Link>
    )
  }
];

export default function DiagnoseView() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.diagnose);
  const [showDiagnose, setShowDiagnose] = useState(false);

  useEffect(() => {
    dispatch(getDiagnose());
  }, []);

  const handleNewDiagnose = () => {
    setShowDiagnose(true);
  };

  const closeDiagnose = () => {
    setShowDiagnose(false);
  };

  const diagnoseMaisDe6Meses = () => {
    if (!data || !data.length) return true;

    const ultimaDiagnose = data[0].diagnose_data;
    const hoje = new Date();
    const dataUltimaDiagnose = new Date(ultimaDiagnose);
    const diffMeses =
      (hoje.getFullYear() - dataUltimaDiagnose.getFullYear()) * 12 +
      hoje.getMonth() -
      dataUltimaDiagnose.getMonth();

    return diffMeses >= 6;
  };

  return (
    <TreinoLayout>
      <div className={styles.background}>
        {showDiagnose ? (
          <Diagnose onClose={closeDiagnose} />
        ) : diagnoseMaisDe6Meses() ? (
          <div
            style={{
              textAlign: "center",
              margin: "120px 0",
              marginTop: "70px",
              borderRadius: "30px",
              padding: "20px",
              background: "rgb(255 255 255 / 0%)"
            }}
          >
            <Typography.Paragraph
              style={{
                color: "rgb(0 0 0)",
                marginTop: "16px",
                fontSize: "13px",
                padding: "5px",
                fontWeight: 600,
                borderRadius: "5px",
                background: "rgb(255 255 255 / 65%)"
              }}
            >
              Você precisa ter uma Diagnose realizada nos últimos 6 meses para acessar o APP.
            </Typography.Paragraph>
            <Button
              className="blink-button"
              type="primary"
              size="large"
              onClick={handleNewDiagnose}
            >
              Realizar Nova Diagnose
            </Button>
          </div>
        ) : (
          <Table columns={columns} dataSource={data} rowKey="diagnose_id" />
        )}
      </div>
      <style jsx global>{`
        .ant-layout-content {
          padding: 0 !important;
          margin: 0 !important;
          box-sizing: border-box;
        }

        @media (min-width: 1200px) {
          .container {
            width: 100%;
          }
        }

        body {
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
    </TreinoLayout>
  );
}
