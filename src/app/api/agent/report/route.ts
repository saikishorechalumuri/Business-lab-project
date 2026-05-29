import { NextResponse } from "next/server";
import type {
  AgentRequestPayload,
} from "@/lib/agent-types";
import { runBusinessLabAgent } from "@/lib/agents/orchestrator";
import type { RoleSlug } from "@/lib/business-lab-data";
import {
  checkRateLimit,
  hasBusinessLabAccess,
  readLimitedJson,
  reject,
  sanitizeText,
  validateSameOrigin,
} from "@/lib/security";

const validRoles = new Set<RoleSlug>(["ceo", "vp", "manager", "team-member"]);

export async function POST(request: Request) {
  if (!validateSameOrigin(request)) {
    return reject("Blocked cross-site agent request.");
  }

  if (!hasBusinessLabAccess(request)) {
    return reject("Agent access requires demo login.");
  }

  if (!checkRateLimit(request)) {
    return reject("Too many agent requests. Please wait a minute.", 429);
  }

  let payload: AgentRequestPayload;

  try {
    payload = await readLimitedJson<AgentRequestPayload>(request);
  } catch {
    return reject("Invalid or oversized agent request.", 400);
  }

  if (!validRoles.has(payload.role)) {
    return reject("Invalid role.", 400);
  }

  const reports = (payload.reports ?? []).slice(0, 5).map((report) => ({
    ...report,
    title: sanitizeText(report.title, 120),
    type: sanitizeText(report.type, 80),
    context: sanitizeText(report.context, 1500),
    guardrails: sanitizeText(report.guardrails, 800),
    instructions: sanitizeText(report.instructions, 1000),
    draft: sanitizeText(report.draft, 2500),
  }));
  const result = await runBusinessLabAgent({ role: payload.role, reports });

  return NextResponse.json(result);
}
