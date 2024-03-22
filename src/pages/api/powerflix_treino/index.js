import {apiPratiquePro} from '@/services'

export default async function handler(req, res) {
  
  const {ficha, nome} = req.body
  
  const powerflix = {
    bumbum_na_lua: {
      nome: 'BUMBUM NA LUA',
      treino: [{
        nivel: 'LIGHT',
        nome: 'BUMBUM NA LUA LIGHT',
        serie: 3,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        nivel: 'SOFT',
        nome: 'BUMBUM NA LUA SOFT',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        nivel: 'HARD',
        alias: 'HARD',
        nome: 'BUMBUM NA LUA HARD',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN. E 30 SEG.',
        exercicios: [],
      }],
    },
    coxa_sonhos: {
      nome: 'COXA DOS SONHOS',
      treino: [{
        alias: 'LIGHT',
        nome: 'COXA DOS SONHOS LIGHT',
        serie: 3,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'COXA DOS SONHOS SOFT',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'COXA DOS SONHOS HARD',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN. E 30 SEG.',
        exercicios: [],
      }],
    },
    posterior_invejavel: {
      nome: 'POSTERIOR INVEJÁVEL',
      treino: [{
        alias: 'LIGHT',
        nome: 'POSTERIOR INVEJÁVEL LIGHT',
        serie: 3,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'POSTERIOR INVEJÁVEL SOFT',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'POSTERIOR INVEJÁVEL HARD',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN. E 30 SEG.',
        exercicios: [],
      }],
    },
    biceps_pedra: {
      nome: 'BÍCEPS DE PEDRA',
      treino: [{
        alias: 'LIGHT',
        nome: 'BÍCEPS DE PEDRA LIGHT',
        serie: 3,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'BÍCEPS DE PEDRA SOFT',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'BÍCEPS DE PEDRA HARD',
        serie: 4,
        repeticao: 'ATÉ A FALHA',
        recuperacao: '1 MIN. E 30 SEG.',
        exercicios: [],
      }],
    },
    costas_morcego: {
      nome: 'COSTAS ASAS DE MORCEGO',
      treino: [{
        alias: 'LIGHT',
        nome: 'COSTAS ASAS DE MORCEGO LIGHT',
        serie: 3,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'COSTAS ASAS DE MORCEGO SOFT',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'COSTAS ASAS DE MORCEGO HARD',
        serie: 4,
        repeticao: 11,
        recuperacao: '1 MIN. E 30 SEG.',
        exercicios: [],
      }],
    },
    peitoral_arnold: {
      nome: 'PEITORAL DO ARNOLD',
      treino: [{
        alias: 'LIGHT',
        nome: 'PEITORAL DO ARNOLD LIGHT',
        serie: 3,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'PEITORAL DO ARNOLD SOFT',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'PEITORAL DO ARNOLD HARD',
        serie: 4,
        repeticao: 11,
        recuperacao: '1 MIN. E 30 SEG.',
        exercicios: [],
      }],
    },
    footvolley: {
      nome: 'FUTEVÔLEI',
      treino: [{
        alias: 'LIGHT',
        nome: 'FUTEVÔLEI LIGHT',
        serie: 1,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'FUTEVÔLEI SOFT',
        serie: 2,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'FUTEVÔLEI HARD',
        serie: 3,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      }],
    },
    beach_tennis: {
      nome: 'BEACH TENNIS',
      treino: [{
        alias: 'LIGHT',
        nome: 'BEACH TENNIS LIGHT',
        serie: 1,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'BEACH TENNIS SOFT',
        serie: 2,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'BEACH TENNIS HARD',
        serie: 3,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      }],
    },
    bike_lovers: {
      nome: 'BIKE LOVERS',
      treino: [{
        alias: 'LIGHT',
        nome: 'BIKE LOVERS LIGHT',
        serie: 1,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'BIKE LOVERS SOFT',
        serie: 2,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'BIKE LOVERS HARD',
        serie: 3,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      }],
    },
    bolt: {
      nome: 'TREINO DO BOLT',
      treino: [{
        alias: 'LIGHT',
        nome: 'TREINO DO BOLT LIGHT',
        serie: 1,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'TREINO DO BOLT SOFT',
        serie: 2,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'TREINO DO BOLT HARD',
        serie: 3,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      }],
    },
    wilson: {
      nome: 'BORA JOGAR VÔLEI WILSON?',
      treino: [{
        alias: 'LIGHT',
        nome: 'BORA JOGAR VÔLEI WILSON? LIGHT',
        serie: 1,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'BORA JOGAR VÔLEI WILSON? SOFT',
        serie: 2,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'BORA JOGAR VÔLEI WILSON? HARD',
        serie: 3,
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      }],
    },
    pretemporada: {
      nome: 'PRÉ TEMPORADA',
      treino: [{
        alias: 'LIGHT',
        nome: 'PRÉ TEMPORADA LIGHT',
        serie: '',
        repeticao: '',
        recuperacao: '',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'PRÉ TEMPORADA SOFT',
        serie: '',
        repeticao: '',
        recuperacao: '',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'PRÉ TEMPORADA HARD',
        serie: '',
        repeticao: '',
        recuperacao: '',
        exercicios: [],
      }],
    },
    abdomem_chapado: {
      nome: 'ABDÔMEN CHAPADO',
      treino: [{
        alias: 'LIGHT',
        nome: 'ABDÔMEN CHAPADO LIGHT',
        serie: 3,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'ABDÔMEN CHAPADO SOFT',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'ABDÔMEN CHAPADO HARD',
        serie: 4,
        repeticao: 'ATÉ A FALHA',
        recuperacao: '1 MIN',
        exercicios: [],
      }],
    },
    adaptativo: {
      nome: 'TREINO ADAPTATIVO',
      treino: [{
        alias: '',
        nome: 'TREINO ADAPTATIVO',
        serie: '2X 6',
        repeticao: 10,
        recuperacao: '1 MIN',
        exercicios: [],
      }]
    },
    pochetinha: {
      nome: ''
    },
    imunidade_total: {
      nome: 'IMUNIDADE TOTAL',
      treino: [{
        alias: 'LIGHT',
        nome: 'IMUNIDADE TOTAL LIGHT',
        serie: 3,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'SOFT',
        nome: 'IMUNIDADE TOTAL SOFT',
        serie: 4,
        repeticao: 9,
        recuperacao: '1 MIN',
        exercicios: [],
      },
      {
        alias: 'HARD',
        nome: 'IMUNIDADE TOTAL HARD',
        serie: 4,
        repeticao: 11,
        recuperacao: '1 MIN. E 30 SEG.',
        exercicios: [],
      }],
    },
  };
  
  const exercicios = await apiPratiquePro.exercicio.findMany();
  
  const montagemTreino = (treino, index) => {
    videos = treino.treinos.split(',');
    videos.pop();
    powerflix[ficha].treino[index].exercicios = [...powerflix[ficha].treino[index].exercicios, ...videos.map(
      video => exercicios.find(exercicio => exercicio.exercicio_id === parseInt(video))
    )];
  }
  
  let conditions = undefined === req.body.nome ? powerflix[ficha].nome : nome;

  const treinos = await apiPratiquePro.ficha_pre.findMany({
    where: {
      nome: conditions
    },
  });
  
  let videos = [];
  treinos.map((treino) => {
    if(treino.valores.includes('n=1')) {
      montagemTreino(treino, 0);
    } else if(treino.valores.includes('n=2')) {
      montagemTreino(treino, 1);
    } else {
      montagemTreino(treino, 2);
    }
  });
  
  res.status(200).json(powerflix[ficha]);
}
