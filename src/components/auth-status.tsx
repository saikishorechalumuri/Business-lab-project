"use client";

import { useAuth } from "@/components/auth-provider";

export function AuthStatus() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden rounded-md border border-[#2A2A2A] px-3 py-2 text-xs font-bold text-[#B7B7B7] lg:inline">
        {user.role}: {user.fullName}
      </span>
      <button
        onClick={signOut}
        className="rounded-md px-3 py-2 hover:bg-[#141414] hover:text-white"
      >
        Sign Out
      </button>
    </div>
  );
}
