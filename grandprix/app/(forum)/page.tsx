import { mockDemandas } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { PostCard } from '@/components/forum/PostCard';

export default function ForumPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section / Welcome - macOS Aesthetic Clean */}
      <div className="card-premium rounded-[32px] p-12 shadow-macos-lg border-none relative overflow-hidden group bg-white animate-slide-up">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black text-foreground mb-4 tracking-tight leading-tight">
              Olá, <span className="gradient-text">bem-vindo</span> ao Portal de Acessibilidade
            </h1>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              Ajude-nos a transformar a Petrobras em um ambiente cada vez mais inclusivo e acessível para todos os colaboradores.
            </p>
          </div>
          <Link href="/nova-demanda" className="shrink-0">
            <Button className="bg-brand-green hover:bg-brand-mid text-white px-8 h-12 rounded-full text-sm font-black uppercase tracking-widest shadow-macos shadow-brand-green/20 transition-all hover:scale-[1.02] active:scale-95 border-none">
              <PlusCircle className="mr-2 h-5 w-5" />
              Nova Demanda
            </Button>
          </Link>
        </div>
        {/* Subtle Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      {/* Filters & Search - macOS Aesthetic Clean */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-md p-3 rounded-2xl border border-black/[0.03] shadow-macos animate-slide-up [animation-delay:200ms]">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar relatos ou categorias..." 
            className="pl-11 h-11 bg-white border-black/[0.05] rounded-xl focus-visible:ring-brand-green placeholder:text-muted-foreground/50 text-foreground shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="ghost" className="h-11 px-4 rounded-xl hover:bg-black/[0.03] text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Filter className="mr-2 h-4 w-4 text-brand-green" />
            Filtros
          </Button>
          <div className="h-6 w-px bg-black/[0.05] hidden md:block mx-1" />
          <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-[0.1em] hidden md:block px-2">
            Total: <span className="text-brand-green">{mockDemandas.length}</span> relatos
          </p>
        </div>
      </div>

      {/* post list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDemandas.map((demanda, index) => (
          <div key={demanda.id} className="animate-slide-up" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
            <PostCard demanda={demanda} />
          </div>
        ))}
      </div>
    </div>
  );
}
