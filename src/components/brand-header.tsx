import Link from "next/link";
import { AuthStatus } from "@/components/auth-status";

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#2A2A2A] bg-[#050505]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-[#FF7A00] text-sm font-black text-[#050505] shadow-[0_0_30px_rgba(255,122,0,0.35)]">
            BL
          </span>
          <span>
            <span className="block text-lg font-bold text-white">
              Business Lab
            </span>
            <span className="block text-xs font-medium text-[#B7B7B7]">
              AI command center
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-semibold text-[#B7B7B7] sm:gap-2">
          <Link className="rounded-md px-3 py-2 hover:bg-[#141414] hover:text-white" href="/about">
            About
          </Link>
          <Link className="rounded-md px-3 py-2 hover:bg-[#141414] hover:text-white" href="/login">
            Demo Login
          </Link>
          <Link className="rounded-md bg-[#FF7A00] px-3 py-2 font-bold text-[#050505] hover:bg-[#ff9a32]" href="/waitlist">
            Waitlist
          </Link>
          <AuthStatus />
        </nav>
      </div>
    </header>
  );
}
