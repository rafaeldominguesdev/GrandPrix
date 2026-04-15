import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Demanda } from "@/types/demanda";
import { DemandBadge } from "./DemandBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { ChevronRight, MessageSquare, MapPin } from "lucide-react";
import { BARREIRA_LABELS, TipoBarreira } from "@/lib/constants";

interface DemandTableProps {
  data: Demanda[];
  isAdmin?: boolean;
}

export function DemandTable({ data, isAdmin }: DemandTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="w-[400px] text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4">Título da Demanda</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4">Status</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4">Tipo</TableHead>
            {isAdmin && <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4">Autor</TableHead>}
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4">Data</TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-slate-500 py-4">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isAdmin ? 6 : 5} className="h-32 text-center text-slate-400 font-medium">
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          ) : (
            data.map((demanda) => (
              <TableRow key={demanda.id} className="group transition-colors border-slate-50 hover:bg-slate-50/50">
                <TableCell className="py-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-900 group-hover:text-[#008542] transition-colors">
                      {demanda.titulo}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <MapPin className="w-3 h-3" />
                      {demanda.unidade || "Global"}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <DemandBadge status={demanda.status} />
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">
                    {(BARREIRA_LABELS as any)[demanda.tipoBarreira.slug]}
                  </span>
                </TableCell>
                {isAdmin && (
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#008542]/10 flex items-center justify-center text-[10px] font-black text-[#008542]">
                        {demanda.autor.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{demanda.autor.name}</span>
                    </div>
                  </TableCell>
                )}
                <TableCell className="py-4">
                  <span className="text-xs text-slate-500 font-medium">
                    {format(new Date(demanda.createdAt), "dd MMM, yyyy", { locale: ptBR })}
                  </span>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-2">
                    {demanda.respostas.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-[#008542] mr-3">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {demanda.respostas.length}
                      </div>
                    )}
                    <Link href={`/${isAdmin ? "admin" : "user"}/demandas/${demanda.id}`}>
                      <button className="p-2.5 rounded-xl hover:bg-[#008542]/5 transition-colors text-slate-400 hover:text-[#008542]">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
