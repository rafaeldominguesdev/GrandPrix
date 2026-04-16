import { Demanda, User, Resposta } from '@/types';
import { DemandaStatus, TipoBarreira } from '@/lib/constants';

// Mapeamento de Unidade para Estado (Sigla para combinar com GeoJSON)
export const UNIT_TO_STATE: Record<string, string> = {
  "EDISE - Rio de Janeiro": "RJ",
  "Refinaria REPLAN": "SP",
  "RPBC - Cubatão": "SP",
  "REGAP - Betim": "MG",
  "RLAM - Mataripe": "BA",
  "LUBNOR - Fortaleza": "CE",
  "CENPES - Rio": "RJ",
};

const UNIT_LOCATIONS: Record<string, [number, number]> = {
  "EDISE - Rio de Janeiro": [-22.9068, -43.1729],
  "Refinaria REPLAN": [-22.7610, -47.1539],
  "RPBC - Cubatão": [-23.8906, -46.4258],
  "REGAP - Betim": [-19.9702, -44.1534],
  "RLAM - Mataripe": [-12.6953, -38.5632],
  "LUBNOR - Fortaleza": [-3.7166, -38.4831],
  "CENPES - Rio": [-22.8596, -43.2323],
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Paula Souza',
    email: 'ana.souza@petrobras.com.br',
    role: 'USER',
    department: 'Recursos Humanos',
    unit: 'Sede Rio de Janeiro (EDISE)',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@petrobras.com.br',
    role: 'USER',
    department: 'Tecnologia da Informação',
    unit: 'Refinaria REPLAN',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Mariana Costa',
    email: 'mariana.costa@petrobras.com.br',
    role: 'ADMIN',
    department: 'Sustentabilidade e Acessibilidade',
    unit: 'Sede Rio de Janeiro (EDISE)',
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2023-11-01'),
  },
  {
    id: '4',
    name: 'Rafael Caldeira',
    email: 'rafael.caldeira@petrobras.com.br',
    role: 'USER',
    department: 'Design & UX',
    unit: 'CENPES - Rio',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '5',
    name: 'Ricardo Mendes',
    email: 'ricardo.mendes@petrobras.com.br',
    role: 'ADMIN',
    department: 'Engenharia e Infraestrutura',
    unit: 'Refinaria REPLAN',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '6',
    name: 'Juliana Rocha',
    email: 'juliana.rocha@petrobras.com.br',
    role: 'USER',
    department: 'TI / Acessibilidade Digital',
    unit: 'RPBC - Cubatão',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '7',
    name: 'Felipe Soares',
    email: 'felipe.soares@petrobras.com.br',
    role: 'ADMIN',
    department: 'Segurança e Saúde (SMS)',
    unit: 'REGAP - Betim',
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15'),
  },
];

export const mockRespostas: Resposta[] = [
  {
    id: 'r1',
    conteudo: 'Prezada Ana, seu relato foi recebido pela Gerência de Infraestrutura. Uma equipe técnica foi enviada ao local para realizar o nivelamento da rampa e instalar o corrimão conforme as normas de acessibilidade (ABNT NBR 9050).',
    autor: mockUsers[2],
    isAdminResponse: true,
    demandaId: '1',
    createdAt: new Date('2024-04-02'),
    updatedAt: new Date('2024-04-02'),
  },
];

// Gerar demandas extras simulando a triagem de IA
const generateMockDemandas = (): Demanda[] => {
  const base: Demanda[] = [
    {
      id: '1',
      titulo: 'Subestimação da minha capacidade analítica (Capacitismo)',
      descricao: 'Meu gestor consistentemente repassa tarefas de alta complexidade para outros colegas, acreditando que por causa da minha deficiência visual não consigo entregar planilhas avançadas, mesmo eu usando leitor de tela proficientemente.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: 'ALTA',
      categoria: { id: 'c3', nome: 'Cultura e Liderança' },
      tipoBarreira: { id: 'b3', slug: TipoBarreira.COMUNICACIONAL, nome: 'Atitudinal (Comportamental)' },
      unidade: 'EDISE - Rio de Janeiro',
      autor: mockUsers[3], // Rafael Caldeira (ID 4)
      respostas: mockRespostas,
      votos: 34,
      createdAt: '2024-04-01T10:00:00Z',
      updatedAt: '2024-04-03T14:30:00Z',
      coordinates: UNIT_LOCATIONS["EDISE - Rio de Janeiro"],
      aiAnalysis: {
        suggestedArea: 'Recursos Humanos / Diversidade',
        confidence: 0.96,
        isAttitudinal: true,
        summary: 'Relato claro de capacitismo e subestimação por liderança.',
        solucaoHistorica: {
          titulo: 'Trilha Anti-Capacitismo Lideranças 2023',
          norma: 'Política de Diversidade 4.1',
          link: '#'
        }
      }
    },
    {
      id: '2',
      titulo: 'Sistema SAP Inacessível via NVDA',
      descricao: 'Após a última atualização do ERP, os menus suspensos pararam de ser lidos pelo software NVDA, impossibilitando a aprovação de ordens de serviço por pessoas cegas.',
      status: DemandaStatus.NOVO,
      prioridade: 'URGENTE',
      categoria: { id: 'c2', nome: 'Sistemas Digitais' },
      tipoBarreira: { id: 'b2', slug: TipoBarreira.TECNOLOGICA, nome: 'Tecnológica' },
      unidade: 'Refinaria REPLAN',
      autor: mockUsers[1],
      respostas: [],
      votos: 89,
      createdAt: '2024-04-05T08:15:00Z',
      updatedAt: '2024-04-05T08:15:00Z',
      coordinates: UNIT_LOCATIONS["Refinaria REPLAN"],
      aiAnalysis: {
        suggestedArea: 'TIC (Tecnologia da Informação)',
        confidence: 0.99,
        clusterId: 'CLUSTER-SAP-2024',
        summary: 'Perda de compatibilidade ERP x Leitor de Tela',
        solucaoHistorica: {
          titulo: 'Adequação Portal Jurídico para NVDA',
          norma: 'WCAG 2.1 AA / NR-17',
          link: '#'
        }
      },
      iniciativaVinculada: {
        id: 'ini-sap-24',
        nome: 'Acessibilidade ERP Nacional',
        status: 'EM_PLANEJAMENTO'
      }
    },
    {
      id: '3',
      titulo: 'Ausência de Intérprete de Libras no Integra',
      descricao: 'Os vídeos obrigatórios de integração de SMS continuam sendo divulgados sem tradução para Libras, limitando a compreensão de medidas de segurança fundamentais.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: 'ALTA',
      categoria: { id: 'c1', nome: 'Treinamentos' },
      tipoBarreira: { id: 'b3', slug: TipoBarreira.COMUNICACIONAL, nome: 'Comunicacional' },
      unidade: 'RLAM - Mataripe',
      autor: mockUsers[2],
      respostas: [],
      votos: 15,
      createdAt: '2024-04-10T09:00:00Z',
      updatedAt: '2024-04-10T09:00:00Z',
      coordinates: UNIT_LOCATIONS["RLAM - Mataripe"],
      aiAnalysis: {
        suggestedArea: 'Educação Corporativa / SMS',
        confidence: 0.92,
        summary: 'Falta de conteúdo em Libras em curso obrigatório.'
      }
    },
  ];

  // Injetar mais demandas para simular impacto (RJ)
  for (let i = 4; i <= 15; i++) {
    base.push({
      id: String(i),
      titulo: `Barreira Sistêmica #${i} em Software Interno`,
      descricao: 'Problemas recorrentes de contraste e navegação por teclado em ferramenta administrativa.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: i % 2 === 0 ? 'MEDIA' : 'ALTA',
      categoria: { id: 'c2', nome: 'Sistemas Digitais' },
      tipoBarreira: { id: 'b2', slug: TipoBarreira.TECNOLOGICA, nome: 'Tecnológica' },
      unidade: 'EDISE - Rio de Janeiro',
      autor: mockUsers[3], // Rafael Caldeira (ID 4)
      respostas: [],
      votos: Math.floor(Math.random() * 10),
      createdAt: '2024-04-12T10:00:00Z',
      updatedAt: '2024-04-12T10:00:00Z',
      coordinates: UNIT_LOCATIONS["EDISE - Rio de Janeiro"],
      aiAnalysis: {
        suggestedArea: 'TIC',
        confidence: 0.88,
        clusterId: i % 3 === 0 ? 'CLUSTER-SAP-2024' : undefined,
      },
      iniciativaVinculada: i % 3 === 0 ? {
        id: 'ini-sap-24',
        nome: 'Acessibilidade ERP Nacional',
        status: 'EM_PLANEJAMENTO'
      } : undefined
    });
  }

  // Injetar relatos de barreira atitudinal (SP)
  for (let i = 16; i <= 20; i++) {
    base.push({
      id: String(i),
      titulo: `Comportamento Restritivo #${i}`,
      descricao: 'Relato de infantilização e brincadeiras não apropriadas relacionadas à deficiência física.',
      status: DemandaStatus.NOVO,
      prioridade: 'MEDIA',
      categoria: { id: 'c3', nome: 'Cultura e Liderança' },
      tipoBarreira: { id: 'b3', slug: TipoBarreira.COMUNICACIONAL, nome: 'Atitudinal (Comportamental)' },
      unidade: 'RPBC - Cubatão',
      autor: mockUsers[1],
      respostas: [],
      votos: 2,
      createdAt: '2024-04-14T08:00:00Z',
      updatedAt: '2024-04-14T08:00:00Z',
      coordinates: UNIT_LOCATIONS["RPBC - Cubatão"],
      aiAnalysis: {
        suggestedArea: 'Recursos Humanos',
        confidence: 0.95,
        isAttitudinal: true,
      }
    });
  }

  return base;
};

export const mockDemandas = generateMockDemandas();
