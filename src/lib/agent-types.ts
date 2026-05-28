import type { RoleSlug } from "@/lib/business-lab-data";
import type { BusinessReport } from "@/components/business-lab-provider";

export type AgentRequestPayload = {
  role: RoleSlug;
  reports: BusinessReport[];
};

export type AgentTaskResult = {
  title: string;
  assignedTo: RoleSlug;
  createdBy: RoleSlug;
};

export type AgentResponsePayload = {
  summary: string;
  outputReport: string;
  task: AgentTaskResult;
};

export type AgentChatRequestPayload = {
  agentName: string;
  question: string;
};

export type AgentChatResponsePayload = {
  answer: string;
};
