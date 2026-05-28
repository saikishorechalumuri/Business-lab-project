"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

const roleOptions = ["CEO", "VP", "Manager", "Team Member"];

export function LoginClient() {
  const router = useRouter();
  const { requestOtp, verifyOtp, pendingUser, demoOtp, user } = useAuth();
  const [fullName, setFullName] = useState("Demo Owner");
  const [email, setEmail] = useState("owner@demo.com");
  const [businessName, setBusinessName] = useState("Demo Fitness Business");
  const [role, setRole] = useState("CEO");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return (
      <AuthCard
        title="You are signed in"
        description={`${user.fullName} is verified for ${user.businessName}.`}
      >
        <button
          onClick={() => router.push("/roles")}
          className="mt-6 w-full rounded-lg bg-[#FF7A00] px-5 py-3 text-sm font-black text-[#050505] hover:bg-[#ff9a32]"
        >
          Continue to Role Selector
        </button>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Enter the command center"
      description="Demo OTP authentication stores your profile locally. Real email/SMS OTP comes later."
    >
      {!pendingUser ? (
        <div className="mt-6 grid gap-4">
          <Field label="Full name" value={fullName} onChange={setFullName} />
          <Field label="Email" value={email} onChange={setEmail} />
          <Field
            label="Business name"
            value={businessName}
            onChange={setBusinessName}
          />
          <label className="block">
            <span className="text-sm font-bold text-white">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none focus:border-[#FF7A00]"
            >
              {roleOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <button
            onClick={() =>
              requestOtp({
                fullName,
                email,
                businessName,
                role,
              })
            }
            className="rounded-lg bg-[#FF7A00] px-5 py-3 text-sm font-black text-[#050505] hover:bg-[#ff9a32]"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <div className="rounded-2xl border border-[#FF7A00]/30 bg-[#FF7A00]/10 p-4">
            <p className="text-sm font-bold text-white">
              Demo OTP sent to {pendingUser.email}
            </p>
            <p className="mt-2 text-sm text-[#B7B7B7]">
              Use this demo code:{" "}
              <span className="font-black text-[#FF7A00]">{demoOtp}</span>
            </p>
          </div>
          <Field label="Enter OTP" value={otp} onChange={setOtp} />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button
            onClick={() => {
              const verified = verifyOtp(otp);

              if (verified) {
                router.push("/roles");
                return;
              }

              setError("Incorrect OTP. Use the demo code shown above.");
            }}
            className="mt-4 w-full rounded-lg bg-[#FF7A00] px-5 py-3 text-sm font-black text-[#050505] hover:bg-[#ff9a32]"
          >
            Verify OTP & Sign In
          </button>
        </div>
      )}
    </AuthCard>
  );
}

function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-[#2A2A2A] bg-[#111111] p-6 shadow-[0_0_80px_rgba(255,122,0,0.12)]">
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#FF7A00] text-xl font-black text-[#050505] shadow-[0_0_35px_rgba(255,122,0,0.35)]">
        BL
      </div>
      <p className="mt-6 text-center text-sm font-black uppercase tracking-[0.2em] text-[#FF7A00]">
        Demo OTP login
      </p>
      <h1 className="mt-3 text-center text-3xl font-black">{title}</h1>
      <p className="mt-3 text-center text-sm leading-6 text-[#B7B7B7]">
        {description}
      </p>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none focus:border-[#FF7A00]"
      />
    </label>
  );
}
