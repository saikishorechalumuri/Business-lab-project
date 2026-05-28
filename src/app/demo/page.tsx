import { BrandHeader } from "@/components/brand-header";
import { DemoRunner } from "@/components/demo-runner";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <BrandHeader />
      <DemoRunner />
    </main>
  );
}
