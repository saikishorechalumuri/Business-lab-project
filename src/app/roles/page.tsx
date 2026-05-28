import Link from "next/link";
import { AuthGate } from "@/components/auth-gate";
import { BrandHeader } from "@/components/brand-header";
import { roles } from "@/lib/business-lab-data";

export default function RolesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <BrandHeader />
      <AuthGate>
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Role selector
            </p>
            <h1 className="mt-3 text-4xl font-black sm:text-6xl">
              Choose your command center.
            </h1>
            <p className="mt-4 text-lg leading-8 text-[#B7B7B7]">
              Business Lab keeps the operating chain clear: CEO to VP to Manager
              to Team Member.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {roles.map((role) => (
              <Link
                key={role.slug}
                href={`/dashboard/${role.slug}`}
                className="group rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5 shadow-[0_0_50px_rgba(255,122,0,0.05)] transition hover:-translate-y-1 hover:border-[#FF7A00] hover:shadow-[0_0_55px_rgba(255,122,0,0.16)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-black text-[#FF7A00]">
                    {role.level}
                  </p>
                  <span className="rounded-lg bg-[#FF7A00]/10 px-3 py-2 text-xs font-black text-[#FF7A00]">
                    Open
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-black">{role.loginLabel}</h2>
                <p className="mt-4 text-sm leading-6 text-[#B7B7B7]">
                  {role.mission}
                </p>
                <p className="mt-6 text-sm font-black text-white group-hover:text-[#FF7A00]">
                  Open dashboard
                </p>
              </Link>
            ))}
          </div>
        </section>
      </AuthGate>
    </main>
  );
}
