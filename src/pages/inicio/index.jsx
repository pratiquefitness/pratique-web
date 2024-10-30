import { Button, Col, Form, Input, Modal, Row, Space, Typography, message } from "antd";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import Banners from "./_Banners";
import { setBrowserURL } from "@/redux/slices/global";
import AtividadesOnDemand from "./_AtividadesOnDemand";
import BemEstar from "./_BemEstar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from "./_CarouselItem";
import Powerflix from "../powerflix";
import AreaPersonal from "../area_personal";
import { IdcardOutlined } from "@ant-design/icons";
import { updateNiceName } from "@/redux/actions/conta";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadingCardBig } from "../../components/LazyLoadingCardBig";
import { LazyLoadingCardExtraBig } from "../../components/LazyLoadingCardExtraBig";
import { LazyLoadingTwoColumns } from "../../components/LazyLoadingTwoColumns";
import { LazyLoadingThreeColumns } from "../../components/LazyLoadingThreeColumns";
import { useRouter } from "next/router";

const { Title, Text } = Typography;

export default function Inicio() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [horariosModal, setHorariosModal] = useState(false);
  const [saverClubModal, setSaverClubModal] = useState(false);
  const [isCpfValid, setIsCpfValid] = useState(false);
  const { usuario } = useSelector((state) => state.login);
  const { loading } = useSelector((state) => state.lives);

  const isClient = !usuario.isEmployee;
  const isSaverAndClient = (usuario.plano?.includes("SAVER") && !usuario.isEmployee) || false;
  const [isSaverSaudeAndPersonal, setIsSaverSaudeAndPersonal] = useState(false);
  const isSaverSaudeAndClient =
    (usuario.plano?.includes("PERSONAL") && !usuario.isEmployee) || false;
  const [niceNameForm] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);

  const [openUserNotFoundModal, setOpenUserNotFoundModal] = useState(false);

  // Estado para armazenar a URL de login automático
  const [loginAutoURL, setLoginAutoURL] = useState("");

  const checkUserCPF = async (cpf) => {
    try {
      const response = await fetch("https://pratiquetecnologia.com.br/api/app/user/saver.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpf })
      });
      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error("Erro ao verificar o CPF:", error);
      return false;
    }
  };

  // Função para verificar se o usuário possui diagnóstico
  const checkDiagnose = async () => {
    try {
      const response = await fetch("/api/check-diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.user_login })
      });
      const data = await response.json();
      if (!data.hasDiagnose) {
        // Usuário não possui diagnose, redireciona para /treino/diagnose
        router.push("/treino/diagnose/primeira");
      }
      // Caso contrário, não faz nada e permanece na página inicial
    } catch (error) {
      console.error("Erro ao verificar diagnose:", error);
      // Opcional: você pode querer lidar com erros de forma mais robusta
    }
  };

  useEffect(() => {
    // Usuário é aluno com status 1, verifica se possui diagnose
    checkDiagnose();
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Iniciando fetchUserData");
        const response = await fetch(`/api/getUserData?userId=${usuario.ID}`);
        const userData = await response.json();
        console.log("userData:", userData);

        setIsSaverSaudeAndPersonal(
          (usuario.plano?.includes("PERSONAL") && !usuario.isEmployee) || userData?.professor === 1
        );

        // Verifica o CPF do usuário
        const isValid = await checkUserCPF(userData.cpf);
        setIsCpfValid(isValid);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    if (usuario.ID) {
      fetchUserData();
    }
  }, [usuario.ID]);

  // Obter a loginAutoURL e armazená-la no estado
  useEffect(() => {
    const fetchLoginAutoURL = async () => {
      try {
        const email = usuario.user_email.trim().toLowerCase();
        console.log("Email do usuário:", email);

        const loginAutoResponse = await fetch(
          `/api/getLoginAutoURL?email=${encodeURIComponent(email)}`
        );
        const loginAutoData = await loginAutoResponse.json();
        console.log("loginAutoData:", loginAutoData);

        if (loginAutoData.success && loginAutoData.data?.usuario?.login_auto) {
          setLoginAutoURL(loginAutoData.data.usuario.login_auto);
          console.log("loginAutoURL definida:", loginAutoData.data.usuario.login_auto);
        } else if (loginAutoData.code === 409) {
          console.warn("Usuário não encontrado na plataforma Unipower.");
          setOpenUserNotFoundModal(true);
        } else {
          console.error("Falha ao obter a URL login_auto:", loginAutoData);
        }
      } catch (error) {
        console.error("Erro ao obter a URL login_auto:", error);
      }
    };

    if (usuario.ID) {
      fetchLoginAutoURL();
    }
  }, [usuario.ID]);

  useEffect(() => {
    if (
      ((usuario.professor === 1 || usuario.plano?.includes("PERSONAL TRAINER")) &&
        usuario.user_nicename.includes("@")) ||
      !usuario.user_nicename.length
    ) {
      setOpenModal(true);
    }
  }, [usuario]);

  const isSaver = usuario.plano?.includes("SAVER") || usuario.isEmployee || isCpfValid;

  const dispatchSaverSaude = () => {
    dispatch(setBrowserURL("https://clubecertosaude.com.br/saude/pratiquemed/"));
  };

  const dispatchQueroBem = () => {
    dispatch(setBrowserURL("https://grupopratique.typeform.com/to/LUc4cfCd"));
  };

  const dispatchPratiqueMed = () => {
    dispatch(setBrowserURL("https://clubecertosaude.com.br/saude/pratiquemed/"));
  };

  const dispatchSac = () => {
    dispatch(
      setBrowserURL(
        "https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20estou%20com%20d%C3%BAvida.",
        "_blank"
      )
    );
  };

  const dispatchTrabalhePratique = () => {
    dispatch(setBrowserURL("https://pratiquefitness.com.br/trabalhe-na-academia-pratique/"));
  };

  const dispatchSobrePratique = () => {
    dispatch(setBrowserURL("https://pratiquefitness.com.br/sobre-a-pratique/"));
  };

  const abreSaverClubModal = () => {
    setSaverClubModal(true);
  };

  // Atualizar a função dispatchUnipower para usar setBrowserURL
  const dispatchUnipower = () => {
    if (loginAutoURL) {
      const galo = "https://plataformaunipower.cademi.com.br";
      dispatch(setBrowserURL(galo));
    } else {
      message.error("URL de acesso não disponível. Tente novamente mais tarde.");
    }
  };

  const listaCarousel = [
    {
      href: "",
      action: abreSaverClubModal,
      image: "/images/webp/saver_club.webp",
      isRounded: true,
      alt: "saver_club"
    },
    {
      href: "",
      action: dispatchSaverSaude,
      image: "/images/webp/pratique_med.webp",
      isRounded: true,
      alt: "pratique_med"
    },
    {
      href: "",
      action: dispatchUnipower,
      image: "/images/webp/unipower-beta.webp",
      isRounded: true,
      alt: "unipower_banner"
    },
    {
      href: "/canal_equipe",
      image: "/images/webp/canal_equipe.webp",
      isRounded: true,
      alt: "canal_equipe"
    },
    {
      href: "https://bit.ly/FalarRH",
      image: "/images/webp/rh.webp",
      isRounded: true,
      alt: "RH",
      target: "_blank"
    }
  ];

  const listaCarouselPersonal = [
    {
      href: "/personal",
      image: "/images/webp/banner_home/personal.webp",
      isRounded: true,
      alt: "personal_banner"
    },
    {
      href: "",
      action: abreSaverClubModal,
      image: "/images/webp/saver_club.webp",
      isRounded: true,
      alt: "saver_club"
    },
    {
      href: "",
      action: dispatchSaverSaude,
      image: "/images/webp/pratique_med.webp",
      isRounded: true,
      alt: "pratique_med"
    },
    ...(usuario.isEmployee
      ? [
          {
            href: "",
            action: dispatchUnipower,
            image: "/images/webp/unipower-beta.webp",
            isRounded: true,
            alt: "unipower_banner"
          },
          {
            href: "/canal_equipe",
            image: "/images/webp/canal_equipe.webp",
            isRounded: true,
            alt: "canal_equipe"
          }
        ]
      : []),

    {
      href: "https://api.whatsapp.com/send?phone=553135682676&text=Ol%C3%A1%2C%20sou%20do%20Clube%20Personal%20da%20PRATIQUE%20e%20estou%20vindo%20do%20bot%C3%A3o%20de%20suporte%20dentro%20do%20app.",
      image: "/images/webp/banner_home/suporte-personal.webp",
      isRounded: true,
      alt: "suporte_personal",
      target: "_blank"
    }
  ];

  const listaCarouselAreaCliente = [
    {
      href: "",
      image: "/images/webp/trabalhe_conosco.webp",
      isRounded: true,
      alt: "trabalhe_conosco",
      action: dispatchTrabalhePratique
    },
    {
      href: "",
      image: "/images/webp/sua_pratique.webp",
      isRounded: true,
      alt: "sua_pratique",
      action: dispatchSobrePratique
    }
  ];

  const novaListaCarouselAreaCliente = [
    {
      href: "https://api.whatsapp.com/send?phone=5531984272283&text=Estou%20no%20App%20e%20quero%20alugar%20minha%20bike",
      image: "/images/webp/alugue_bike.webp",
      isRounded: true,
      alt: "alugue_bike",
      target: "_blank"
    },
    ...(isSaverAndClient
      ? [
          {
            href: "",
            image: "/images/webp/saver_club.webp",
            isRounded: true,
            alt: "saver_club",
            action: abreSaverClubModal
          }
        ]
      : []),

    ...(isSaverSaudeAndClient
      ? [
          {
            href: "https://www.pratiquemed.com.br/login.php",
            image: "/images/webp/pratique_med.webp",
            isRounded: true,
            alt: "pratique_med",
            target: "_blank"
          }
        ]
      : []),
    {
      action: dispatchSaverSaude,
      image: "/images/webp/pratique_med.webp",
      isRounded: true,
      alt: "pratique_med"
    },
    {
      href: "https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20estou%20com%20d%C3%BAvida.",
      image: "/images/webp/sac.webp",
      isRounded: true,
      alt: "sac",
      target: "_blank"
    },
    ...listaCarouselAreaCliente
  ];

  const handleNomeSubmit = async (niceName) => {
    try {
      await dispatch(updateNiceName(niceName));
    } catch (error) {
      console.error("Erro ao atualizar o Nome:", error);
    }
  };

  return (
    <Space direction="vertical" className="w-100">
      {/* Modal para Atualizar Nome */}
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              Atenção!!!
            </Typography.Title>
          </div>
        }
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={null}
        centered
      >
        <div style={{ textAlign: "center" }}>
          <IdcardOutlined style={{ fontSize: "48px", color: "#08c" }} />
          <Typography.Paragraph style={{ color: "#595959", marginTop: "16px" }}>
            Preencha o campo nome para exibir junto a sua foto de contratação de personal.
          </Typography.Paragraph>
        </div>
        <Form form={niceNameForm} onFinish={handleNomeSubmit}>
          <Form.Item
            name="user_nicename"
            rules={[{ required: true, message: "Por favor, insira seu nome completo" }]}
          >
            <Input placeholder="Digite aqui o seu nome" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para Horários */}
      <Modal
        title="Horários"
        open={horariosModal}
        footer={null}
        onCancel={() => setHorariosModal(false)}
      >
        <iframe
          src="https://pratiquefitness.com.br/horarios/horariospratique/"
          frameBorder="0"
          width={"100%"}
          height={500}
        ></iframe>
      </Modal>

      {/* Modal Saver Club */}
      <Modal
        title="Saver Club"
        open={saverClubModal}
        onCancel={() => setSaverClubModal(false)}
        footer={null}
        width={300}
        centered
      >
        <Space direction="vertical">
          <a
            onClick={() => {
              setSaverClubModal(false);
              dispatch(
                setBrowserURL(
                  isSaver
                    ? "https://clubecerto.com.br/hotsite/?utm_cc=acessodireto&ent=saverpratique"
                    : "https://grupopratique.typeform.com/to/VBhVMuLF"
                )
              );
            }}
            target="_blank"
          >
            <img src="/images/webp/clube_certo.webp" width={"100%"} className="rounded" />
          </a>
          <a
            onClick={() => {
              setSaverClubModal(false);
              dispatch(setBrowserURL("https://grupopratique.typeform.com/cadas-desconto"));
            }}
            target="_blank"
          >
            <img src="/images/webp/igreen.webp" width={"100%"} className="rounded" />
          </a>
          <a
            onClick={() => {
              setSaverClubModal(false);
              dispatch(setBrowserURL("https://www.bolsamaisbrasil.com.br/unipower/bolsas"));
            }}
            target="_blank"
          >
            <img src="/images/webp/bolsa_brasil.webp" width={"100%"} className="rounded" />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5531984400941&text=Ol%C3%A1%2C+Igor+da+RDC+Viagens.+Sou+assinante+do+Saver+Club+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+descontos+da+assinatura+de+viagens"
            target="_blank"
          >
            <img src="/images/webp/rdc.webp" width={"100%"} className="rounded" />
          </a>
          <a
            onClick={() => {
              setSaverClubModal(false);
              dispatch(setBrowserURL("https://pratiquefitness.com.br/"));
            }}
            target="_blank"
          >
            <img src="/images/webp/pratique.webp" width={"100%"} className="rounded" />
          </a>
        </Space>
      </Modal>

      {/* Modal Usuário Não Encontrado */}
      <Modal
        title="Usuário não encontrado"
        open={openUserNotFoundModal}
        onCancel={() => setOpenUserNotFoundModal(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setOpenUserNotFoundModal(false)}>
            Fechar
          </Button>
        ]}
        centered
      >
        <Typography.Paragraph>
          Você não está cadastrado na plataforma Unipower. Por favor, entre em contato com o
          suporte.
        </Typography.Paragraph>
      </Modal>

      {/* Seção de Novidades */}
      <div>
        <Title level={3} className="m-0">
          Novidades
        </Title>
        <Text type="secondary">Veja as novidades para 2024</Text>
      </div>

      <LazyLoadingCardExtraBig loading={loading}>
        <Banners />
      </LazyLoadingCardExtraBig>

      {/* Seção Clube Personal */}
      {isSaverSaudeAndPersonal ? (
        <div className="mt-4">
          <div>
            <Title level={3} className="m-0">
              Clube Personal!
            </Title>
            <Text type="">Benefícios e conteúdos para você</Text>
          </div>
          <Carousel
            arrows={false}
            autoPlay={false}
            centerMode={false}
            className="mt-2"
            containerClass="container"
            draggable
            focusOnSelect={false}
            infinite={false}
            keyBoardControl={false}
            minimumTouchDrag={80}
            partialVisible
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                partialVisibilityGutter: 100
              }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            showDots={false}
            slidesToSlide={1}
            swipeable
          >
            {listaCarouselPersonal.map(({ href, image, isRounded, action, alt }, index) => (
              <CarouselItem
                key={index}
                href={href}
                action={action}
                alt={alt}
                image={image}
                isRounded={isRounded}
              />
            ))}
          </Carousel>
        </div>
      ) : null}

      {/* Seção Área do Colaborador */}
      {usuario.isEmployee && !isSaverSaudeAndPersonal ? (
        <div className="mt-4">
          <div>
            <Title level={3} className="m-0">
              Área do Colaborador!
            </Title>
            <Text type="">Benefícios e conteúdos para você</Text>
          </div>
          <LazyLoadingTwoColumns loading={loading}>
            <Carousel
              arrows={false}
              autoPlay={false}
              centerMode={false}
              className="mt-2"
              containerClass="container"
              draggable
              focusOnSelect={false}
              infinite={false}
              keyBoardControl={false}
              minimumTouchDrag={80}
              partialVisible
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 3
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                  partialVisibilityGutter: 100
                }
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              showDots={false}
              slidesToSlide={1}
              swipeable
            >
              {listaCarousel.map(({ href, image, isRounded, action, alt }, index) => (
                <CarouselItem
                  key={index}
                  href={href}
                  action={action}
                  alt={alt}
                  image={image}
                  isRounded={isRounded}
                />
              ))}
            </Carousel>
          </LazyLoadingTwoColumns>
        </div>
      ) : null}

      {/* Seção Área do Cliente */}
      {isClient ? (
        <>
          <div>
            <Title level={3} className="mt-4 mb-0">
              Área do Cliente!
            </Title>
            <Text type="secondary">Benefícios e conteúdos para você</Text>
          </div>

          <LazyLoadingTwoColumns loading={loading}>
            <Carousel
              arrows={false}
              autoPlay={false}
              centerMode={false}
              className="mt-2"
              containerClass="container"
              draggable
              focusOnSelect={false}
              infinite={false}
              keyBoardControl={false}
              minimumTouchDrag={80}
              partialVisible
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 3
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                  partialVisibilityGutter: 100
                }
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              showDots={false}
              slidesToSlide={1}
              swipeable
            >
              {novaListaCarouselAreaCliente.map(
                ({ href, image, alt, isRounded, action }, index) => (
                  <CarouselItem
                    key={index}
                    href={href}
                    alt={alt}
                    image={image}
                    isRounded={isRounded}
                    action={action}
                  />
                )
              )}
            </Carousel>
          </LazyLoadingTwoColumns>
        </>
      ) : null}

      {/* Seção Atividades On Demand */}
      <div className="mt-4 mb-2">
        <Title level={3} className="m-0 ">
          Atividades On Demand
        </Title>
        <Text>Aulas sempre disponíveis, para você fazer no seu tempo!</Text>
      </div>

      <LazyLoadingThreeColumns loading={loading}>
        <AtividadesOnDemand />
      </LazyLoadingThreeColumns>

      {/* Seção Powerflix */}
      <Powerflix />

      {/* Seção Bem-estar */}
      <div className="mt-4 mb-2">
        <Title level={3} className="m-0 ">
          Bem-estar físico e emocional
        </Title>
      </div>

      <LazyLoadingCardBig loading={loading}>
        <BemEstar />
      </LazyLoadingCardBig>

      {/* Seção Evolua seu RESULTADO */}
      <div className="mt-126 flex flex-col mb-0">
        <div className="mt-4 mb-2">
          <Title level={3} className="m-0 ">
            Evolua seu RESULTADO
          </Title>
        </div>
        <Text type="secondary">Exercícios e conteúdos para você</Text>
        <br />
        <br />

        <LazyLoadingCardBig loading={loading}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:flex">
            <a className="sm:flex-1" href="/exercicios">
              <img src="/images/webp/demonstracao.webp" width="100%" />
            </a>
            <a
              className="sm:flex-1"
              onClick={() =>
                dispatch(setBrowserURL("https://pratiquefitness.com.br/pratiquenutri/"))
              }
            >
              <img src="/images/webp/fale_nutri.webp" width="100%" />
            </a>
            <a
              className="sm:flex-1"
              href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20estou%20com%20d%C3%BAvida."
              target="_blank"
            >
              <img src="/images/webp/fale_professor.webp" width="100%" />
            </a>
          </div>
        </LazyLoadingCardBig>
      </div>

      {/* Seção Área Personal */}
      <AreaPersonal />

      {/* Seção Fale com a Pratique */}
      <div>
        <Title level={3} className="m-0 mt-6">
          Fale com a Pratique
        </Title>
        <Text type="secondary">Nossos canais de atendimento</Text>
      </div>
      <Row gutter={6} className="mb-2 mt-2">
        <Col span={12}>
          <a
            href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20estou%20com%20d%C3%BAvida."
            target="_blank"
          >
            <img src="/images/webp/sac.webp" width="100%" />
          </a>
        </Col>
        <Col span={12}>
          <a onClick={() => setHorariosModal(true)}>
            <img src="/images/webp/horarios.webp" width="100%" style={{ filter: "sepia(1)" }} />
          </a>
        </Col>
      </Row>
    </Space>
  );
}
