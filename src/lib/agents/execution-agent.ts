import type {
  AgentRequestPayload,
  AgentResponsePayload,
} from "@/lib/agent-types";
import { getNextRole, getReportTitle } from "@/lib/agents/agent-utils";
import { roleSlugToName } from "@/lib/role-utils";

export function runExecutionAgent(
  payload: AgentRequestPayload,
): AgentResponsePayload {
  const latestReport = payload.reports[0];
  const assignedTo = getNextRole(payload.role);
  const reportTitle = getReportTitle("Department Execution Plan", latestReport?.title);
  const roleName = roleSlugToName(payload.role);
  const assignedRoleName = roleSlugToName(assignedTo);

  return {
    summary: `${roleName} Execution Agent converted ${payload.reports.length} report(s) into an owner-led action plan.`,
    outputReport: [
      `${roleName} Execution Agent Output`,
      `Execution focus: ${reportTitle}.`,
      `Immediate action: define the owner, deadline, blocker, and proof of completion for ${assignedRoleName}.`,
      "Follow-up rhythm: review progress daily, remove one blocker, and update leadership with the result.",
    ].join(" "),
    task: {
      title: `Execution Agent task: ${reportTitle}`,
      assignedTo,
      createdBy: payload.role,
    },
  };
}
