import { mockDemandas } from '@/lib/mock-data';
import { StatusBadge } from '@/components/forum/StatusBadge';
import { formatDate } from '@/utils/formatters';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  FileText,
  Download,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRIORIDADE_DEMANDA } from '@/utils/constants';
import Link from 'next/link';

export default function AdminDemandasListPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Todas as <span className="text-brand-green">Demandas</span></h1>
          <p className="text-muted-foreground font-medium">Gerencie e responda todos os relatos do sistema.</p>
        </div>
        <Button className="bg-brand-green hover:bg-brand-mid text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-brand-green/20">
          <Download className="mr-2 h-4 w-4" /> Exportar Planilha
        </Button>
      </div>

      <Card className="border-none shadow-md overflow-hidden bg-white">
        <CardHeader className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar por título, ID ou autor..." 
              className="pl-10 h-10 bg-muted/50 border-transparent focus:bg-white focus:border-brand-green transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="font-bold text-xs h-10 px-4">
              <Filter className="mr-2 h-3.5 w-3.5" /> Filtros Avançados
            </Button>
            <Button variant="outline" size="sm" className="font-bold text-xs h-10 px-4">
              <ArrowUpDown className="mr-2 h-3.5 w-3.5" /> Ordenar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
                <TableHead className="w-[100px] font-bold text-[10px] uppercase tracking-widest text-muted-foreground pl-6">ID</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Demanda</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Prioridade</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Autor</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground text-right pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDemandas.map((demanda) => {
                const prioridade = PRIORIDADE_DEMANDA[demanda.prioridade];
                return (
                  <TableRow key={demanda.id} className="hover:bg-muted/10 transition-colors group">
                    <TableCell className="font-bold text-muted-foreground pl-6 text-xs">
                      #{demanda.id.padStart(4, '0')}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground group-hover:text-brand-green transition-colors">{demanda.titulo}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{demanda.unidade} • {demanda.categoria.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={demanda.status} className="scale-90 origin-left" />
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: prioridade?.color }}>
                            <AlertCircle className="h-3 h-3" />
                            {prioridade?.label}
                        </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-muted-foreground">
                      {demanda.autor.name.split(' ')[0]} {demanda.autor.name.split(' ').slice(-1)}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-brand-light hover:text-brand-dark">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Ações da Demanda</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/demandas/${demanda.id}`} className="cursor-pointer">
                                <FileText className="mr-2 h-4 w-4" /> Ver Detalhes
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <MessageCircle className="mr-2 h-4 w-4" /> Responder
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-xs text-muted-foreground">Alterar Status</DropdownMenuLabel>
                          <DropdownMenuItem className="text-xs">Marcar como Analisada</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">Marcar como Resolvida</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Footer Info */}
      <div className="flex items-center justify-between px-2">
          <p className="text-xs text-muted-foreground font-medium">
            Exibindo <strong>{mockDemandas.length}</strong> de <strong>{mockDemandas.length}</strong> demandas cadastradas
          </p>
          <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled className="h-8 px-3 text-xs font-bold">Anterior</Button>
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-bold bg-brand-light text-brand-dark border-brand-green/30">1</Button>
              <Button variant="outline" size="sm" disabled className="h-8 px-3 text-xs font-bold">Próximo</Button>
          </div>
      </div>
    </div>
  );
}
