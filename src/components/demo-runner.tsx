"use client";

import Link from "next/link";
import { useBusinessLab } from "@/components/business-lab-provider";

const timeline = [
  {
    title: "CEO creates strategy report",
    body: "The CEO turns business direction into a clear growth strategy brief.",
  },
  {
    title: "VP receives assigned task",
    body: "The VP gets ownership of turning strategy into department execution.",
  },
  {
    title: "Manager receives execution task",
    body: "The Manager converts the VP plan into team-level work.",
  },
  {
    title: "Team Member receives daily action",
    body: "The Team Member sees the final action item inside their dashboard.",
  },
  {
    title: "Output reports update",
    body: "Each role gets a local output summary that explains what happened.",
  },
];

const dashboardLinks = [
  { label: "CEO Dashboard", href: "/dashboard/ceo" },
  { label: "VP Dashboard", href: "/dashboard/vp" },
  { label: "Manager Dashboard", href: "/dashboard/manager" },
  { label: "Team Member Dashboard", href: "/dashboard/team-member" },
];

export function DemoRunner() {
  const { runDemoFlow, clearLocalData, lastAction, reports, tasks } =
    useBusinessLab();

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF7A00]">
            Guided Demo Mode
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl">
            Run the full internal business chain.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#B7B7B7]">
            One click creates a clean local demo: CEO report, VP task, VP
            report, Manager task, Manager report, Team Member action, and output
            summaries.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={runDemoFlow}
              className="rounded-lg bg-[#FF7A00] px-5 py-3 text-sm font-black text-[#050505] shadow-[0_0_35px_rgba(255,122,0,0.3)] hover:bg-[#ff9a32]"
            >
              Run Demo Flow
            </button>
            <button
              onClick={clearLocalData}
              className="rounded-lg border border-[#2A2A2A] bg-[#111111] px-5 py-3 text-sm font-bold text-white hover:border-[#FF7A00]"
            >
              Reset Local Demo
            </button>
          </div>
        </div>

        <aside className="rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5 shadow-[0_0_80px_rgba(255,122,0,0.1)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
            Local State
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Reports" value={`${reports.length}`} />
            <Stat label="Tasks" value={`${tasks.length}`} />
          </div>
          <div className="mt-4 rounded-2xl border border-[#2A2A2A] bg-[#080808] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7E7E7E]">
              Last Action
            </p>
            <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
              {lastAction}
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-10 rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
          Timeline
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {timeline.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#2A2A2A] bg-[#080808] p-4"
            >
              <span className="rounded-lg bg-[#FF7A00] px-3 py-2 text-xs font-black text-[#050505]">
                0{index + 1}
              </span>
              <h2 className="mt-5 text-lg font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
          Review Dashboards
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {dashboardLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-[#2A2A2A] bg-[#080808] p-4 text-sm font-black text-white hover:border-[#FF7A00]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#080808] p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7E7E7E]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}
