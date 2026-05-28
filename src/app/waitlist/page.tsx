import { BrandHeader } from "@/components/brand-header";
import { WaitlistForm } from "@/components/waitlist-form";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <BrandHeader />
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF7A00]">
            Invite-only early access
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl">
            Request access to Business Lab.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#B7B7B7]">
            Selected users will receive access later as we open the product
            gradually for the Fitness Lab AI community.
          </p>
          <div className="mt-6 rounded-3xl border border-[#FF7A00]/30 bg-[#1A1A1A] p-5">
            <p className="text-sm leading-7 text-[#B7B7B7]">
              Joining the waitlist does not unlock the internal product today.
              It helps our research and helps us choose the first invited users.
            </p>
          </div>
        </div>
        <WaitlistForm />
      </section>
    </main>
  );
}
