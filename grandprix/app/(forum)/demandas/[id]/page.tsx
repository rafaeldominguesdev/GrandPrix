import { mockDemandas } from '@/lib/mock-data';
import { PostDetail } from '@/components/forum/PostDetail';
import { notFound } from 'next/navigation';

interface DemandaDetailPageProps {
  params: {
    id: string;
  };
}

export default function DemandaDetailPage({ params }: DemandaDetailPageProps) {
  const demanda = mockDemandas.find((d) => d.id === params.id);

  if (!demanda) {
    notFound();
  }

  return <PostDetail demanda={demanda} />;
}
