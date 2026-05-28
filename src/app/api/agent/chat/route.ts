import { NextResponse } from "next/server";
import type {
  AgentChatRequestPayload,
  AgentChatResponsePayload,
} from "@/lib/agent-types";

export async function POST(request: Request) {
  const payload = (await request.json()) as AgentChatRequestPayload;
  const question = payload.question?.trim() || "What should I focus on next?";
  const agentName = payload.agentName || "Business Lab Agent";

  const response: AgentChatResponsePayload = {
    answer: [
      `${agentName} fake API answer:`,
      `I reviewed your question: "${question}".`,
      "Recommended structure: clarify the goal, identify the owner, define the next measurable action, and assign it to the correct role.",
      "This is still a fake backend response. OpenAI can replace this logic later.",
    ].join(" "),
  };

  return NextResponse.json(response);
}
