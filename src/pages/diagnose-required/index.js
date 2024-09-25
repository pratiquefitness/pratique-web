import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import DiagnoseForm from "./DiagnoseForm"; // Se `DiagnoseForm.jsx` estiver na mesma pasta

export default function DiagnoseRequired() {
  const { usuario } = useSelector((state) => state.login);
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      // Se o usuário não estiver logado, redireciona para a página de login
      router.push("/login");
    } else if (usuario.status !== 1) {
      // Se o usuário não for um aluno com status 1, redireciona para a página inicial
      router.push("/");
    }
  }, [usuario]);

  return (
    <div>
      {/* Sem menu ou elementos de navegação */}
      <h1>Realizar Diagnose Obrigatória</h1>
      <DiagnoseForm email={usuario.user_login} />
    </div>
  );
}
