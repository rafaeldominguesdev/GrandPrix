import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Demanda } from "@/types/demanda";
import { DemandaStatus, TipoBarreira } from "@/lib/constants";
import { mockDemandas, mockUsers } from "@/lib/mock-data";

type CreateDemandaBody = {
  titulo: string;
  descricao: string;
  tipoBarreira: TipoBarreira;
  unidade?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "demandas.json");

async function ensureSeeded(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
    return;
  } catch {
    // continue
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  const seed = Array.isArray(mockDemandas) ? mockDemandas : [];
  await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2), "utf8");
}

async function readAll(): Promise<Demanda[]> {
  await ensureSeeded();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw) as Demanda[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeAll(demandas: Demanda[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(demandas, null, 2), "utf8");
}

function categoriaFromTipo(tipo: TipoBarreira): { id: string; nome: string } {
  switch (tipo) {
    case TipoBarreira.TECNOLOGICA:
      return { id: "c2", nome: "Sistemas Digitais" };
    case TipoBarreira.COMUNICACIONAL:
      return { id: "c1", nome: "Treinamentos" };
    case TipoBarreira.ATITUDINAL:
    case TipoBarreira.CULTURAL:
    case TipoBarreira.INSTITUCIONAL:
      return { id: "c3", nome: "Cultura e Liderança" };
    default:
      return { id: "c0", nome: "Infraestrutura" };
  }
}

function coordsFromUnidade(unidade?: string): [number, number] | undefined {
  if (!unidade) return undefined;
  const match = mockDemandas.find((d) => d.unidade === unidade && d.coordinates);
  return match?.coordinates;
}

export async function listDemandas(input?: { authorId?: string }): Promise<Demanda[]> {
  const all = await readAll();
  const filtered = input?.authorId ? all.filter((d) => d.autor?.id === input.authorId) : all;
  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getDemandaById(id: string): Promise<Demanda | null> {
  const all = await readAll();
  return all.find((d) => d.id === id) ?? null;
}

export async function createDemanda(body: CreateDemandaBody & { authorId?: string }): Promise<Demanda> {
  const all = await readAll();

  const now = new Date().toISOString();
  const id = randomUUID();
  const author = mockUsers.find((u) => u.id === (body.authorId ?? "1")) ?? mockUsers[0];

  const demanda: Demanda = {
    id,
    titulo: body.titulo,
    descricao: body.descricao,
    status: DemandaStatus.NOVA,
    prioridade: "MEDIA",
    categoria: categoriaFromTipo(body.tipoBarreira),
    tipoBarreira: { id: `b-${body.tipoBarreira}`, slug: body.tipoBarreira, nome: body.tipoBarreira },
    unidade: body.unidade?.trim() ? body.unidade.trim() : undefined,
    autor: author,
    respostas: [],
    votos: 0,
    createdAt: now,
    updatedAt: now,
    coordinates: coordsFromUnidade(body.unidade),
    aiAnalysis: {
      suggestedArea: "Triagem automática",
      confidence: 0.0,
      summary: "Aguardando análise.",
    },
  };

  const next = [demanda, ...all];
  await writeAll(next);
  return demanda;
}

