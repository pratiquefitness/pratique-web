import Loading from "@/components/Loading";
import { getCursos } from "@/redux/actions/unipower";
import utils from "@/utils";
import { Button, Col, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const { Title, Paragraph, Text } = Typography;

const categoryImages = {
  "aba-coletiva": "/images/webp/unipower/coletivas.webp",
  "aba-piscina": "/images/webp/unipower/piscina.webp",
  "aba-comum-a-todos": "/images/webp/unipower/area-comum.webp",
  "aba-comercial": "/images/webp/unipower/comercial.webp",
  "aba-professor": "/images/webp/unipower/professor.webp",
  "aba-formacao-de-lideres": "/images/webp/unipower/lideres.webp",
  "aba-class-prime": "/images/webp/unipower/personal.webp",
  "aba-bem-estar": "/images/webp/unipower/bem-estar.webp"
};

// Definir as subcategorias da categoria "aba-professor"
const subcategories = {
  "aba-professor": {
    "aba-professor-verde": "Professor Verde",
    "aba-professor-vermelha": "Professor Vermelha",
    "aba-professor-bioimpedancia": "Professor Exame de Bioimpedância",
    "aba-professor-atualizacoes-cientifica": "Professor Atualizações Científicas"
  }
};

// Definir as cores das subcategorias
const subcategoryColors = {
  "aba-professor-verde": "#28a745", // verde
  "aba-professor-vermelha": "#dc3545", // vermelho
  "aba-professor-bioimpedancia": "#6217b8", // ciano
  "aba-professor-atualizacoes-cientifica": "#6d4711e0" // amarelo
};

// Função para remover números iniciais do título
function removeLeadingNumbers(str) {
  return str.replace(/^\d+(\.\d+)?\s*/, "");
}

export default function Unipower() {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.login);
  const { data = [], loading } = useSelector((state) => state.unipower);
  const [dataSearch, setDataSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  useEffect(() => {
    dispatch(getCursos());
  }, [dispatch]);

  useEffect(() => {
    console.log("Dados recebidos:", data);
  }, [data]);

  // Agrupar cursos por ID e consolidar categorias
  const coursesById = {};

  data.forEach((curso) => {
    const id = curso.id;
    if (!coursesById[id]) {
      coursesById[id] = { ...curso, categories: [] };
    }
    coursesById[id].categories.push(curso.category_slug);
  });

  const uniqueCourses = Object.values(coursesById);

  // Categorizar os cursos
  const categorizedCourses = uniqueCourses.reduce((acc, curso) => {
    curso.categories.forEach((category) => {
      if (!acc[category]) acc[category] = [];
      acc[category].push(curso);
    });
    return acc;
  }, {});

  useEffect(() => {
    console.log("Cursos categorizados:", categorizedCourses);
  }, [categorizedCourses]);

  const commonCourses = categorizedCourses["aba-comum-a-todos"] || [];

  // Ordenar os cursos da categoria "aba-comum-a-todos" por 'post_title' em ordem crescente
  const sortedCommonCourses = [...commonCourses].sort((a, b) =>
    a.post_title.localeCompare(b.post_title)
  );

  // Obter a lista de cursos com base na categoria e subcategoria selecionadas
  const getCoursesList = () => {
    if (search) return dataSearch;

    if (selectedSubCategory) {
      return [...(categorizedCourses[selectedSubCategory] || [])].sort((a, b) =>
        a.post_title.localeCompare(b.post_title)
      );
    }

    if (selectedCategory && selectedCategory !== "aba-professor") {
      return [...(categorizedCourses[selectedCategory] || [])].sort((a, b) =>
        a.post_title.localeCompare(b.post_title)
      );
    }

    return [];
  };

  const list = getCoursesList();

  const searchData = (e) => {
    const value = e.currentTarget.value;
    const dataToSearch = getCoursesList();
    const dataFiltered = utils.fieldSearch(dataToSearch, value, "post_title");
    setSearch(value);
    setDataSearch(dataFiltered);
  };

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

      {!selectedCategory && (
        <>
          {/* Exibir cursos da categoria "aba-comum-a-todos" */}
          {sortedCommonCourses.length > 0 && (
            <div className="p-1">
              {sortedCommonCourses.map((curso) => (
                <Row gutter={[16, 16]} key={curso.id} className="pb-4" align="middle">
                  <Col className="d-flex justify-center" span={8}>
                    <img
                      src={curso.post_image}
                      className="w-100 rounded-extra"
                      alt={removeLeadingNumbers(curso.post_title)}
                    />
                  </Col>
                  <Col span={16}>
                    <Title level={5}>{removeLeadingNumbers(curso.post_title)}</Title>
                    <a
                      href={`https://pratiqueemcasa.com.br/pratique-em-casa/powergym/verifica.php?email=${usuario.user_email}&nome=${usuario.user_nicename}&url=https://www.metodologiapowergym.com.br/novo/courses/${curso.post_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button type="primary" size="small">
                        Ver Curso
                      </Button>
                    </a>
                  </Col>
                </Row>
              ))}
            </div>
          )}

          {/* Exibir as categorias */}
          <div className="p-1">
            <Typography.Title level={4} style={{ textAlign: "center" }}>
              Navegue por Categorias
            </Typography.Title>
            <Row gutter={[16, 16]} justify="center">
              {Object.keys(categoryImages)
                .filter((category) => category !== "aba-comum-a-todos")
                .map((category) => (
                  <Col span={8} key={category}>
                    <div
                      className="category-cover"
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedSubCategory(null);
                        setSearch("");
                        setDataSearch([]);
                      }}
                    >
                      <img
                        src={categoryImages[category]}
                        className="w-100 rounded-extra"
                        alt={category}
                      />
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </>
      )}

      {/* Se a categoria 'aba-professor' está selecionada e nenhuma subcategoria está selecionada */}
      {selectedCategory === "aba-professor" && !selectedSubCategory && (
        <div className="p-1">
          <Button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubCategory(null);
              setSearch("");
              setDataSearch([]);
            }}
          >
            Voltar para Categorias
          </Button>
          <div className="py-4">
            <Typography.Title level={4} style={{ textAlign: "center" }}>
              Escolha uma Subcategoria
            </Typography.Title>
            <Row gutter={[16, 16]} justify="center">
              {Object.keys(subcategories["aba-professor"]).map((subcategory) => (
                <Col span={8} key={subcategory}>
                  <div
                    className="category-cover"
                    onClick={() => {
                      setSelectedSubCategory(subcategory);
                      setSearch("");
                      setDataSearch([]);
                    }}
                    style={{
                      backgroundColor: subcategoryColors[subcategory],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: "12px",
                        padding: "5px",
                        fontWeight: "bold"
                      }}
                    >
                      {subcategories["aba-professor"][subcategory]}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}

      {/* Se uma subcategoria está selecionada */}
      {selectedSubCategory && (
        <div className="p-1">
          <Button
            onClick={() => {
              setSelectedSubCategory(null);
              setSearch("");
              setDataSearch([]);
            }}
          >
            Voltar para Subcategorias
          </Button>
          <div className="py-4">
            <Input
              placeholder="Pesquisar"
              suffix={<FaSearch />}
              onChange={searchData}
              value={search}
            />
          </div>
          {list.length > 0 ? (
            list.map((curso) => (
              <Row gutter={[16, 16]} key={curso.id} className="pb-4" align="middle">
                <Col className="d-flex justify-center" span={8}>
                  <img
                    src={curso.post_image}
                    className="w-100 rounded-extra"
                    alt={removeLeadingNumbers(curso.post_title)}
                  />
                </Col>
                <Col span={16}>
                  <Title level={5}>{removeLeadingNumbers(curso.post_title)}</Title>
                  <a
                    href={`https://pratiqueemcasa.com.br/pratique-em-casa/powergym/verifica.php?email=${usuario.user_email}&nome=${usuario.user_nicename}&url=https://www.metodologiapowergym.com.br/novo/courses/${curso.post_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="primary" size="small">
                      Ver Curso
                    </Button>
                  </a>
                </Col>
              </Row>
            ))
          ) : (
            <Typography.Paragraph>
              Nenhum curso encontrado para esta subcategoria.
            </Typography.Paragraph>
          )}
        </div>
      )}

      {/* Se outra categoria está selecionada */}
      {selectedCategory && selectedCategory !== "aba-professor" && (
        <div className="p-1">
          <Button
            onClick={() => {
              setSelectedCategory(null);
              setSearch("");
              setDataSearch([]);
            }}
          >
            Voltar para Categorias
          </Button>
          <div className="py-4">
            <Input
              placeholder="Pesquisar"
              suffix={<FaSearch />}
              onChange={searchData}
              value={search}
            />
          </div>
          {list.length > 0 ? (
            list.map((curso) => (
              <Row gutter={[16, 16]} key={curso.id} className="pb-4" align="middle">
                <Col className="d-flex justify-center" span={8}>
                  <img
                    src={curso.post_image}
                    className="w-100 rounded-extra"
                    alt={removeLeadingNumbers(curso.post_title)}
                  />
                </Col>
                <Col span={16}>
                  <Title level={5}>{removeLeadingNumbers(curso.post_title)}</Title>
                  <a
                    href={`https://pratiqueemcasa.com.br/pratique-em-casa/powergym/verifica.php?email=${usuario.user_email}&nome=${usuario.user_nicename}&url=https://www.metodologiapowergym.com.br/novo/courses/${curso.post_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="primary" size="small">
                      Ver Curso
                    </Button>
                  </a>
                </Col>
              </Row>
            ))
          ) : (
            <Typography.Paragraph>
              Nenhum curso encontrado para esta categoria.
            </Typography.Paragraph>
          )}
        </div>
      )}
    </Loading>
  );
}
