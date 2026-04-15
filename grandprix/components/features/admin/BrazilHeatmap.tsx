"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { mockDemandas, UNIT_TO_STATE } from "@/lib/mock-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geoUrl = "/brazil.json";

// Cores Institucionais Refinadas
const STATUS_COLORS = {
  STABLE: "#10b981",    
  ATTENTION: "#f59e0b",  
  CRITICAL: "#ef4444",   
  EMPTY: "#f1f5f9"       
};

export function BrazilHeatmap() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Processamento de Dados
  const stateStats = mockDemandas.reduce((acc, demanda) => {
    if (!demanda.unidade) return acc;
    const stateSigla = UNIT_TO_STATE[demanda.unidade];
    if (!stateSigla) return acc;

    if (!acc[stateSigla]) {
      acc[stateSigla] = { count: 0, status: "Estável" };
    }

    if (["NOVA", "EM_ANALISE", "EM_ANDAMENTO"].includes(demanda.status)) {
      acc[stateSigla].count += 1;
    }

    if (acc[stateSigla].count >= 10) {
      acc[stateSigla].status = "Crítico";
    } else if (acc[stateSigla].count >= 2) {
      acc[stateSigla].status = "Atenção";
    }

    return acc;
  }, {} as Record<string, { count: number, status: string }>);

  const unitStats = mockDemandas.reduce((acc, demanda) => {
    if (!demanda.coordinates || !demanda.unidade) return acc;
    const key = demanda.unidade;
    if (!acc[key]) {
      acc[key] = { name: key, coordinates: demanda.coordinates, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {} as Record<string, { name: string, coordinates: [number, number], count: number }>);

  const unitsArray = Object.values(unitStats);

  if (!mounted) return (
    <div className="w-full bg-white rounded-[48px] border border-slate-200 p-8 shadow-sm h-[700px] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#008542] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Carregando Geointeligência...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full relative group bg-white rounded-[48px] border border-slate-200 shadow-[0_0_80px_-20px_rgba(0,133,66,0.1)] overflow-hidden">
      
      {/* Título Superior */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h3 className="text-3xl font-black text-slate-900 leading-none tracking-tighter uppercase">Mapa de Risco</h3>
        <p className="text-[10px] font-black text-[#008542] tracking-[0.3em] uppercase opacity-70">Monitoramento Nacional</p>
      </div>

      {/* Legenda Flutuante (Canto Inferior Esquerdo conforme solicitado) */}
      <div className="absolute bottom-10 left-10 z-10 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl p-6 rounded-[32px] border border-slate-200/50 shadow-2xl w-[240px] space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Níveis de Demanda</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <span className="text-[11px] font-bold text-slate-600 uppercase">Estável</span>
              </div>
              <span className="text-[9px] font-black text-slate-400">0-1</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                <span className="text-[11px] font-bold text-slate-600 uppercase">Atenção</span>
              </div>
              <span className="text-[9px] font-black text-slate-400">2-9</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                <span className="text-[11px] font-bold text-slate-600 uppercase">Crítico</span>
              </div>
              <span className="text-[9px] font-black text-slate-400">10+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Área do Mapa (Visão Ampla) */}
      <div className="h-[730px] flex items-center justify-center p-8 bg-slate-50/20">
        <TooltipProvider>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 850,
              center: [-54, -15]
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {/* Camada Térmica dos Estados */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stats = stateStats[geo.properties?.sigla];
                  const fillColor = stats 
                    ? (stats.status === "Crítico" ? STATUS_COLORS.CRITICAL : (stats.status === "Atenção" ? STATUS_COLORS.ATTENTION : STATUS_COLORS.STABLE))
                    : STATUS_COLORS.EMPTY;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      className="transition-all duration-500 hover:fill-slate-200 cursor-default outline-none"
                    />
                  );
                })
              }
            </Geographies>

            {/* Camada de Unidades Operacionais */}
            {unitsArray.map(({ name, coordinates, count }) => {
              const markerSize = Math.max(7, Math.min(14, 7 + count * 2));

              return (
                <Marker key={name} coordinates={[coordinates[1], coordinates[0]] as any}>
                  <Tooltip>
                    <TooltipTrigger>
                      <g className="cursor-pointer group/marker">
                        <circle
                          r={markerSize + 5}
                          fill="rgba(255,255,255,0.4)"
                          className="animate-pulse"
                        />
                        <circle
                          r={markerSize}
                          fill="#0f172a"
                          className="stroke-white stroke-[2.5px] transition-all duration-300 group-hover/marker:scale-125 shadow-2xl"
                        />
                      </g>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="p-4 bg-white border-slate-200 shadow-2xl rounded-2xl max-w-xs">
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade Operacional</p>
                          <p className="text-base font-bold text-slate-900 leading-tight">{name}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase">Demandas</p>
                              <p className="text-lg font-black text-slate-900">{count}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[9px] font-black text-slate-400 uppercase">Status</p>
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md uppercase">Ativa</span>
                            </div>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </Marker>
              );
            })}
          </ComposableMap>
        </TooltipProvider>
      </div>

      {/* Insights SideBadge (Redesenhado para não poluir) */}
      <div className="absolute bottom-10 right-10 z-10">
        <div className="bg-slate-900 text-white p-5 rounded-[28px] shadow-2xl flex items-center gap-4 border border-white/10 max-w-[320px]">
          <div className="w-10 h-10 bg-[#ef4444] rounded-full flex items-center justify-center animate-pulse shrink-0">
             <span className="text-lg font-black italic">!</span>
          </div>
          <div>
            <p className="text-[8px] font-black text-red-400 uppercase tracking-[0.2em] mb-1">Alerta de Crise</p>
            <p className="text-[11px] font-medium leading-tight">
              O <span className="text-white font-bold">Rio de Janeiro</span> ultrapassou o limite operacional (10+).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
