export default async function apiPratiqueTec(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Método não permitido" });
    return;
  }

  try {
    // Atualizamos o objeto de perguntas com as exclusões e ajustes
    const perguntasDiagnose = [
      {
        id: 1,
        pergunta: "Quer ter mais auto estima?",
        respostas: ["sim", "não"],
        regra: [{ sim: "2" }, { não: "2" }]
      },
      {
        id: 2,
        pergunta: "Como está seu sono?",
        respostas: ["bem", "regular", "mal"],
        regra: [{ bem: "3" }, { mal: "3" }, { regular: "3" }]
      },
      {
        id: 3,
        pergunta: "Você sofre de ansiedade?",
        respostas: ["sim", "não"],
        regra: [{ sim: "4" }, { não: "4" }]
      },
      {
        id: 4,
        pergunta: "Você passa mais tempo no seu dia?",
        respostas: ["pé", "sentado"],
        regra: [{ pé: "6" }, { sentado: "6" }] // Ajustamos a regra para que continue o fluxo
      },
      // Removemos a pergunta duplicada "Você passa mais tempo no seu dia?" (ID 5)
      {
        id: 6,
        pergunta: "Sofre de stress no dia-a-dia?",
        respostas: ["sim", "não"],
        regra: [{ sim: "7" }, { não: "7" }]
      },
      {
        id: 7,
        pergunta: "Você se sente frequentemente indisposto(a)?",
        respostas: ["sim", "não"],
        regra: [{ sim: "8" }, { não: "8" }]
      },
      {
        id: 8,
        pergunta: "Quer aumentar sua imunidade?",
        respostas: ["sim", "não"],
        regra: [{ sim: "9" }, { não: "9" }]
      },
      {
        id: 9,
        pergunta: "Você sente dores articulares?",
        respostas: ["sim", "não"],
        regra: [{ sim: "10" }, { não: "11" }]
      },
      {
        id: 10,
        pergunta: "Quais são suas dores?",
        respostas: ["coluna", "joelhos", "pernas", "cabeça", "ombros", "outros"],
        regra: [
          { coluna: "11" },
          { joelhos: "11" },
          { pernas: "11" },
          { cabeça: "11" },
          { ombros: "11" },
          { outros: "11" }
        ]
        // No frontend, a lógica para múltipla escolha deve ser implementada.
      },
      {
        id: 11,
        pergunta: "Qual modalidade você tem interesse?",
        respostas: [
          "Musculação + Aeróbicos",
          "Aulas Coletivas",
          "Natação / Hidro",
          "Personal Class"
        ],
        regra: [
          { "Musculação + Aeróbicos": "12" },
          { "Aulas Coletivas": "12" },
          { "Natação / Hidro": "12" },
          { "Personal Class": "12" }
        ]
      },
      {
        id: 12,
        pergunta: "Você tem pressão alta ou já foi diagnosticado com algum problema do coração?",
        respostas: ["sim", "não"],
        regra: [{ sim: "13" }, { não: "13" }]
      },
      {
        id: 13,
        pergunta: "Você tem problemas com o seu nível de açúcar no sangue?",
        respostas: ["sim", "não"],
        regra: [{ sim: "14" }, { não: "14" }]
      },
      {
        id: 14,
        pergunta: "O que é mais importante para você agora?",
        respostas: ["peso", "massa", "qualidade"],
        regra: [{ peso: "15" }, { massa: "15" }, { qualidade: "15" }]
      },
      {
        id: 15,
        pergunta: "Você prefere treinar quantos dias por semana?",
        respostas: ["De 1 a 3 dias", "De 4 a 6 dias"],
        regra: [{ "De 1 a 3 dias": "16" }, { "De 4 a 6 dias": "16" }]
      },
      {
        id: 16,
        pergunta:
          "Por quanto tempo você já praticou exercício físico regular em academias na sua vida?",
        respostas: ["6 meses", "1 ano", "2 anos", "+3 anos"],
        regra: null // Indica que não há próxima pergunta
      }
    ];

    // Retornar o objeto diretamente em vez de buscar de uma API
    res.status(200).json(perguntasDiagnose);
  } catch (error) {
    console.log("error", error);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
}
