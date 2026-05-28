"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center justify-center px-5 py-12 sm:px-8">
        <div className="max-w-lg rounded-3xl border border-[#2A2A2A] bg-[#111111] p-6 text-center shadow-[0_0_80px_rgba(255,122,0,0.12)]">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF7A00]">
            Sign in required
          </p>
          <h1 className="mt-3 text-3xl font-black text-white">
            Verify with OTP to enter Business Lab.
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
            Demo authentication stores your user and business details locally so
            the MVP can show a real sign-in flow.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-[#FF7A00] px-5 py-3 text-sm font-black text-[#050505] hover:bg-[#ff9a32]"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
