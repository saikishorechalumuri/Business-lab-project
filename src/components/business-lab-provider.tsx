"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { roles, type RoleSlug } from "@/lib/business-lab-data";
import type { AgentResponsePayload } from "@/lib/agent-types";
import { roleNameToSlug, roleSlugToName } from "@/lib/role-utils";

export type ReportStatus = "Draft" | "Approved" | "Assigned";
export type TaskStatus = "To Do" | "In Progress" | "Done";

export type BusinessReport = {
  id: string;
  title: string;
  type: string;
  ownerRole: RoleSlug;
  assignedRole: RoleSlug;
  context: string;
  guardrails: string;
  instructions: string;
  draft: string;
  status: ReportStatus;
  createdAt: string;
};

export type BusinessTask = {
  id: string;
  title: string;
  assignedTo: RoleSlug;
  createdBy: RoleSlug;
  sourceReportId?: string;
  status: TaskStatus;
  createdAt: string;
};

type CreateReportInput = {
  title: string;
  type: string;
  ownerRole: RoleSlug;
  assignedRole: RoleSlug;
  context: string;
  guardrails: string;
  instructions: string;
  draft: string;
};

type BusinessLabContextValue = {
  reports: BusinessReport[];
  tasks: BusinessTask[];
  outputReports: Record<RoleSlug, string>;
  lastAction: string;
  createReport: (input: CreateReportInput) => void;
  updateReport: (id: string, title: string, context: string) => void;
  deleteReport: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  activateAgent: (role: RoleSlug) => Promise<void>;
  runDemoFlow: () => void;
  clearLocalData: () => void;
};

const BusinessLabContext = createContext<BusinessLabContextValue | null>(null);
const STORAGE_KEY = "business-lab-phase-2-state";

type StoredBusinessLabState = {
  reports?: BusinessReport[];
  tasks?: BusinessTask[];
  outputReports?: Record<RoleSlug, string>;
  lastAction?: string;
};

export function BusinessLabProvider({ children }: { children: ReactNode }) {
  const initialReports = useMemo(() => createInitialReports(), []);
  const initialTasks = useMemo(() => createInitialTasks(), []);
  const initialOutputReports = useMemo(() => createInitialOutputReports(), []);
  const [lastAction, setLastAction] = useState(
    "Phase 2 local state is ready. Create a report, assign it, or activate an agent.",
  );
  const [reports, setReports] = useState<BusinessReport[]>(initialReports);
  const [tasks, setTasks] = useState<BusinessTask[]>(initialTasks);
  const [outputReports, setOutputReports] =
    useState<Record<RoleSlug, string>>(initialOutputReports);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedState = readStoredState();

      if (storedState?.reports) {
        setReports(storedState.reports);
      }

      if (storedState?.tasks) {
        setTasks(storedState.tasks);
      }

      if (storedState?.outputReports) {
        setOutputReports(storedState.outputReports);
      }

      if (storedState?.lastAction) {
        setLastAction(storedState.lastAction);
      }

      setHasLoadedStorage(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ reports, tasks, outputReports, lastAction }),
    );
  }, [hasLoadedStorage, lastAction, outputReports, reports, tasks]);

  const value = useMemo<BusinessLabContextValue>(
    () => ({
      reports,
      tasks,
      outputReports,
      lastAction,
      createReport(input) {
        const id = createId("report");
        const report: BusinessReport = {
          id,
          ...input,
          status: "Assigned",
          createdAt: new Date().toLocaleString(),
        };

        const task: BusinessTask = {
          id: createId("task"),
          title: `Review report: ${input.title}`,
          assignedTo: input.assignedRole,
          createdBy: input.ownerRole,
          sourceReportId: id,
          status: "To Do",
          createdAt: new Date().toLocaleString(),
        };

        setReports((current) => [report, ...current]);
        setTasks((current) => [task, ...current]);
        setLastAction(
          `Report "${input.title}" created by ${roleSlugToName(input.ownerRole)} and assigned to ${roleSlugToName(input.assignedRole)}.`,
        );
      },
      updateReport(id, title, context) {
        setReports((current) =>
          current.map((report) =>
            report.id === id ? { ...report, title, context } : report,
          ),
        );
        setLastAction(`Report "${title}" was updated.`);
      },
      deleteReport(id) {
        const reportTitle =
          reports.find((report) => report.id === id)?.title ?? "Report";
        setReports((current) => current.filter((report) => report.id !== id));
        setTasks((current) =>
          current.filter((task) => task.sourceReportId !== id),
        );
        setLastAction(`Deleted "${reportTitle}" and removed linked tasks.`);
      },
      updateTaskStatus(id, status) {
        setTasks((current) =>
          current.map((task) => (task.id === id ? { ...task, status } : task)),
        );
        setLastAction(`Task status changed to ${status}.`);
      },
      async activateAgent(role) {
        const roleReports = reports.filter((report) => report.ownerRole === role);
        setLastAction(`${roleSlugToName(role)} agent is calling the fake backend API...`);

        try {
          const response = await fetch("/api/agent/report", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              role,
              reports: roleReports,
            }),
          });

          if (!response.ok) {
            throw new Error("Agent API request failed");
          }

          const result = (await response.json()) as AgentResponsePayload;
          const generatedTask: BusinessTask = {
            id: createId("api-agent-task"),
            title: result.task.title,
            assignedTo: result.task.assignedTo,
            createdBy: result.task.createdBy,
            status: "To Do",
            createdAt: new Date().toLocaleString(),
          };

          setTasks((current) => [generatedTask, ...current]);
          setOutputReports((current) => ({
            ...current,
            [role]: result.outputReport,
          }));
          setLastAction(
            `${roleSlugToName(role)} agent used the fake API and created a task for ${roleSlugToName(result.task.assignedTo)}.`,
          );
          return;
        } catch {
          setLastAction(
            "Fake backend API failed, so Business Lab used the local fallback agent.",
          );
        }

        const generatedTask: BusinessTask = {
          id: createId("agent-task"),
          title: `Agent follow-up: ${roleReports[0]?.title ?? "Create a weekly execution report"}`,
          assignedTo: nextRole(role),
          createdBy: role,
          status: "To Do",
          createdAt: new Date().toLocaleString(),
        };

        setTasks((current) => [generatedTask, ...current]);
        setOutputReports((current) => ({
          ...current,
          [role]: `${roleSlugToName(role)} agent output: reviewed ${roleReports.length} report(s), created "${generatedTask.title}" for ${roleSlugToName(generatedTask.assignedTo)}, and recommended one measurable next action for this week.`,
        }));
        setLastAction(
          `${roleSlugToName(role)} agent created a task for ${roleSlugToName(generatedTask.assignedTo)}.`,
        );
      },
      runDemoFlow() {
        const now = new Date().toLocaleString();
        const demoReports: BusinessReport[] = [
          createDemoReport({
            title: "CEO Growth Strategy Brief",
            type: "Strategy",
            ownerRole: "ceo",
            assignedRole: "vp",
            context:
              "CEO wants a clear monthly growth plan with ownership and measurable priorities.",
            draft:
              "Focus the business on revenue growth, retention, and operational accountability this month.",
            createdAt: now,
          }),
          createDemoReport({
            title: "VP Department Execution Plan",
            type: "Operations",
            ownerRole: "vp",
            assignedRole: "manager",
            context:
              "VP converts the CEO strategy into department-level operating priorities.",
            draft:
              "Assign weekly department targets, clarify manager owners, and remove execution bottlenecks.",
            createdAt: now,
          }),
          createDemoReport({
            title: "Manager Team Action Plan",
            type: "Team Execution",
            ownerRole: "manager",
            assignedRole: "team-member",
            context:
              "Manager turns department priorities into team-member tasks and follow-up routines.",
            draft:
              "Create daily actions for team members, track blockers, and submit end-of-day progress.",
            createdAt: now,
          }),
        ];
        const demoTasks: BusinessTask[] = [
          createDemoTask({
            title: "Build VP plan from CEO Growth Strategy Brief",
            assignedTo: "vp",
            createdBy: "ceo",
            sourceReportId: demoReports[0].id,
            createdAt: now,
          }),
          createDemoTask({
            title: "Build Manager plan from VP Department Execution Plan",
            assignedTo: "manager",
            createdBy: "vp",
            sourceReportId: demoReports[1].id,
            createdAt: now,
          }),
          createDemoTask({
            title: "Complete daily actions from Manager Team Action Plan",
            assignedTo: "team-member",
            createdBy: "manager",
            sourceReportId: demoReports[2].id,
            createdAt: now,
          }),
        ];

        setReports((current) => [...demoReports, ...current]);
        setTasks((current) => [...demoTasks, ...current]);
        setOutputReports((current) => ({
          ...current,
          ceo: "Demo output: CEO strategy was converted into a VP-owned growth execution plan.",
          vp: "Demo output: VP operations plan was converted into manager-level execution work.",
          manager:
            "Demo output: Manager plan was converted into team-member daily action tasks.",
          "team-member":
            "Demo output: Team Member now has a clear daily action generated from the internal chain.",
        }));
        setLastAction(
          "Demo flow ran successfully: CEO report -> VP task -> Manager task -> Team Member action.",
        );
      },
      clearLocalData() {
        setReports(initialReports);
        setTasks(initialTasks);
        setOutputReports(initialOutputReports);
        setLastAction("Local demo data was reset.");
        window.localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [
      initialOutputReports,
      initialReports,
      initialTasks,
      lastAction,
      outputReports,
      reports,
      tasks,
    ],
  );

  return (
    <BusinessLabContext.Provider value={value}>
      {children}
    </BusinessLabContext.Provider>
  );
}

function createDemoReport({
  title,
  type,
  ownerRole,
  assignedRole,
  context,
  draft,
  createdAt,
}: {
  title: string;
  type: string;
  ownerRole: RoleSlug;
  assignedRole: RoleSlug;
  context: string;
  draft: string;
  createdAt: string;
}): BusinessReport {
  return {
    id: createId("demo-report"),
    title,
    type,
    ownerRole,
    assignedRole,
    context,
    guardrails: "Keep the plan simple, measurable, and assigned to one clear role.",
    instructions:
      "Turn the report into an action plan with ownership, next step, and measurable progress.",
    draft,
    status: "Assigned",
    createdAt,
  };
}

function createDemoTask({
  title,
  assignedTo,
  createdBy,
  sourceReportId,
  createdAt,
}: {
  title: string;
  assignedTo: RoleSlug;
  createdBy: RoleSlug;
  sourceReportId: string;
  createdAt: string;
}): BusinessTask {
  return {
    id: createId("demo-task"),
    title,
    assignedTo,
    createdBy,
    sourceReportId,
    status: "To Do",
    createdAt,
  };
}

export function useBusinessLab() {
  const context = useContext(BusinessLabContext);

  if (!context) {
    throw new Error("useBusinessLab must be used inside BusinessLabProvider");
  }

  return context;
}

function createInitialReports() {
  return roles.flatMap<BusinessReport>((role) =>
    role.reports.map((report, index) => ({
      id: `${role.slug}-report-${index}`,
      title: report,
      type: index % 2 === 0 ? "Weekly Review" : "Operations",
      ownerRole: role.slug,
      assignedRole: role.slug,
      context: `${report} context placeholder for ${role.name}.`,
      guardrails: "Keep the report clear, role-specific, and action-focused.",
      instructions: "Summarize the situation and recommend the next action.",
      draft: `${report}: placeholder draft that will become a full report in later phases.`,
      status: "Draft" as ReportStatus,
      createdAt: "Phase 2 Demo",
    })),
  );
}

function createInitialTasks() {
  return roles.flatMap<BusinessTask>((role) => [
    ...role.assignedTasks.map((task, index) => ({
      id: `${role.slug}-assigned-${index}`,
      title: task,
      assignedTo: role.slug,
      createdBy: role.slug,
      status: "To Do" as TaskStatus,
      createdAt: "Phase 2 Demo",
    })),
    ...role.createdTasks.map((task, index) => ({
      id: `${role.slug}-created-${index}`,
      title: task,
      assignedTo: nextRole(role.slug),
      createdBy: role.slug,
      status: "To Do" as TaskStatus,
      createdAt: "Phase 2 Demo",
    })),
  ]);
}

function readStoredState(): StoredBusinessLabState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return null;
  }

  try {
    const parsedState = JSON.parse(savedState) as StoredBusinessLabState;

    return {
      ...parsedState,
      reports: parsedState.reports
        ? dedupeById(parsedState.reports, "report")
        : undefined,
      tasks: parsedState.tasks ? dedupeById(parsedState.tasks, "task") : undefined,
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function dedupeById<T extends { id: string }>(items: T[], fallbackPrefix: string) {
  const seenIds = new Set<string>();

  return items.map((item) => {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      return item;
    }

    const replacement = {
      ...item,
      id: createId(fallbackPrefix),
    };
    seenIds.add(replacement.id);
    return replacement;
  });
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createInitialOutputReports(): Record<RoleSlug, string> {
  return {
    ceo: roles[0].outputReport,
    vp: roles[1].outputReport,
    manager: roles[2].outputReport,
    "team-member": roles[3].outputReport,
  };
}

function nextRole(role: RoleSlug): RoleSlug {
  if (role === "ceo") {
    return "vp";
  }

  if (role === "vp") {
    return "manager";
  }

  if (role === "manager") {
    return "team-member";
  }

  return "manager";
}

export function roleNameToBusinessSlug(roleName: string) {
  return roleNameToSlug(roleName);
}
