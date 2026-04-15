"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { mockDemandas } from "@/lib/mock-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geoUrl = "/brazil.json";

export function BrazilHeatmap() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const unitStats = mockDemandas.reduce((acc, demanda) => {
    if (!demanda.coordinates) return acc;
    
    const key = demanda.unidade || "Desconhecida";
    if (!acc[key]) {
      acc[key] = {
        name: key,
        coordinates: demanda.coordinates,
        count: 0,
        status: "Estável"
      };
    }
    acc[key].count += 1;
    if (acc[key].count > 2) acc[key].status = "Crítico";
    return acc;
  }, {} as Record<string, { name: string, coordinates: [number, number], count: number, status: string }>);

  const statsArray = Object.values(unitStats);

  if (!mounted) return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-[650px] flex items-center justify-center">
      <p className="text-slate-400 font-medium animate-pulse">Carregando mapa interativo...</p>
    </div>
  );

  return (
    <div className="w-full relative group">
      {/* Informações Sobrepostas (Repposicionadas) */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Visão Geográfica</h3>
        <p className="text-xs font-bold text-[#008542] tracking-[0.2em] uppercase mt-1">Status Operacional</p>
        <p className="text-sm font-medium text-slate-400 mt-2 max-w-[240px]">
          Distribuição de demandas de acessibilidade por unidades Petrobras.
        </p>
        
        <div className="flex gap-6 mt-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-sm w-fit pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#008542] shadow-[0_0_10px_rgba(0,133,66,0.4)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Estável</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Atenção</span>
          </div>
        </div>
      </div>

      {/* Container do Mapa (Grande + Respiro Interno conforme solicitado) */}
      <div className="relative h-[700px] w-full bg-white rounded-[40px] border border-slate-200 shadow-[0_0_50px_-12px_rgba(0,133,66,0.25)] flex items-center justify-center overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_0_60px_-10px_rgba(0,133,66,0.35)]">
        <TooltipProvider>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 800,
              center: [-54, -15]
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="fill-slate-50 stroke-slate-200 hover:fill-slate-100 transition-colors duration-300"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" }
                    }}
                  />
                ))
              }
            </Geographies>

            {statsArray.map(({ name, coordinates, count, status }) => {
              const isCritical = status === "Crítico";
              const markerSize = Math.max(8, Math.min(16, 8 + count * 3));

              return (
                <Marker key={name} coordinates={[coordinates[1], coordinates[0]] as any}>
                  <Tooltip>
                    <TooltipTrigger>
                      <g className="cursor-pointer group/marker">
                        <circle
                          r={markerSize + 6}
                          fill={isCritical ? "#f59e0b20" : "#00854220"}
                          className="animate-pulse"
                        />
                        <circle
                          r={markerSize}
                          fill={isCritical ? "#f59e0b" : "#008542"}
                          className="stroke-white stroke-[3px] shadow-2xl transition-transform duration-300 group-hover/marker:scale-125"
                        />
                      </g>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="p-4 bg-white border-slate-200 shadow-2xl rounded-2xl">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</p>
                        <p className="text-base font-bold text-slate-900">{name}</p>
                        <div className="flex items-center justify-between gap-6 pt-3 border-t border-slate-100 mt-3">
                          <div className="flex flex-col">
                            <p className="text-[9px] font-black text-slate-400 uppercase">Total Demandas</p>
                            <p className="text-sm font-black text-slate-900">{count}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-black text-slate-400 uppercase">Status</p>
                            <p className={cn(
                              "text-sm font-black uppercase tracking-tighter",
                              isCritical ? "text-amber-500" : "text-[#008542]"
                            )}>
                              {status}
                            </p>
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
