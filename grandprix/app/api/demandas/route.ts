import { NextResponse } from "next/server";
import * as z from "zod";
import { TipoBarreira } from "@/lib/constants";
import { createDemanda, listDemandas } from "@/lib/server/demandas-store";

const createSchema = z.object({
  titulo: z.string().min(10),
  descricao: z.string().min(30),
  tipoBarreira: z.nativeEnum(TipoBarreira),
  unidade: z.string().optional(),
  authorId: z.string().optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const authorId = url.searchParams.get("authorId") ?? undefined;
  const demandas = await listDemandas({ authorId });
  return NextResponse.json({ data: demandas });
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const demanda = await createDemanda(parsed.data);
  return NextResponse.json({ data: demanda }, { status: 201 });
}

