"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Building2, 
  MessageSquare, 
  Cpu, 
  Truck, 
  Scale, 
  Smile, 
  Globe2,
  AlertCircle,
  ChevronLeft,
  Paperclip,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TipoBarreira, BARREIRA_LABELS } from "@/lib/constants";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  titulo: z.string().min(10, "O título deve ter pelo menos 10 caracteres."),
  descricao: z.string().min(30, "Descreva o relato com mais detalhes (mín. 30 caracteres)."),
  tipoBarreira: z.nativeEnum(TipoBarreira, {
    message: "Selecione o tipo de barreira.",
  }),
  unidade: z.string().min(1, "Informe a unidade ou local."),
});

const barrierIcons = {
  [TipoBarreira.ARQUITETONICA]: Building2,
  [TipoBarreira.COMUNICACIONAL]: MessageSquare,
  [TipoBarreira.TECNOLOGICA]: Cpu,
  [TipoBarreira.TRANSPORTE]: Truck,
  [TipoBarreira.INSTITUCIONAL]: Scale,
  [TipoBarreira.ATITUDINAL]: Smile,
  [TipoBarreira.CULTURAL]: Globe2,
};

export function DemandForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      tipoBarreira: undefined,
      unidade: "",
    },
  });

  const descricao = form.watch("descricao");
  
  // Simulated AI Logic
  const getAIAnalysis = () => {
    if (descricao.length < 20) return null;
    
    const text = descricao.toLowerCase();
    
    if (text.includes("gestor") || text.includes("capacidade") || text.includes("infantiliz") || text.includes("capacitism")) {
      return {
        type: TipoBarreira.ATITUDINAL,
        area: "Recursos Humanos / Diversidade",
        confidence: 0.94,
        insight: "O relato indica barreiras comportamentais/culturais. Mapeamento para NR-17 não se aplica. Sugerido acionar trilhas de capacitação."
      };
    }
    
    if (text.includes("sistema") || text.includes("nvda") || text.includes("software") || text.includes("app")) {
      return {
        type: TipoBarreira.TECNOLOGICA,
        area: "TIC (Tecnologia da Informação)",
        confidence: 0.98,
        insight: "Há menção a ferramentas digitais. Padrão semelhante a 22 incidentes abertos no ERP neste mês. Possível Cluster."
      };
    }
    
    if (text.includes("rampa") || text.includes("cadeira") || text.includes("banheiro") || text.includes("degrau")) {
      return {
        type: TipoBarreira.ARQUITETONICA,
        area: "Infraestrutura / Serviços Prediais",
        confidence: 0.89,
        insight: "Adequação física sinalizada. Referência sugerida: Norma ABNT NBR 9050."
      };
    }
    
    return {
      type: TipoBarreira.ARQUITETONICA, // fallback
      area: "Aguardando mais detalhes...",
      confidence: 0.0,
      insight: "Continue escrevendo para uma triagem mais precisa."
    };
  };

  const aiState = getAIAnalysis();

  // Auto-fill category simulation when AI is confident
  React.useEffect(() => {
    if (aiState && aiState.confidence > 0.8) {
      if (form.getValues("tipoBarreira") !== aiState.type) {
         form.setValue("tipoBarreira", aiState.type);
      }
    }
  }, [aiState?.type, aiState?.confidence, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/demandas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          authorId: "4",
        }),
      });

      const payload: unknown = await res.json().catch(() => null);
      const maybe = (payload && typeof payload === "object") ? (payload as Record<string, unknown>) : null;
      const serverError = typeof maybe?.error === "string" ? maybe.error : undefined;
      if (!res.ok) {
        setSubmitError(serverError ?? "Falha ao enviar o relato.");
        return;
      }

      const id =
        maybe && typeof maybe.data === "object" && maybe.data && typeof (maybe.data as Record<string, unknown>).id === "string"
          ? ((maybe.data as Record<string, unknown>).id as string)
          : undefined;
      if (id) {
        router.push(`/user/demandas/${id}`);
      } else {
        router.push("/user/demandas");
      }
      router.refresh();
    } catch {
      setSubmitError("Falha ao enviar o relato.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center gap-3">
            <Link
              href="/user/demandas"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Meus tópicos
            </Link>
            <div className="h-4 w-[1px] bg-slate-200" />
            <span className="inline-flex items-center rounded-full bg-[#008542]/10 text-[#008542] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]">
              Novo Tópico
            </span>
          </div>
          <h1 className="title-font text-4xl font-black tracking-tight text-slate-900">Registrar Tópico</h1>
          <p className="title-font text-sm font-medium text-slate-500">
            Quanto mais detalhes (sem citar nomes), mais rápido a triagem encaminha para a área certa.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2.5 rounded-xl bg-slate-100 text-slate-600">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">Dica rápida</p>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  Use “Unidade / Local” bem específico (ex.: prédio, andar, sala). Isso reduz idas e vindas na análise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <Card className="border-slate-200 shadow-sm overflow-hidden rounded-2xl">
                <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-slate-600">
                        Detalhes do tópico
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-slate-500 mt-1">
                        Descreva o que aconteceu e o impacto observado.
                      </CardDescription>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-slate-200/60 text-slate-700 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                        Tempo: 1–2 min
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-7 md:p-8 space-y-6">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold text-slate-700">O que aconteceu? (Título)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex.: Sistema interno não funciona com leitor de tela"
                            {...field}
                            className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-500 ease-out rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold text-slate-700">Relato Detalhado</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva a situação, o local exato e o impacto observado..." 
                            className="min-h-[240px] bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-500 ease-out resize-none rounded-xl"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Descreva o tópico de forma clara, foque no ambiente ou processo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-red-100 text-red-700">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-700/80">Falha ao enviar</p>
                        <p className="font-medium mt-1">{submitError}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <div className="flex items-center gap-4 p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-white transition-colors duration-500 ease-out cursor-pointer group">
                      <div className="p-2 rounded-xl bg-slate-200 group-hover:bg-[#008542]/10 group-hover:text-[#008542] transition-colors duration-500 ease-out">
                        <Paperclip className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-700">Anexar evidências (Opcional)</p>
                        <p className="text-xs text-slate-400">Arraste fotos ou documentos (.pdf, .jpg, .png)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
              {/* Copiloto IA Card */}
              <Card className="border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-slate-800 rounded-2xl">
                <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-5">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Copiloto de Triagem
                     </CardTitle>
                     {aiState && aiState.confidence > 0 ? (
                       <span className="bg-emerald-100 text-[#008542] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                         <CheckCircle2 className="w-3 h-3" /> ATIVO
                       </span>
                     ) : (
                       <span className="bg-slate-200 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                         ANALISANDO...
                       </span>
                     )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {!aiState ? (
                    <div className="text-xs font-medium text-slate-400 text-center py-4">
                      Comece a digitar a Descrição do Tópico para a inteligência artificial categorizar e sugerir soluções proativamente.
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Tipo de Barreira Prevista</p>
                        <p className="text-sm font-bold text-slate-900">{BARREIRA_LABELS[aiState.type]}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Setor Responsável Sugerido</p>
                        <p className="text-sm font-bold text-slate-900">{aiState.area}</p>
                      </div>
                      {aiState.confidence > 0 && (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 mt-4">
                          <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#008542]" /> Insight do Contexto
                          </p>
                          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                            {aiState.insight}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm overflow-hidden rounded-2xl">
                <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-slate-600">
                        Classificação
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-slate-500 mt-1">
                        Selecione o tipo e informe a unidade/local.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="tipoBarreira"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-bold text-slate-700">Tipo de Barreira</FormLabel>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.values(TipoBarreira).map((tipo) => {
                            const Icon = barrierIcons[tipo];
                            const isSelected = field.value === tipo;
                            
                            return (
                              <div
                                key={tipo}
                                onClick={() => field.onChange(tipo)}
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-2xl border-2 transition-colors duration-500 ease-out cursor-pointer group h-12",
                                  isSelected 
                                    ? "border-[#008542] bg-[#008542]/5" 
                                    : "border-slate-100 hover:border-slate-300 bg-white"
                                )}
                              >
                                <div className={cn(
                                  "p-2 rounded-xl transition-colors",
                                  isSelected ? "bg-[#008542] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                                )}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className={cn(
                                  "text-xs font-bold uppercase tracking-widest",
                                  isSelected ? "text-[#008542]" : "text-slate-500"
                                )}>
                                  {BARREIRA_LABELS[tipo]}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold text-slate-700">Localização / Unidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: EDISE - 3º Andar, Sala 12"
                            {...field}
                            className="bg-slate-50 border-slate-200 rounded-xl h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-[#008542] hover:bg-[#006e36] disabled:opacity-60 text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-[#008542]/20 gap-2 rounded-2xl"
                    >
                      {isSubmitting ? "Enviando..." : "Publicar Tópico"} <ArrowRight className="w-4 h-4" />
                    </Button>
                    <p className="text-[11px] text-slate-400 font-medium mt-3 text-center">
                      Ao enviar, você concorda em não incluir dados pessoais sensíveis.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
