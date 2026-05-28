"use client";

import { useState } from "react";
import { reportTypes, roleHierarchy, type RoleSlug } from "@/lib/business-lab-data";
import { useBusinessLab } from "@/components/business-lab-provider";
import { roleNameToSlug } from "@/lib/role-utils";

type ReportWizardProps = {
  roleName: string;
  roleSlug: RoleSlug;
};

const wizardSteps = [
  "Name",
  "Type",
  "Agent",
  "Context",
  "Knowledge",
  "Draft",
  "Assign",
];

export function ReportWizard({ roleName, roleSlug }: ReportWizardProps) {
  const { createReport } = useBusinessLab();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [reportName, setReportName] = useState(`${roleName} Weekly Review`);
  const [reportType, setReportType] = useState("Weekly Review");
  const [assignedRole, setAssignedRole] = useState(roleName);
  const [context, setContext] = useState(
    "What is happening in the business right now?",
  );
  const [guardrails, setGuardrails] = useState(
    "What should the agent avoid, protect, or keep consistent?",
  );
  const [instructions, setInstructions] = useState(
    "What kind of report or output should the agent create?",
  );
  const [draft, setDraft] = useState(
    "Agent draft placeholder: summarize the situation, recommend next actions, and prepare assignment-ready tasks.",
  );

  const closeWizard = () => {
    setIsOpen(false);
    setStep(0);
  };

  const finishReport = () => {
    createReport({
      title: reportName.trim() || `${roleName} Report`,
      type: reportType,
      ownerRole: roleSlug,
      assignedRole: roleNameToSlug(assignedRole),
      context,
      guardrails,
      instructions,
      draft,
    });
    closeWizard();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-[#FF7A00] px-4 py-3 text-sm font-black text-[#050505] shadow-[0_0_30px_rgba(255,122,0,0.25)] transition hover:bg-[#ff9a32]"
      >
        Create Report
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#111111] shadow-[0_0_80px_rgba(255,122,0,0.18)]">
            <div className="border-b border-[#2A2A2A] p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00]">
                    Report Builder Agent
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    Create an agent-assisted report
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#B7B7B7]">
                    Phase 2 local preview: this wizard creates a report and
                    assignment in browser state without a database or OpenAI.
                  </p>
                </div>
                <button
                  onClick={closeWizard}
                  className="w-fit rounded-lg border border-[#2A2A2A] px-3 py-2 text-sm font-bold text-[#B7B7B7] hover:border-[#FF7A00] hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-7">
                {wizardSteps.map((label, index) => (
                  <button
                    key={label}
                    onClick={() => setStep(index)}
                    className={`rounded-lg border px-2 py-2 text-xs font-bold ${
                      step === index
                        ? "border-[#FF7A00] bg-[#FF7A00] text-[#050505]"
                        : "border-[#2A2A2A] bg-[#141414] text-[#B7B7B7]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {step === 0 && (
                <WizardSection
                  title="Name the report"
                  description="Give the report a clear business name so the agent knows the purpose."
                >
                  <label className="text-sm font-bold text-white">
                    Report name
                  </label>
                  <input
                    value={reportName}
                    onChange={(event) => setReportName(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none focus:border-[#FF7A00]"
                  />
                </WizardSection>
              )}

              {step === 1 && (
                <WizardSection
                  title="Choose report type"
                  description="Select the kind of report the agent should help create."
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    {reportTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setReportType(type)}
                        className={`rounded-lg border p-4 text-left text-sm font-bold ${
                          reportType === type
                            ? "border-[#FF7A00] bg-[#FF7A00]/15 text-white"
                            : "border-[#2A2A2A] bg-[#141414] text-[#B7B7B7]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </WizardSection>
              )}

              {step === 2 && (
                <WizardSection
                  title="Ask agent to create"
                  description="This is the Phase 1 placeholder for agent-assisted report generation."
                >
                  <div className="rounded-xl border border-[#FF7A00]/40 bg-[#FF7A00]/10 p-5">
                    <p className="text-lg font-black text-white">
                      Ask Agent to Create
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#B7B7B7]">
                      The future agent will use the role, context, guardrails,
                      instructions, and uploaded knowledge to generate a draft.
                    </p>
                  </div>
                </WizardSection>
              )}

              {step === 3 && (
                <WizardSection
                  title="Add role, context, guardrails, and instructions"
                  description="Guide the future agent with the information it needs."
                >
                  <div className="grid gap-4">
                    <Field label="Role" value={roleName} />
                    <TextArea
                      label="Context"
                      value={context}
                      onChange={setContext}
                    />
                    <TextArea
                      label="Guardrails"
                      value={guardrails}
                      onChange={setGuardrails}
                    />
                    <TextArea
                      label="Instructions"
                      value={instructions}
                      onChange={setInstructions}
                    />
                  </div>
                </WizardSection>
              )}

              {step === 4 && (
                <WizardSection
                  title="Upload knowledge or data"
                  description="Phase 1 UI-only placeholder for PDFs, notes, CSVs, screenshots, or pasted text."
                >
                  <div className="rounded-xl border border-dashed border-[#FF7A00]/50 bg-[#050505] p-8 text-center">
                    <p className="text-lg font-black text-white">
                      Drop files or paste knowledge here
                    </p>
                    <p className="mt-2 text-sm text-[#B7B7B7]">
                      Uploads are not active yet. This becomes real after local
                      report and task logic is stable.
                    </p>
                  </div>
                </WizardSection>
              )}

              {step === 5 && (
                <WizardSection
                  title="Generate draft and approve"
                  description="Preview the report, then approve, edit, or regenerate."
                >
                  <div className="rounded-xl border border-[#2A2A2A] bg-[#050505] p-5">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#FF7A00]">
                      Draft Report
                    </p>
                    <h3 className="mt-3 text-xl font-black text-white">
                      {reportName}
                    </h3>
                    <textarea
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      rows={5}
                      className="mt-3 w-full rounded-lg border border-[#2A2A2A] bg-[#111111] px-4 py-3 text-sm leading-6 text-[#B7B7B7] outline-none focus:border-[#FF7A00]"
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="rounded-lg bg-[#FF7A00] px-4 py-2 text-sm font-black text-[#050505]">
                        Approve
                      </button>
                      <button className="rounded-lg border border-[#2A2A2A] px-4 py-2 text-sm font-bold text-white">
                        Edit
                      </button>
                      <button className="rounded-lg border border-[#2A2A2A] px-4 py-2 text-sm font-bold text-white">
                        Regenerate
                      </button>
                    </div>
                  </div>
                </WizardSection>
              )}

              {step === 6 && (
                <WizardSection
                  title="Assign report or task"
                  description="Choose the correct role in the CEO to Team Member chain."
                >
                  <div className="grid gap-3 sm:grid-cols-4">
                    {roleHierarchy.map((role) => (
                      <button
                        key={role}
                        onClick={() => setAssignedRole(role)}
                        className={`rounded-lg border p-4 text-left text-sm font-bold ${
                          assignedRole === role
                            ? "border-[#FF7A00] bg-[#FF7A00]/15 text-white"
                            : "border-[#2A2A2A] bg-[#141414] text-[#B7B7B7]"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-[#2A2A2A] bg-[#050505] p-5">
                    <p className="text-sm font-bold text-white">
                      Assignment preview
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#B7B7B7]">
                      This report will create a task placeholder for{" "}
                      <span className="font-bold text-[#FF7A00]">
                        {assignedRole}
                      </span>
                      .
                    </p>
                  </div>
                </WizardSection>
              )}

              <div className="mt-6 flex justify-between gap-3 border-t border-[#2A2A2A] pt-5">
                <button
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  className="rounded-lg border border-[#2A2A2A] px-4 py-3 text-sm font-bold text-white hover:border-[#FF7A00]"
                >
                  Back
                </button>
                {step < wizardSteps.length - 1 ? (
                  <button
                    onClick={() =>
                      setStep((current) =>
                        Math.min(wizardSteps.length - 1, current + 1),
                      )
                    }
                    className="rounded-lg bg-[#FF7A00] px-4 py-3 text-sm font-black text-[#050505] hover:bg-[#ff9a32]"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={finishReport}
                    className="rounded-lg bg-[#FF7A00] px-4 py-3 text-sm font-black text-[#050505] hover:bg-[#ff9a32]"
                  >
                    Create Report & Task
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WizardSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-2xl font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#B7B7B7]">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <input
        defaultValue={value}
        className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none focus:border-[#FF7A00]"
      />
    </label>
  );
}

function TextArea({
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
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        className="mt-2 w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-white outline-none focus:border-[#FF7A00]"
      />
    </label>
  );
}
