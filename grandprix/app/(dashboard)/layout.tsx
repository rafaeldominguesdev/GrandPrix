import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { PageWrapper } from "@/components/shared/PageWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <PageWrapper>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </PageWrapper>
        </main>
      </div>
    </div>
  );
}
