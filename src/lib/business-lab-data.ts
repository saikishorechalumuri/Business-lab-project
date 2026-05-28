export type RoleSlug = "ceo" | "vp" | "manager" | "team-member";

export type RoleData = {
  slug: RoleSlug;
  loginLabel: string;
  name: string;
  title: string;
  level: string;
  reportsTo: string;
  manages: string;
  mission: string;
  focus: string;
  reports: string[];
  assignedTasks: string[];
  createdTasks: string[];
  taskTodo: string;
  outputReport: string;
};

export type AgentCard = {
  roleSlug?: RoleSlug;
  name: string;
  owner: string;
  description: string;
  promptPlaceholder: string;
  sampleAnswer: string;
};

export const roleHierarchy = ["CEO", "VP", "Manager", "Team Member"];

export const reportTypes = [
  "Strategy",
  "Revenue",
  "Operations",
  "Team Execution",
  "Outreach",
  "Follow-Up",
  "Blocker",
  "Weekly Review",
  "Other",
];

export const agentCards: AgentCard[] = [
  {
    roleSlug: "ceo",
    name: "CEO Strategy Agent",
    owner: "Leadership and business direction",
    description:
      "Turns executive reports into strategic priorities, company-level risks, and VP assignments.",
    promptPlaceholder: "Ask about growth strategy, risks, priorities, or VP assignments...",
    sampleAnswer:
      "Strategy preview: focus on the highest-leverage business priority, define the risk, and assign the VP one measurable plan for the week.",
  },
  {
    roleSlug: "vp",
    name: "VP Operations Agent",
    owner: "Operations and department execution",
    description:
      "Turns VP reports into manager-level operational tasks, bottleneck fixes, and weekly execution plans.",
    promptPlaceholder: "Ask about department bottlenecks, weekly plans, or manager assignments...",
    sampleAnswer:
      "Operations preview: convert the CEO priority into department owners, timelines, and manager-level blockers to resolve this week.",
  },
  {
    roleSlug: "manager",
    name: "Manager Execution Agent",
    owner: "Team accountability",
    description:
      "Turns manager reports into team-member tasks, follow-ups, and accountability actions.",
    promptPlaceholder: "Ask about team execution, blockers, follow-ups, or accountability...",
    sampleAnswer:
      "Execution preview: break the plan into team-member tasks, define the deadline, and flag the blocker that needs leadership help.",
  },
  {
    roleSlug: "team-member",
    name: "Team Member Action Agent",
    owner: "Daily work execution",
    description:
      "Turns assigned work into personal daily tasks, outreach actions, and end-of-day reporting.",
    promptPlaceholder: "Ask about today's work, blockers, outreach actions, or daily reporting...",
    sampleAnswer:
      "Action preview: complete the assigned task, report progress clearly, and raise any blocker before the end of the day.",
  },
  {
    name: "Report Builder Agent",
    owner: "Document creation and cleanup",
    description:
      "Uses role, context, guardrails, instructions, and knowledge to create clean reports for approval.",
    promptPlaceholder: "Ask for help drafting a clean report from your context...",
    sampleAnswer:
      "Report preview: name the report, choose the report type, add context, set guardrails, then approve and assign the draft.",
  },
  {
    name: "CSV Insights Agent",
    owner: "Data analysis for every role",
    description:
      "Analyzes uploaded CSV data locally and gives simple insights based on the user's question.",
    promptPlaceholder: "Upload CSV data, then ask what trend, risk, or opportunity you should notice...",
    sampleAnswer:
      "CSV insight preview: upload data to see row counts, column names, numeric totals, averages, and simple business takeaways.",
  },
];

export function getAgentsForRole(roleSlug: RoleSlug) {
  return agentCards.filter(
    (agent) =>
      agent.roleSlug === roleSlug ||
      agent.name === "Report Builder Agent" ||
      agent.name === "CSV Insights Agent",
  );
}

export const roles: RoleData[] = [
  {
    slug: "ceo",
    loginLabel: "CEO Login",
    name: "CEO",
    title: "Executive Dashboard",
    level: "Company leadership",
    reportsTo: "Board / Ownership",
    manages: "VP",
    mission: "Set direction, review risk, and keep the whole business chain aligned.",
    focus: "Strategy, company health, executive decisions",
    reports: [
      "Quarterly Growth Direction",
      "Executive Risk Review",
      "Company Health Summary",
      "Revenue Expansion Notes",
      "Leadership Alignment Memo",
      "Board Update Draft",
    ],
    assignedTasks: [
      "Approve final company priorities",
      "Review VP escalation report",
      "Confirm budget direction",
    ],
    createdTasks: [
      "Ask VP to break down revenue plan",
      "Request manager delivery risk summary",
    ],
    taskTodo:
      "Review company priorities and assign the highest-leverage execution focus to the VP.",
    outputReport:
      "Executive summary placeholder: growth priority, major risks, and VP ownership will appear here.",
  },
  {
    slug: "vp",
    loginLabel: "VP Login",
    name: "VP",
    title: "Department Dashboard",
    level: "Department leadership",
    reportsTo: "CEO",
    manages: "Manager",
    mission: "Translate executive goals into department plans, owners, and targets.",
    focus: "Department planning, budget, cross-team coordination",
    reports: [
      "Department Performance Update",
      "Budget Allocation Plan",
      "Cross-Team Dependency Log",
      "Launch Readiness Review",
      "Hiring Needs Summary",
      "Operational Risk Notes",
      "CEO Escalation Brief",
    ],
    assignedTasks: [
      "Break CEO growth direction into department goals",
      "Prepare manager planning packet",
      "Resolve marketing and product timeline conflict",
    ],
    createdTasks: [
      "Assign launch checklist to manager",
      "Request weekly blocker summary",
      "Ask team for customer trend examples",
    ],
    taskTodo:
      "Turn the CEO direction into department targets, owners, and manager-level execution steps.",
    outputReport:
      "Operations summary placeholder: bottlenecks, weekly plan, and manager assignments will appear here.",
  },
  {
    slug: "manager",
    loginLabel: "Manager Login",
    name: "Manager",
    title: "Execution Dashboard",
    level: "Team leadership",
    reportsTo: "VP",
    manages: "Team Member",
    mission: "Convert department plans into team tasks, timelines, and delivery updates.",
    focus: "Execution, blockers, team ownership",
    reports: [
      "Weekly Team Delivery Report",
      "Sprint Blocker Summary",
      "Customer Feedback Breakdown",
      "Launch Task Tracker",
      "Support Theme Review",
      "Team Capacity Notes",
      "VP Update Draft",
      "Process Improvement Ideas",
    ],
    assignedTasks: [
      "Create team action plan from VP packet",
      "Identify launch blockers by Friday",
      "Assign support themes to team members",
    ],
    createdTasks: [
      "Ask team member to draft onboarding checklist",
      "Request customer issue examples",
      "Assign help article update",
    ],
    taskTodo:
      "Convert department priorities into team tasks, deadlines, and blocker follow-ups.",
    outputReport:
      "Execution summary placeholder: team progress, blockers, and next actions will appear here.",
  },
  {
    slug: "team-member",
    loginLabel: "Team Member Login",
    name: "Team Member",
    title: "Work Dashboard",
    level: "Individual contributor",
    reportsTo: "Manager",
    manages: "No direct reports",
    mission: "Complete assigned work, submit updates, and flag blockers early.",
    focus: "Task progress, daily updates, work output",
    reports: [
      "Daily Work Update",
      "Onboarding Checklist Draft",
      "Customer Issue Notes",
      "Help Article Progress",
      "Blocked Task Summary",
      "Completed Work Log",
    ],
    assignedTasks: [
      "Draft onboarding checklist",
      "Collect three customer issue examples",
      "Update help article outline",
      "Flag blocker on approval workflow",
    ],
    createdTasks: [
      "Request manager review",
      "Ask for missing customer context",
    ],
    taskTodo:
      "Complete today's assigned work, submit progress, and flag any blocker before end of day.",
    outputReport:
      "Daily action summary placeholder: completed work, blockers, and tomorrow's focus will appear here.",
  },
];

export function getRoleBySlug(slug: string) {
  return roles.find((role) => role.slug === slug);
}
