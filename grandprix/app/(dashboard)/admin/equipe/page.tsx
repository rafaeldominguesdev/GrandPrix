"use client";

import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  BadgeCheck, 
  Settings2, 
  ExternalLink,
  Plus,
  Search,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/lib/mock-data";
import * as React from "react";

export default function AdminEquipePage() {
  const specialists = mockUsers.filter(u => u.id !== '4'); // Excluir o usuário "Rafael" para focar na equipe de resposta

  return (
    <div className="space-y-10">
      {/* Header Institucional */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#008542] mb-1">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Painel de Gestão</span>
          </div>
          <h1 className="title-font text-4xl font-black tracking-tight text-slate-900 uppercase">Equipe de Resposta</h1>
          <p className="title-font text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">
            Gerencie permissões e atribua casos para os especialistas de acessibilidade de cada unidade. 
            Monitore a carga de trabalho e o tempo de resposta institucional.
          </p>
        </div>
        <Button className="h-12 px-6 bg-[#008542] hover:bg-[#006e36] text-white font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-[#008542]/20 gap-2 transition-all">
          <Plus className="w-4 h-4" />
          Adicionar Especialista
        </Button>
      </div>

      {/* Cards de Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Equipe</p>
                <p className="text-2xl font-black text-slate-900">{specialists.length} Profissionais</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#008542]/10 text-[#008542] group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Unidades Ativas</p>
                <p className="text-2xl font-black text-slate-900">4 Unidades</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Casos sob Análise</p>
                <p className="text-2xl font-black text-slate-900">12 Pendências</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Gestão de Especialistas */}
      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Buscar especialista ou unidade..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-600 focus:bg-white focus:ring-1 focus:ring-[#008542]/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
               Filtros Avançados
             </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-left py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Especialista</th>
                <th className="text-left py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Departamento / Unidade</th>
                <th className="text-left py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="text-left py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Carga</th>
                <th className="text-right py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {specialists.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          {user.name}
                          {user.role === 'ADMIN' && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{user.department}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                        <MapPin className="w-3 h-3" /> {user.unit}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Ativo
                    </span>
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Casos</span>
                        <span className="text-slate-900">3/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#008542] rounded-full" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-[#008542]/10 hover:text-[#008542]">
                        <Settings2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
