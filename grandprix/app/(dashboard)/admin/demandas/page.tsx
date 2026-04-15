"use client";

import { mockDemandas } from "@/lib/mock-data";
import { DataTable } from "@/components/features/demands/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Demanda } from "@/types/demanda";
import { DemandBadge } from "@/components/features/demands/DemandBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowRight, Download, Filter } from "lucide-react";
import Link from "next/link";
import { BARREIRA_LABELS } from "@/lib/constants";

const columns: ColumnDef<Demanda>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {row.getValue<string>("id").split("-")[0]}
      </span>
    ),
  },
  {
    accessorKey: "titulo",
    header: "Título da Demanda",
    cell: ({ row }) => (
      <div className="flex flex-col max-w-[300px]">
        <span className="font-bold text-slate-900 line-clamp-1">{row.getValue("titulo")}</span>
        <span className="text-[10px] text-slate-400 font-medium truncate">{row.original.unidade || "Global"}</span>
      </div>
    ),
  },
  {
    accessorKey: "tipoBarreira",
    header: "Tipo",
    cell: ({ row }) => (
      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">
        {(BARREIRA_LABELS as any)[row.original.tipoBarreira.slug]}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DemandBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => (
      <span className="text-xs text-slate-500 font-medium">
        {format(new Date(row.getValue("createdAt")), "dd MMM yyyy", { locale: ptBR })}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Link href={`/admin/demandas/${row.original.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#008542]/5 hover:text-[#008542]">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default function AdminDemandListPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Triagem de Demandas</h1>
          <p className="text-sm font-medium text-slate-500">Gestão centralizada de todos os relatos de acessibilidade da Petrobras.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 px-6 font-bold uppercase tracking-widest text-[10px] border-slate-200">
            <Download className="w-4 h-4 mr-2" />
            Exportar XLS
          </Button>
          <Button className="h-11 px-8 bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-widest text-[10px]">
            Relatórios
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="sm" className="bg-[#008542]/10 text-[#008542] font-black text-[10px] uppercase tracking-widest rounded-full px-4">
               Todas
             </Button>
             <Button variant="ghost" size="sm" className="text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-full px-4">
               Novas
             </Button>
             <Button variant="ghost" size="sm" className="text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-full px-4">
               Pendentes
             </Button>
          </div>
          <Button variant="outline" size="sm" className="text-[10px] font-bold uppercase tracking-widest border-slate-200">
            <Filter className="w-3.5 h-3.5 mr-2" />
            Mais Filtros
          </Button>
        </div>

        <DataTable columns={columns} data={mockDemandas} />
      </div>
    </div>
  );
}
