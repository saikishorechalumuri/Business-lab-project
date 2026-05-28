"use client";

import { useState } from "react";

const roles = [
  "Founder",
  "Gym Owner",
  "Coach",
  "Operator",
  "Manager",
  "Team Lead",
  "Other",
];

const countryCodes = [
  { label: "India +91", value: "+91" },
  { label: "USA +1", value: "+1" },
  { label: "Canada +1", value: "+1-CA" },
  { label: "UK +44", value: "+44" },
  { label: "UAE +971", value: "+971" },
  { label: "Australia +61", value: "+61" },
  { label: "Other", value: "Other" },
];

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [company, setCompany] = useState("");
  const [majorProblem, setMajorProblem] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        country_code: countryCode,
        phone,
        role,
        company,
        major_problem: majorProblem,
      }),
    });

    const result = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(result.message ?? "Something went wrong.");
      return;
    }

    setStatus("success");
    setMessage(
      "Thank you for joining the Business Lab waitlist. Your response will help our research. We will review your request and invite selected users when early access is ready.",
    );
    setName("");
    setEmail("");
    setCountryCode("+91");
    setPhone("");
    setCompany("");
    setMajorProblem("");
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-[#2A2A2A] bg-[#111111] p-6 shadow-[0_0_80px_rgba(255,122,0,0.12)]"
    >
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
        Request invite
      </p>
      <h2 className="mt-3 text-3xl font-black text-white">Join the waitlist</h2>
      <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
        Business Lab is currently invite-only. Share your main execution
        problem so we can decide who to invite first.
      </p>

      <div className="mt-6 grid gap-4">
        <Field label="Name" value={name} onChange={setName} required />
        <Field label="Email" value={email} onChange={setEmail} required />
        <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
          <label className="block">
            <span className="text-sm font-bold text-white">Country Code</span>
            <select
              value={countryCode}
              onChange={(event) => setCountryCode(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none focus:border-[#FF7A00]"
            >
              {countryCodes.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </label>
          <Field label="Phone Number" value={phone} onChange={setPhone} required />
        </div>
        <label className="block">
          <span className="text-sm font-bold text-white">Role</span>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none focus:border-[#FF7A00]"
          >
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <Field label="Company" value={company} onChange={setCompany} required />
        <label className="block">
          <span className="text-sm font-bold text-white">
            Major problem your team faces
          </span>
          <textarea
            value={majorProblem}
            onChange={(event) => setMajorProblem(event.target.value)}
            required
            rows={4}
            className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none placeholder:text-[#777] focus:border-[#FF7A00]"
            placeholder="Example: follow-ups get missed, reports do not become tasks, owners are unclear..."
          />
        </label>
      </div>

      <button
        disabled={status === "loading"}
        className="mt-6 w-full rounded-lg bg-[#FF7A00] px-5 py-3 text-sm font-black text-[#050505] shadow-[0_0_35px_rgba(255,122,0,0.28)] hover:bg-[#ff9a32] disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Join the Waitlist"}
      </button>

      {message && (
        <p
          className={`mt-4 rounded-2xl border p-4 text-sm leading-6 ${
            status === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-200"
              : "border-red-500/30 bg-red-500/10 text-red-200"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none placeholder:text-[#777] focus:border-[#FF7A00]"
      />
    </label>
  );
}
