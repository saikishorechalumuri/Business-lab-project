import type {
  AgentRequestPayload,
  AgentResponsePayload,
} from "@/lib/agent-types";
import { getReportTitle } from "@/lib/agents/agent-utils";
import { roleSlugToName } from "@/lib/role-utils";

export function runInsightsAgent(
  payload: AgentRequestPayload,
): AgentResponsePayload {
  const latestReport = payload.reports[0];
  const reportTitle = getReportTitle("Daily Work Update", latestReport?.title);
  const roleName = roleSlugToName(payload.role);

  return {
    summary: `${roleName} Insights Agent reviewed the work update and found the clearest next action.`,
    outputReport: [
      `${roleName} Insights Agent Output`,
      `Insight source: ${reportTitle}.`,
      "Key insight: the next update should clearly show what was completed, what is blocked, and what help is needed.",
      "Recommended action: send a concise progress report to the manager with one blocker and one next step.",
    ].join(" "),
    task: {
      title: `Insights Agent follow-up: ${reportTitle}`,
      assignedTo: "manager",
      createdBy: payload.role,
    },
  };
}
