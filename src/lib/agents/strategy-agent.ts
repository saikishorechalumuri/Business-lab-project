import type {
  AgentRequestPayload,
  AgentResponsePayload,
} from "@/lib/agent-types";
import { getNextRole, getReportTitle } from "@/lib/agents/agent-utils";
import { roleSlugToName } from "@/lib/role-utils";

type OpenAIMessage = {
  role: "system" | "user";
  content: string;
};

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

export async function runStrategyAgent(
  payload: AgentRequestPayload,
): Promise<AgentResponsePayload> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return createDemoStrategyResponse(payload);
  }

  try {
    return await runOpenAIStrategyAgent(payload, apiKey);
  } catch (error) {
    console.error("Strategy Agent failed, using demo fallback.", error);
    return createDemoStrategyResponse(payload);
  }
}

async function runOpenAIStrategyAgent(
  payload: AgentRequestPayload,
  apiKey: string,
): Promise<AgentResponsePayload> {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: buildMessages(payload),
      text: {
        format: {
          type: "json_schema",
          name: "business_lab_strategy_agent_result",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summary: { type: "string" },
              outputReport: { type: "string" },
              task: {
                type: "object",
                additionalProperties: false,
                properties: {
                  title: { type: "string" },
                  assignedTo: {
                    type: "string",
                    enum: ["ceo", "vp", "manager", "team-member"],
                  },
                  createdBy: {
                    type: "string",
                    enum: ["ceo", "vp", "manager", "team-member"],
                  },
                },
                required: ["title", "assignedTo", "createdBy"],
              },
            },
            required: ["summary", "outputReport", "task"],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    output_text?: string;
  };

  if (!data.output_text) {
    throw new Error("OpenAI response did not include output_text.");
  }

  return JSON.parse(data.output_text) as AgentResponsePayload;
}

function buildMessages(payload: AgentRequestPayload): OpenAIMessage[] {
  const roleName = roleSlugToName(payload.role);
  const reports = payload.reports.length
    ? payload.reports
        .slice(0, 5)
        .map(
          (report, index) =>
            `${index + 1}. ${report.title}\nType: ${report.type}\nContext: ${report.context}\nDraft: ${report.draft}\nInstructions: ${report.instructions}\nGuardrails: ${report.guardrails}`,
        )
        .join("\n\n")
    : "No reports were provided. Create a useful starter execution plan.";

  return [
    {
      role: "system",
      content:
        "You are the Business Lab Strategy Agent. Turn business reports into clear execution. Be concise, practical, and assign one next task to the correct next role in the CEO -> VP -> Manager -> Team Member chain.",
    },
    {
      role: "user",
      content: `Current user role: ${roleName}\n\nReports:\n${reports}\n\nReturn JSON only. The task.createdBy must match the current role. Assign CEO work to VP, VP work to Manager, Manager work to Team Member, and Team Member follow-ups to Manager.`,
    },
  ];
}

function createDemoStrategyResponse(
  payload: AgentRequestPayload,
): AgentResponsePayload {
  const latestReport = payload.reports[0];
  const assignedTo = getNextRole(payload.role);
  const reportTitle = getReportTitle("Weekly Execution Report", latestReport?.title);
  const roleName = roleSlugToName(payload.role);
  const assignedRoleName = roleSlugToName(assignedTo);

  return {
    summary: `${roleName} Strategy Agent reviewed ${payload.reports.length} report(s) and created one execution priority.`,
    outputReport: [
      `${roleName} Strategy Agent Output`,
      `Focus area: ${reportTitle}.`,
      `Recommended move: convert this report into one measurable action owned by ${assignedRoleName}.`,
      "Success check: review the owner, deadline, blocker, and progress update before the end of the week.",
      process.env.OPENAI_API_KEY
        ? "OpenAI fallback was used because the live request failed."
        : "Demo mode: add OPENAI_API_KEY to enable live AI generation.",
    ].join(" "),
    task: {
      title: `Strategy Agent action: ${reportTitle}`,
      assignedTo,
      createdBy: payload.role,
    },
  };
}
