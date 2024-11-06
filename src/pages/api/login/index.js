import { apiPratiqueFunciona, apiPratiquePro } from "@/services";
import jwt from "jsonwebtoken";
import utils from "@/utils";

export default async function handler(req, res) {
  //const email = 'adelmodesign@gmail.com' // nao afiliado
  // const email = 'bruna.vn.costa@gmail.com' // afiliado

  const { email, senha } = req.body;

  let user = {};

  const usuarioExist = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      user_login: email,
      user_pass: utils.encrypt_md5(senha)
    }
  });

  if (usuarioExist.length) {
    user = usuarioExist[0];
    user.token = jwt.sign({ ID: String(user.ID) }, process.env.JWT_SECRET);

    // afiliados
    if (user.user_status === 1) {
      const afiliadoExist = await apiPratiquePro.afiliado.findMany({
        where: {
          email: email
        }
      });

      if (afiliadoExist.length) {
        user.isAffiliate = afiliadoExist.length ? afiliadoExist[0].idloja : 0;
      }
    } else {
      user.isAffiliate = 0;
    }
    user.companyId = "slxyQ9Eb17";
    // funcionario
    const funcionarioExists = await apiPratiqueFunciona.funcionarios.findMany({
      where: {
        email: email
      }
    });

    const professor = user.professor;
    const curriculo = user.curriculo;
    const cpf = user.cpf;
    const estado = user.estado;
    const cidade = user.cidade;
    const telefone = user.telefone;

    user.isEmployee = funcionarioExists.length ? 1 : 0;
    user.cargo = funcionarioExists.length ? funcionarioExists[0].cargo : 0;
    user.cpf = funcionarioExists.length ? funcionarioExists[0].cpf : 0;
    user.idUnid = funcionarioExists.length ? funcionarioExists[0].unidade : 0;
    user.curriculo = curriculo;
    user.professor = professor;
    user.cpf = cpf;
    user.cidade = cidade;
    user.estado = estado;
    user.telefone = telefone;

    // pacto
    const pactoExist = await apiPratiquePro.matriz.findMany({
      where: {
        matriz_email: email
      }
    });

    if (pactoExist.length) {
      const unidadeExist = await apiPratiquePro.unidade.findMany({
        where: {
          unidade_numero: pactoExist[0].matriz_unidade
        },
        select: {
          unidade_nome: true
        }
      });
      user.status = pactoExist[0].matriz_situacao;
      user.plano = pactoExist[0].matriz_plano;

      if (unidadeExist.length > 0) {
        user.unidade = unidadeExist[0].unidade_nome;
      } else {
        user.unidade = "Pratique Fitness";
      }

      // Verificar se matriz_tel existe antes de atribuir a user.telefone
      if (pactoExist[0].matriz_tel !== undefined) {
        user.telefone = pactoExist[0].matriz_tel;
      } else {
        user.telefone = null;
      }

      // Verificar se matriz_cpf existe antes de atribuir a user.cpf
      if (pactoExist[0].matriz_cpf !== undefined) {
        user.cpf = pactoExist[0].matriz_cpf;
      } else {
        user.cpf = null;
      }
    } else {
      user.status = null;
      user.plano = null;
      user.unidade = null;
      user.telefone = user.telefone ?? null;
      user.isAffiliate;
      //user.cpf = null
    }
    console.log("Valor de user.plano:", user.plano);

    // Verificação do termo "PERSONAL" no plano
    // if (user.plano?.includes('PERSONAL')) {
    //   user.isAffiliate = 1
    //}
  }

  res.status(200).json(utils.clearDatabaseResult([user]));
}
