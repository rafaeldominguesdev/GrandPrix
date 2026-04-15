'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, ArrowRight, Info } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular autenticação
    setTimeout(() => {
        setIsLoading(false);
        router.push('/');
    }, 1500);
  };

  return (
    <Card className="border-none shadow-2xl bg-white overflow-hidden">
      <CardHeader className="space-y-1 p-8 text-center pb-4">
        <CardTitle className="text-2xl font-black tracking-tight">Login Corporativo</CardTitle>
        <CardDescription>Use seu e-mail e senha padrão da empresa.</CardDescription>
      </CardHeader>
      
      <CardContent className="p-8 pt-4">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail Corporativo</Label>
            <Input 
                id="email" 
                type="email" 
                placeholder="nome.sobrenome@petrobras.com.br" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 focus-visible:ring-brand-green"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <button type="button" className="text-xs font-bold text-brand-green hover:underline">Esqueceu a senha?</button>
            </div>
            <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 focus-visible:ring-brand-green"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-brand-green hover:bg-brand-mid text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-green/20"
            disabled={isLoading}
          >
            {isLoading ? 'Autenticando...' : (
                <>Entrar no Sistema <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </form>

        <div className="mt-8 p-4 bg-muted/40 rounded-xl border border-dashed flex gap-3">
            <ShieldCheck className="h-5 w-5 text-brand-dark shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
                Este sistema utiliza autenticação integrada (SSO). Seus dados de acesso são os mesmos do e-mail corporativo.
            </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 bg-brand-light/30 border-t justify-center">
        <p className="text-[10px] text-brand-dark/60 font-medium">
            Desenvolvido pela Equipe de Acessibilidade Digital
        </p>
      </CardFooter>
    </Card>
  );
}
