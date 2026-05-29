import { NextResponse } from "next/server";
import type {
  AgentChatRequestPayload,
  AgentChatResponsePayload,
} from "@/lib/agent-types";

export async function POST(request: Request) {
  const payload = (await request.json()) as AgentChatRequestPayload;
  const question = payload.question?.trim() || "What should I focus on next?";
  const agentName = payload.agentName || "Business Lab Agent";
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const answer = await askOpenAIAgent(agentName, question, apiKey);

      return NextResponse.json({ answer } satisfies AgentChatResponsePayload);
    } catch (error) {
      console.error("Agent chat failed, using demo fallback.", error);
    }
  }

  const response: AgentChatResponsePayload = {
    answer: [
      `${agentName} demo answer:`,
      `I reviewed your question: "${question}".`,
      "Recommended structure: clarify the goal, identify the owner, define the next measurable action, and assign it to the correct role.",
      apiKey
        ? "OpenAI fallback was used because the live request failed."
        : "Demo mode: add OPENAI_API_KEY to enable live AI answers.",
    ].join(" "),
  };

  return NextResponse.json(response);
}

async function askOpenAIAgent(
  agentName: string,
  question: string,
  apiKey: string,
) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are a concise Business Lab role agent. Help the user turn business reports, updates, and goals into clear plans, owners, risks, and next actions. Keep answers practical and under 130 words.",
        },
        {
          role: "user",
          content: `Agent: ${agentName}\nQuestion: ${question}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI chat failed with status ${response.status}`);
  }

  const data = (await response.json()) as { output_text?: string };

  if (!data.output_text) {
    throw new Error("OpenAI chat did not include output_text.");
  }

  return data.output_text;
}
