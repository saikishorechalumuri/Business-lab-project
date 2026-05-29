import type {
  AgentRequestPayload,
  AgentResponsePayload,
} from "@/lib/agent-types";
import { runExecutionAgent } from "@/lib/agents/execution-agent";
import { runInsightsAgent } from "@/lib/agents/insights-agent";
import { runStrategyAgent } from "@/lib/agents/strategy-agent";

export async function runBusinessLabAgent(
  payload: AgentRequestPayload,
): Promise<AgentResponsePayload> {
  if (payload.role === "ceo") {
    return runStrategyAgent(payload);
  }

  if (payload.role === "team-member") {
    return runInsightsAgent(payload);
  }

  return runExecutionAgent(payload);
}
