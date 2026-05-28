import Link from "next/link";
import { BrandHeader } from "@/components/brand-header";
import { WaitlistForm } from "@/components/waitlist-form";

const painPoints = [
  "Reports stay inside meetings",
  "Tasks are unclear",
  "Ownership is not assigned properly",
  "Leaders lose visibility",
  "Teams lose daily focus",
  "Follow-ups get missed",
];

const solutionPoints = [
  "Create structured reports",
  "Activate role-based AI agents",
  "Generate tasks from reports",
  "Assign ownership",
  "Track execution",
  "Produce output reports",
];

const steps = [
  "Create Report",
  "Activate Agent",
  "Generate Tasks",
  "Assign Roles",
  "Track Output Report",
];

const audience = [
  "Fitness Lab AI members",
  "Gym owners",
  "Personal trainers",
  "Startup founders",
  "Small business operators",
  "Managers and team leads",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <BrandHeader />
      <section className="relative overflow-hidden border-b border-[#2A2A2A]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,122,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,122,0,0.08)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10">
          <div>
            <span className="rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#FF7A00]">
              Invite-only early access
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight sm:text-7xl">
              Business Lab turns reports into execution.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#B7B7B7]">
              An AI-powered operating system that helps teams convert updates,
              reports, and ideas into assigned tasks, clear ownership, and
              measurable progress.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#waitlist"
                className="rounded-lg bg-[#FF7A00] px-5 py-3 text-center text-sm font-black text-[#050505] shadow-[0_0_35px_rgba(255,122,0,0.3)] hover:bg-[#ff9a32]"
              >
                Join the Waitlist
              </Link>
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <Section eyebrow="What Business Lab Is" title="An internal AI operating system for action.">
        <p className="max-w-4xl text-lg leading-8 text-[#B7B7B7]">
          Business Lab helps teams move from information to action through a
          simple operating flow:
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-5">
          {["Reports", "AI Agent", "Tasks", "Assigned Roles", "Output Report"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-4 text-center text-sm font-black"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </Section>

      <Section eyebrow="Problem" title="Execution breaks when information has no owner.">
        <p className="max-w-4xl text-lg leading-8 text-[#B7B7B7]">
          Most teams do not fail because they lack ideas. They fail because
          reports, responsibilities, and execution are disconnected.
        </p>
        <CardGrid items={painPoints} />
      </Section>

      <Section eyebrow="Solution" title="Every report becomes a next step.">
        <p className="max-w-4xl text-lg leading-8 text-[#B7B7B7]">
          Business Lab creates a simple operating rhythm where every report can
          become tasks, tasks can be assigned to roles, and progress can be
          tracked.
        </p>
        <CardGrid items={solutionPoints} />
      </Section>

      <Section eyebrow="How It Works" title="Five steps from update to execution.">
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <article
              key={step}
              className="rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5 transition hover:-translate-y-1 hover:border-[#FF7A00]"
            >
              <span className="rounded-lg bg-[#FF7A00] px-3 py-2 text-xs font-black text-[#050505]">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-lg font-black">{step}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Community" title="Built for the Fitness Lab AI community.">
        <p className="max-w-4xl text-lg leading-8 text-[#B7B7B7]">
          Business Lab is being built to support founders, coaches, operators,
          and small teams who need better execution systems.
        </p>
        <CardGrid items={audience} />
      </Section>

      <Section eyebrow="Hackathon Build Story" title="Built fast to test a real AI workflow.">
        <div className="rounded-3xl border border-[#FF7A00]/30 bg-[#1A1A1A] p-6 shadow-[0_0_80px_rgba(255,122,0,0.1)]">
          <p className="text-lg leading-8 text-[#B7B7B7]">
            This project is being built during the OpenAI x Outskill AI Builders
            Hackathon as a fast MVP to test how AI can improve execution systems
            inside real business communities.
          </p>
        </div>
      </Section>

      <Section eyebrow="Founder" title="Sai Kishore Chalumuri">
        <div className="rounded-3xl border border-[#2A2A2A] bg-[#111111] p-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
            Founder | Fitness Lab AI | AI Product Builder
          </p>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#B7B7B7]">
            I am building Business Lab to help teams stop losing execution
            inside scattered reports, meetings, and follow-ups. The goal is
            simple: turn business information into action, ownership, and
            measurable progress.
          </p>
        </div>
      </Section>

      <section id="waitlist" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Invite-only access
            </p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Request early access.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#B7B7B7]">
              Business Lab is currently in invite-only early access. Join the
              waitlist, share the main execution problem your team faces, and we
              will invite selected users as we open the product gradually.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <footer className="border-t border-[#2A2A2A] px-5 py-8 text-center text-sm text-[#B7B7B7]">
        Business Lab by Fitness Lab AI · Invite-only early access · Built during
        OpenAI x Outskill AI Builders Hackathon
      </footer>
    </main>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF7A00]">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function CardGrid({ items }: { items: string[] }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5 text-sm font-bold text-[#B7B7B7]"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5 shadow-[0_0_100px_rgba(255,122,0,0.16)]">
      <div className="rounded-2xl border border-[#FF7A00]/30 bg-[#1A1A1A] p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FF7A00]">
          Agent Activated
        </p>
        <h3 className="mt-3 text-2xl font-black">Output Report Preview</h3>
        <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
          Report analyzed. Tasks generated. Ownership assigned. Progress ready
          to track.
        </p>
      </div>
      <div className="mt-4 grid gap-3">
        {["Create Report", "Generate Tasks", "Assign VP Owner"].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-2xl border border-[#2A2A2A] bg-[#080808] p-4"
          >
            <span className="text-sm font-black">{item}</span>
            <span className="rounded-lg bg-[#FF7A00]/10 px-3 py-2 text-xs font-black text-[#FF7A00]">
              Ready
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
