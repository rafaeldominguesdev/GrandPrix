"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import { mockDemandas } from "@/lib/mock-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// URL local para o GeoJSON dos estados do Brasil
const geoUrl = "/brazil.json";

export function BrazilHeatmap() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Agrupar demandas por unidade/coordenada para calcular o volume
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
    
    // Se tiver mais de 2 demandas, marcar como Crítico para o exemplo
    if (acc[key].count > 2) {
      acc[key].status = "Crítico";
    }
    
    return acc;
  }, {} as Record<string, { name: string, coordinates: [number, number], count: number, status: string }>);

  const statsArray = Object.values(unitStats);

  if (!mounted) return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm overflow-hidden h-[630px] flex items-center justify-center">
      <p className="text-slate-400 font-medium animate-pulse">Carregando mapa interativo...</p>
    </div>
  );

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Visão Geográfica</h3>
          <p className="text-sm font-medium text-slate-500">Distribuição de demandas por unidades operacionais.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#008542]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Estável</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Atenção</span>
          </div>
        </div>
      </div>

      <div className="relative h-[550px] w-full bg-slate-50/50 rounded-xl border border-slate-100 cursor-grab active:cursor-grabbing">
        <TooltipProvider>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 850,
              center: [-54, -15]
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className="fill-white stroke-slate-200 hover:fill-slate-50 transition-colors duration-300"
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
                const markerSize = Math.max(6, Math.min(12, 6 + count * 2));

                return (
                  <Marker key={name} coordinates={[coordinates[1], coordinates[0]] as any}>
                    <Tooltip>
                      <TooltipTrigger>
                        <g className="cursor-pointer group">
                          <circle
                            r={markerSize + 4}
                            fill={isCritical ? "#f59e0b20" : "#00854220"}
                            className="animate-pulse"
                          />
                          <circle
                            r={markerSize}
                            fill={isCritical ? "#f59e0b" : "#008542"}
                            className="stroke-white stroke-2 shadow-xl"
                          />
                        </g>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="p-3 bg-white border-slate-200 shadow-xl rounded-lg">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</p>
                          <p className="text-sm font-bold text-slate-900">{name}</p>
                          <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 mt-2">
                            <div className="text-center">
                              <p className="text-[8px] font-black text-slate-400 uppercase">Demandas</p>
                              <p className="text-xs font-bold text-slate-900">{count}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] font-black text-slate-400 uppercase">Status</p>
                              <p className={cn(
                                "text-xs font-bold",
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
            </ZoomableGroup>
          </ComposableMap>
        </TooltipProvider>
      </div>
    </div>
  );
}
