import { DemandForm } from "@/components/features/demands/DemandForm";

export default function NovaDemandaPage() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-[#008542]/10 via-[#008542]/5 to-transparent pointer-events-none" />
      <div className="py-6">
        <DemandForm />
      </div>
    </div>
  );
}
