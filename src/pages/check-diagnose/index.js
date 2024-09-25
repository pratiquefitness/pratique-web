import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import Diagnose from "@/components/Diagnose/Cards"; // Caminho atualizado
import { getPerguntasDiagnose } from "@/redux/actions/diagnose"; // Certifique-se de que o caminho e a função estão corretos
import Loading from "@/components/Loading";

export default function CheckDiagnose() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.login);
  const { loading } = useSelector((state) => state.diagnose);
  const [showDiagnose, setShowDiagnose] = useState(false);

  useEffect(() => {
    if (!usuario) {
      // Se o usuário não estiver logado, redireciona para a página de login
      router.push("/login");
    } else if (Number(usuario.status) !== 1) {
      // Se o usuário não for um aluno com status 1, redireciona para a página inicial
      router.push("/");
    }
  }, [usuario]);

  const handleNewDiagnose = () => {
    // Carrega as perguntas da diagnose e exibe o formulário
    dispatch(getPerguntasDiagnose());
    setShowDiagnose(true);
  };

  const closeDiagnose = () => {
    setShowDiagnose(false);
    // Após concluir a diagnose, redireciona para a página inicial
    router.push("/");
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      {showDiagnose ? (
        <Diagnose onClose={closeDiagnose} />
      ) : (
        <div>
          <Button type="primary" size="large" onClick={handleNewDiagnose}>
            Realizar Nova Diagnose
          </Button>
        </div>
      )}
    </div>
  );
}
