'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIAS_DEFAULT, TIPOS_BARREIRA, UNIDADES } from '@/utils/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  titulo: z.string().min(10, {
    message: 'O título deve ter pelo menos 10 caracteres.',
  }).max(100),
  descricao: z.string().min(20, {
    message: 'A descrição deve ter pelo menos 20 caracteres.',
  }),
  categoriaId: z.string({
    required_error: 'Por favor, selecione uma categoria.',
  }),
  tipoBarreiraId: z.string({
    required_error: 'Por favor, selecione um tipo de barreira.',
  }),
  unidade: z.string({
    required_error: 'Por favor, selecione uma unidade.',
  }),
});

export function NewPostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      categoriaId: '',
      tipoBarreiraId: '',
      unidade: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simular envio
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/');
    }, 1500);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-green transition-colors mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para o Fórum
      </Link>

      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-black tracking-tight text-foreground">Registrar <span className="gradient-text">Nova Demanda</span></h1>
        <p className="text-muted-foreground text-lg font-medium">
          Descreva detalhadamente a dificuldade ou barreira encontrada para que possamos analisá-la.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-premium border-none shadow-macos-lg overflow-hidden rounded-[24px] animate-slide-up bg-white">
        <CardHeader className="bg-black/[0.01] border-b border-black/[0.05] p-8">
          <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
            <div className="bg-brand-green p-2 rounded-xl text-white shadow-sm">
                <Info className="h-5 w-5" />
            </div>
            Informações Gerais
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            Preencha os detalhes da sua solicitação abaixo
          </CardDescription>
        </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Demanda *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Rampa de acesso com problemas no Bloco A" {...field} className="h-11 focus-visible:ring-brand-green" />
                        </FormControl>
                        <FormDescription>
                          Seja claro e conciso no título.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="categoriaId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 focus:ring-brand-green">
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CATEGORIAS_DEFAULT.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tipoBarreiraId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Barreira *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 focus:ring-brand-green">
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIPOS_BARREIRA.map((tipo) => (
                                <SelectItem key={tipo.slug} value={tipo.slug}>
                                  {tipo.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="unidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unidade / Local *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 focus:ring-brand-green">
                              <SelectValue placeholder="Selecione a unidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {UNIDADES.map((u) => (
                              <SelectItem key={u} value={u}>
                                {u}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição Detalhada *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva o que aconteceu, onde e qual a dificuldade enfrentada..."
                            className="min-h-[150px] focus-visible:ring-brand-green resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Inclua o máximo de detalhes possível para ajudar na análise.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex items-center justify-end gap-3 pt-6">
                <Button variant="ghost" type="button" asChild className="h-12 px-8 rounded-full font-bold text-muted-foreground hover:bg-black/[0.05] hover:text-foreground">
                    <Link href="/">Cancelar</Link>
                </Button>
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="h-12 px-10 rounded-full bg-brand-green hover:bg-brand-mid text-white font-black shadow-macos shadow-brand-green/20 transition-all hover:scale-[1.02] active:scale-95 border-none uppercase tracking-widest text-[10px]"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Demanda'}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="space-y-6">
          <Card className="card-premium border-none shadow-macos overflow-hidden rounded-[24px] bg-white">
            <CardHeader className="bg-brand-green text-white p-6">
              <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow" />
                Dicas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-sm font-black text-foreground uppercase tracking-wider">Seja específico</p>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">Informe o prédio, andar ou sistema exato onde o problema ocorre.</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-foreground uppercase tracking-wider">Impacto</p>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">Explique como essa barreira afeta seu dia a dia ou de seus colegas.</p>
              </div>
              <div className="space-y-1 border-t pt-4 border-black/[0.05]">
                <p className="text-[10px] text-muted-foreground italic font-medium">Suas contribuições ajudam a Petrobras a ser cada vez mais inclusiva.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium border-none shadow-macos overflow-hidden bg-brand-yellow/10 rounded-[24px] border-l-4 border-l-brand-yellow">
            <CardContent className="p-5 flex gap-4">
              <AlertTriangle className="h-6 w-6 text-brand-dark shrink-0" />
              <div>
                <p className="text-sm font-black text-brand-dark uppercase tracking-wider">Atenção</p>
                <p className="text-xs text-brand-dark/80 leading-relaxed font-medium">
                  Este canal é exclusivo para demandas de **acessibilidade**. Para problemas de TI comuns, utilize o Service Desk.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
