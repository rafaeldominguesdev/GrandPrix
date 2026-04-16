import { NextResponse } from "next/server";
import { getDemandaById } from "@/lib/server/demandas-store";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const demanda = await getDemandaById(id);
  if (!demanda) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ data: demanda });
}

