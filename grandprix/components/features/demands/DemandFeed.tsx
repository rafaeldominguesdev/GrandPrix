"use client";

import { Demanda } from "@/types";
import { DemandRow } from "./DemandRow";

interface DemandFeedProps {
  data: Demanda[];
  isAdmin?: boolean;
}

export function DemandFeed({ data, isAdmin = false }: DemandFeedProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">Nenhum relato encontrado</h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto mt-1">
          Não há demandas registradas que correspondam aos filtros selecionados no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((demanda) => (
        <DemandRow key={demanda.id} demanda={demanda} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
