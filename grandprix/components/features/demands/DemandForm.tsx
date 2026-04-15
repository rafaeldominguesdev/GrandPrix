"use client";

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
  ArrowRight
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      unidade: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Demanda enviada para análise técnica.");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors w-fit group">
        <Link href="/demandas" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Voltar para meu dashboard
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Registrar Relato</h1>
        <p className="text-sm font-medium text-slate-500">Ajude a identificar barreiras e promover a inclusão na Petrobras.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Detalhes da Ocorrência</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold text-slate-700">O que aconteceu? (Título)</FormLabel>
                        <FormControl>
                          <Input placeholder="Resuma em poucas palavras..." {...field} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all" />
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
                            className="min-h-[200px] bg-slate-50 border-slate-200 focus:bg-white transition-all resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Evite citar nomes de pessoas, foque no ambiente ou processo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <div className="flex items-center gap-4 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-white transition-all cursor-pointer group">
                      <div className="p-2 rounded-full bg-slate-200 group-hover:bg-[#008542]/10 group-hover:text-[#008542] transition-all">
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

            <div className="space-y-6">
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Categorização</CardTitle>
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
                                  "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer group",
                                  isSelected 
                                    ? "border-[#008542] bg-[#008542]/5" 
                                    : "border-slate-100 hover:border-slate-300 bg-white"
                                )}
                              >
                                <div className={cn(
                                  "p-2 rounded-lg transition-colors",
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
                          <Input placeholder="Ex: EDISE - 3º Andar" {...field} className="bg-slate-50 border-slate-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button type="submit" className="w-full h-14 bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-[#008542]/20 gap-2">
                Enviar Relato <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
