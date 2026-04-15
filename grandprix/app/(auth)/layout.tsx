export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[420px] animate-fade-in">
        <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark border border-brand-green/20">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FEDF00] to-[#009B3A]" />
                </div>
                <div className="leading-tight">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Petrobras</p>
                    <p className="font-black text-lg text-foreground leading-none">Acessibilidade</p>
                </div>
            </div>
        </div>
        {children}
      </div>
    </div>
  );
}
