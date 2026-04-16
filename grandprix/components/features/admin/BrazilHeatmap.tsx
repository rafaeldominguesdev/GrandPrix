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
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Carregando Geointeligência...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full relative group bg-white rounded-[48px] border border-slate-200 shadow-[0_0_80px_-20px_rgba(0,133,66,0.1)] overflow-hidden">
      
      {/* Título Superior */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h3 className="text-3xl font-black text-slate-900 leading-none tracking-tighter uppercase">Mapa de Risco</h3>
        <p className="text-sm font-black text-[#008542] tracking-[0.3em] uppercase opacity-70">Monitoramento Nacional</p>
      </div>

      {/* Legenda Flutuante (Canto Inferior Esquerdo conforme solicitado) */}
      <div className="absolute bottom-10 left-10 z-10 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl p-6 rounded-[32px] border border-slate-200/50 shadow-2xl w-[240px] space-y-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Níveis de Demanda</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Estável</span>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">0-1 DEM.</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
                <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Atenção</span>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">2-9 DEM.</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]" />
                <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Crítico</span>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">10+ DEM.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Container do Mapa (Visão Ampla) */}
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
            {/* Definição do Gradiente Petrobras (Fidelidade Máxima) */}
            <defs>
              <linearGradient id="petrobrasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#008542" />
                <stop offset="100%" stopColor="#FFD100" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

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
                      className="transition-all duration-300 cursor-pointer outline-none"
                      style={{
                        default: { outline: "none" },
                        hover: { 
                          stroke: "url(#petrobrasGradient)",
                          strokeWidth: 4,
                          fill: fillColor,
                          filter: "url(#glow)",
                          transition: "all 300ms"
                        },
                        pressed: { outline: "none" }
                      }}
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
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Unidade Operacional</p>
                          <p className="text-base font-bold text-slate-900 leading-tight">{name}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                            <div>
                              <p className="text-xs font-black text-slate-400 uppercase">Demandas</p>
                              <p className="text-lg font-black text-slate-900">{count}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-slate-400 uppercase">Status</p>
                                <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-md uppercase">Ativa</span>
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

    </div>
  );
}
