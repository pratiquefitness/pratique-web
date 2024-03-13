import { ButtonCopyLink, Loading } from "@/components";
import { getDadosAfiliado, getPlanos, getUnidades } from "@/redux/actions/afiliados";
import { setBrowserURL } from "@/redux/slices/global";
import utils from "@/utils";
import {
  Button,
  Col,
  Collapse,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Typography,
  message,
  theme
} from "antd";
import { useEffect, useRef, useState } from "react";
import { LuCheckCircle2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const { Panel } = Collapse;

const columns = (setLinkID, dados, usuario, employee, showModal) => {
  return [
    {
      title: "Jumper Fit",
      dataIndex: "nome",
      key: "nome"
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 100,
      render: (_, record) => {
        const linkFinal = `https://novo.pratiquefitness.com.br/checkoutpageplano/${
          record.unidade.slug
        }?pl=${record.plano}&saver=${record.saver}&obs=AFILIADO|${dados.token}|${
          dados.separador
        }|NULL|${employee ? employee : usuario.isAffiliate}|AFILIADO`;

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
      }
    }
  ];
};

export default function JumperFit({ employee }) {
  const [linkID, setLinkID] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLink, setModalLink] = useState("");
  const dispatch = useDispatch();
  const { unidades, planos, planosLoading, loading } = useSelector((state) => state.afiliados);
  const { usuario } = useSelector((state) => state.login);
  const inputRef = useRef(null);

  const searchData = (e) => {
    const value = e.currentTarget.value;
    const dataFiltered = utils.fieldSearch(unidades, value, "unidade");
    setSearch(value);
    setDataSearch(dataFiltered);
  };

  const list = search ? dataSearch : unidades;
  const handleButtonClick = (credits) => {
    let selectedPlan, saverParam;

    if (credits === "12") {
      selectedPlan = "418";
      saverParam = "produto";
    } else if (credits === "24") {
      selectedPlan = "419";
      saverParam = "produto";
    } else if (credits === "diaria") {
      selectedPlan = "110";
      saverParam = "produto";
    } else if (credits === "mensal5dias") {
      selectedPlan = "421";
      saverParam = "plano";
    } else if (credits === "mensal7dias") {
      selectedPlan = "422";
      saverParam = "plano";
    } else {
      // Se nenhum dos casos acima, use o link padrão
      selectedPlan = "default"; // ajuste conforme necessário
      saverParam = "produto";
    }

    // Construa o link padrão
    const link = `https://novo.pratiquefitness.com.br/checkoutpageplano/pedra-branca-?pl=${selectedPlan}&saver=${saverParam}&jumper=sim&obs=AFILIADO|bdfd0b64da6255bdb1658ba11e770fac|1|NULL|${
      employee ? employee : usuario.isAffiliate
    }|AFILIADO`;

    // Use o link como necessário, por exemplo, abrir em uma nova aba
    showModal(link);
  };

  const showModal = (link) => {
    setModalLink(link);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalLink("");
    setModalVisible(false);
  };
  return (
    <Loading spinning={loading}>
      {/* ... (existing code) */}
      <Modal
        title="Link"
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={300}
        centered
      >
        {modalLink ? (
          <div className="text-center">
            <LuCheckCircle2 style={{ fontSize: 50, color: "#25D366" }} />
            <Typography.Title level={4} className="mb-4">
              Link Gerado!
            </Typography.Title>
            <Input
              ref={inputRef}
              value={modalLink}
              onClick={() => {
                inputRef.current.focus({
                  cursor: "all"
                });
              }}
              className="mb-4"
            />
            <Button
              type="primary"
              style={{ background: "#1677ff" }}
              size="small"
              onClick={() => {
                if (typeof modalLink === "string") {
                  utils.copyTextToClipboard(modalLink);
                  message.success("Link copiado!");
                  closeModal();
                }
              }}
            >
              Copiar Link
            </Button>
          </div>
        ) : (
          <Loading spinning />
        )}
      </Modal>
      <div className="w-100 text-center mb-4 button-container">
        <Button type="primary" style={{ width: "150px" }} onClick={() => handleButtonClick("12")}>
          12 créditos
        </Button>
        <br /> <br />
        <Button type="primary" style={{ width: "150px" }} onClick={() => handleButtonClick("24")}>
          24 créditos
        </Button>
        <br /> <br />
        <Button
          type="primary"
          style={{ width: "150px" }}
          onClick={() => handleButtonClick("diaria")}
        >
          Diária
        </Button>
        <br /> <br />
        <Button
          type="primary"
          style={{ width: "150px" }}
          onClick={() => handleButtonClick("mensal7dias")}
        >
          Mensal 7 dias
        </Button>
      </div>
      <Collapse className="planos_academia" accordion>
        {/* ... (existing code) */}
      </Collapse>
    </Loading>
  );
}
