import { NextResponse } from "next/server";
import type {
  AgentRequestPayload,
  AgentResponsePayload,
} from "@/lib/agent-types";
import type { RoleSlug } from "@/lib/business-lab-data";
import { roleSlugToName } from "@/lib/role-utils";

export async function POST(request: Request) {
  const payload = (await request.json()) as AgentRequestPayload;
  const role = payload.role;
  const reports = payload.reports ?? [];
  const latestReport = reports[0];
  const assignedTo = getNextRole(role);
  const reportTitle = latestReport?.title ?? "Weekly Execution Report";
  const reportCount = reports.length;

  const response: AgentResponsePayload = {
    summary: `${roleSlugToName(role)} fake backend agent reviewed ${reportCount} report(s).`,
    outputReport: [
      `${roleSlugToName(role)} Agent Output`,
      `Reviewed ${reportCount} report(s), including "${reportTitle}".`,
      `Recommended next step: assign one measurable follow-up to ${roleSlugToName(assignedTo)} and review progress before the end of the week.`,
      "This is a fake API response. OpenAI is not connected yet.",
    ].join(" "),
    task: {
      title: `API agent follow-up: ${reportTitle}`,
      assignedTo,
      createdBy: role,
    },
  };

  return NextResponse.json(response);
}

function getNextRole(role: RoleSlug): RoleSlug {
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
