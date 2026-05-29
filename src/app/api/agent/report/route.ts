import { NextResponse } from "next/server";
import type {
  AgentRequestPayload,
} from "@/lib/agent-types";
import { runBusinessLabAgent } from "@/lib/agents/orchestrator";

export async function POST(request: Request) {
  const payload = (await request.json()) as AgentRequestPayload;
  const result = await runBusinessLabAgent({
    role: payload.role,
    reports: payload.reports ?? [],
  });

  return NextResponse.json(result);
}
