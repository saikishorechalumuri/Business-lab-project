import { BrandHeader } from "@/components/brand-header";
import { LoginClient } from "@/components/login-client";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <BrandHeader />
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center justify-center px-5 py-12 sm:px-8">
        <LoginClient />
      </section>
    </main>
  );
}
