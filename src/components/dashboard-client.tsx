"use client";

import { useState } from "react";
import Link from "next/link";
import {
  getAgentsForRole,
  roleHierarchy,
  roles,
  type RoleData,
} from "@/lib/business-lab-data";
import {
  useBusinessLab,
  type BusinessReport,
  type BusinessTask,
  type TaskStatus,
} from "@/components/business-lab-provider";
import { ReportWizard } from "@/components/report-wizard";
import { RoleAgentPanel } from "@/components/role-agent-panel";
import { roleSlugToName } from "@/lib/role-utils";

type DashboardClientProps = {
  role: RoleData;
};

export function DashboardClient({ role }: DashboardClientProps) {
  const {
    reports,
    tasks,
    outputReports,
    lastAction,
    updateReport,
    deleteReport,
    updateTaskStatus,
    activateAgent,
    clearLocalData,
  } = useBusinessLab();
  const roleAgents = getAgentsForRole(role.slug);
  const roleReports = reports.filter((report) => report.ownerRole === role.slug);
  const assignedTasks = tasks.filter((task) => task.assignedTo === role.slug);
  const createdTasks = tasks.filter((task) => task.createdBy === role.slug);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="grid min-h-screen lg:grid-cols-[290px_1fr]">
        <aside className="border-r border-[#2A2A2A] bg-[#080808] px-5 py-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[#FF7A00] text-sm font-black text-[#050505] shadow-[0_0_35px_rgba(255,122,0,0.35)]">
              BL
            </span>
            <span>
              <span className="block text-lg font-black">Business Lab</span>
              <span className="block text-xs text-[#B7B7B7]">
                Executive command center
              </span>
            </span>
          </Link>

          <div className="mt-8 rounded-2xl border border-[#2A2A2A] bg-[#111111] p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FF7A00]">
              Role Chain
            </p>
            <div className="mt-4 space-y-2">
              {roleHierarchy.map((item) => (
                <div
                  key={item}
                  className={`rounded-lg border px-3 py-3 text-sm font-bold ${
                    item === role.name
                      ? "border-[#FF7A00] bg-[#FF7A00] text-[#050505]"
                      : "border-[#2A2A2A] bg-[#141414] text-[#B7B7B7]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            <Link
              href="/roles"
              className="block rounded-lg border border-[#2A2A2A] px-3 py-3 text-sm font-bold text-[#B7B7B7] hover:border-[#FF7A00] hover:text-white"
            >
              Change Role
            </Link>
            {roles.map((item) => (
              <Link
                key={item.slug}
                href={`/dashboard/${item.slug}`}
                className="block rounded-lg px-3 py-3 text-sm font-bold text-[#B7B7B7] hover:bg-[#141414] hover:text-white"
              >
                {item.name} Dashboard
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          <header className="border-b border-[#2A2A2A] bg-[#080808] px-5 py-6 sm:px-8">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF7A00]">
                  {role.name} Command Center
                </p>
                <h1 className="mt-2 text-3xl font-black sm:text-5xl">
                  {role.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#B7B7B7]">
                  Reports become intelligence. Intelligence becomes tasks. Tasks
                  become measurable business progress.
                </p>
              </div>
              <button
                onClick={() => activateAgent(role.slug)}
                className="w-fit rounded-lg bg-[#FF7A00] px-5 py-3 text-sm font-black text-[#050505] shadow-[0_0_35px_rgba(255,122,0,0.3)] hover:bg-[#ff9a32]"
              >
                Activate Agent
              </button>
            </div>
          </header>

          <div className="px-5 py-6 sm:px-8">
            <section className="mb-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-[#FF7A00]/30 bg-[#1A1A1A] p-5 shadow-[0_0_60px_rgba(255,122,0,0.08)]">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
                  Demo Flow
                </p>
                <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
                  CEO creates a report and assigns it to VP. VP assigns to
                  Manager. Manager assigns to Team Member. Tasks stay saved in
                  this browser with localStorage.
                </p>
              </div>
              <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7E7E7E]">
                  Last Local Action
                </p>
                <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
                  {lastAction}
                </p>
                <button
                  onClick={clearLocalData}
                  className="mt-4 rounded-lg border border-[#2A2A2A] px-3 py-2 text-xs font-bold text-white hover:border-[#FF7A00]"
                >
                  Reset Local Demo Data
                </button>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-4">
              <ProfileStat label="Role" value={role.name} />
              <ProfileStat label="Reports" value={`${roleReports.length}`} />
              <ProfileStat label="Assigned Tasks" value={`${assignedTasks.length}`} />
              <ProfileStat label="Tasks Created" value={`${createdTasks.length}`} />
            </section>

            <section className="mt-5 rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5 shadow-[0_0_60px_rgba(255,122,0,0.08)]">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
                    Role Profile Card
                  </p>
                  <h2 className="mt-2 text-2xl font-black">{role.name}</h2>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-[#B7B7B7]">
                    {role.mission}
                  </p>
                </div>
                <span className="w-fit rounded-lg border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-3 py-2 text-sm font-black text-[#FF7A00]">
                  {role.level}
                </span>
              </div>
            </section>

            <div className="mt-5 grid gap-5 2xl:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-black">My Reports</h2>
                    <p className="mt-1 text-sm text-[#B7B7B7]">
                      Reports created by this role. Create, edit, delete, and
                      assign them locally in Phase 2.
                    </p>
                  </div>
                  <ReportWizard roleName={role.name} roleSlug={role.slug} />
                </div>

                <div className="mt-5 grid gap-3">
                  {roleReports.map((report, index) => (
                    <ReportCard
                      key={`${report.id}-${index}`}
                      report={report}
                      onUpdate={updateReport}
                      onDelete={deleteReport}
                    />
                  ))}
                </div>
              </section>

              <section className="space-y-5">
                <TaskPanel
                  title="Assigned Tasks"
                  tasks={assignedTasks}
                  onStatusChange={updateTaskStatus}
                />
                <TaskPanel
                  title="Tasks I Created"
                  tasks={createdTasks}
                  onStatusChange={updateTaskStatus}
                />
              </section>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <section className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
                  Task To Do
                </p>
                <h2 className="mt-2 text-2xl font-black">Next best action</h2>
                <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
                  {assignedTasks[0]?.title ?? role.taskTodo}
                </p>
              </section>

              <section className="rounded-2xl border border-[#FF7A00]/30 bg-[#1A1A1A] p-5 shadow-[0_0_70px_rgba(255,122,0,0.1)]">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
                  Output Report
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Agent Output Preview
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
                  {outputReports[role.slug]}
                </p>
              </section>
            </div>

            <RoleAgentPanel agents={roleAgents} />
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7E7E7E]">
        {label}
      </p>
      <p className="mt-2 text-sm font-black text-white">{value}</p>
    </div>
  );
}

function ReportCard({
  report,
  onUpdate,
  onDelete,
}: {
  report: BusinessReport;
  onUpdate: (id: string, title: string, context: string) => void;
  onDelete: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(report.title);
  const [context, setContext] = useState(report.context);

  return (
    <article className="rounded-xl border border-[#2A2A2A] bg-[#080808] p-4 transition hover:border-[#FF7A00]/70">
      {isEditing ? (
        <div className="grid gap-3">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-lg border border-[#2A2A2A] bg-[#050505] px-3 py-2 text-sm font-bold text-white outline-none focus:border-[#FF7A00]"
          />
          <textarea
            value={context}
            onChange={(event) => setContext(event.target.value)}
            rows={3}
            className="rounded-lg border border-[#2A2A2A] bg-[#050505] px-3 py-2 text-sm text-[#B7B7B7] outline-none focus:border-[#FF7A00]"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                onUpdate(report.id, title, context);
                setIsEditing(false);
              }}
              className="rounded-lg bg-[#FF7A00] px-3 py-2 text-xs font-black text-[#050505]"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-[#2A2A2A] px-3 py-2 text-xs font-bold text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-black text-white">{report.title}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#7E7E7E]">
                {report.type} / assigned to {roleSlugToName(report.assignedRole)}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
                {report.context}
              </p>
            </div>
            <span className="w-fit rounded-md bg-[#FF7A00]/10 px-3 py-2 text-xs font-black text-[#FF7A00]">
              {report.status}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-[#2A2A2A] px-3 py-2 text-xs font-bold text-white hover:border-[#FF7A00]"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(report.id)}
              className="rounded-lg border border-[#2A2A2A] px-3 py-2 text-xs font-bold text-white hover:border-[#EF4444]"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}

function TaskPanel({
  title,
  tasks,
  onStatusChange,
}: {
  title: string;
  tasks: BusinessTask[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-xl border border-[#2A2A2A] bg-[#080808] p-4"
          >
            <p className="text-sm font-semibold leading-6 text-[#B7B7B7]">
              {task.title}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7E7E7E]">
              From {roleSlugToName(task.createdBy)} to{" "}
              {roleSlugToName(task.assignedTo)}
            </p>
            <select
              value={task.status}
              onChange={(event) =>
                onStatusChange(task.id, event.target.value as TaskStatus)
              }
              className="mt-3 rounded-lg border border-[#2A2A2A] bg-[#050505] px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#FF7A00]"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
