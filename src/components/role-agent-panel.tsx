"use client";

import { useState } from "react";
import type { AgentChatResponsePayload } from "@/lib/agent-types";
import type { AgentCard } from "@/lib/business-lab-data";

type RoleAgentPanelProps = {
  agents: AgentCard[];
};

export function RoleAgentPanel({ agents }: RoleAgentPanelProps) {
  const [activeAgent, setActiveAgent] = useState(agents[0]);
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [agentAnswer, setAgentAnswer] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [csvText, setCsvText] = useState(
    "month,revenue,leads,conversions\nJanuary,12000,110,18\nFebruary,14500,125,21\nMarch,13200,118,19",
  );

  const isCsvAgent = activeAgent.name === "CSV Insights Agent";
  const answer = isCsvAgent
    ? analyzeCsv(csvText, question)
    : agentAnswer || activeAgent.sampleAnswer;

  const askAgent = async () => {
    if (isCsvAgent) {
      setShowAnswer(true);
      return;
    }

    setIsAsking(true);
    setShowAnswer(false);

    try {
      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentName: activeAgent.name,
          question,
        }),
      });

      if (!response.ok) {
        throw new Error("Agent chat API failed");
      }

      const result = (await response.json()) as AgentChatResponsePayload;
      setAgentAnswer(result.answer);
    } catch {
      setAgentAnswer(activeAgent.sampleAnswer);
    } finally {
      setIsAsking(false);
      setShowAnswer(true);
    }
  };

  return (
    <section className="mt-5 rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A00]">
            Your Agent Layer
          </p>
          <h2 className="mt-2 text-3xl font-black">
            Ask your role-specific agent
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#B7B7B7]">
            Each role sees only the agent built for that person. The Report
            Builder stays available to help create agent-assisted reports.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3">
          {agents.map((agent) => (
            <button
              key={agent.name}
              onClick={() => {
                setActiveAgent(agent);
                setShowAnswer(false);
                setQuestion("");
                setAgentAnswer("");
              }}
              className={`rounded-2xl border p-4 text-left transition ${
                activeAgent.name === agent.name
                  ? "border-[#FF7A00] bg-[#FF7A00]/10"
                  : "border-[#2A2A2A] bg-[#080808] hover:border-[#FF7A00]/70"
              }`}
            >
              <p className="text-sm font-black text-white">{agent.name}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FF7A00]">
                {agent.owner}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
                {agent.description}
              </p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-[#2A2A2A] bg-[#080808] p-5">
          <p className="text-sm font-black text-[#FF7A00]">
            {activeAgent.name}
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">
            Ask a planning question
          </h3>
          <textarea
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
              setShowAnswer(false);
            }}
            placeholder={activeAgent.promptPlaceholder}
            rows={5}
            className="mt-4 w-full rounded-xl border border-[#2A2A2A] bg-[#050505] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-[#777] focus:border-[#FF7A00]"
          />
          {isCsvAgent && (
            <div className="mt-4">
              <label className="text-sm font-bold text-white">
                CSV data
              </label>
              <textarea
                value={csvText}
                onChange={(event) => {
                  setCsvText(event.target.value);
                  setShowAnswer(false);
                }}
                rows={7}
                className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#050505] px-4 py-3 font-mono text-xs leading-5 text-white outline-none placeholder:text-[#777] focus:border-[#FF7A00]"
              />
              <label className="mt-3 block">
                <span className="text-sm font-bold text-white">
                  Upload CSV file
                </span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (!file) {
                      return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                      setCsvText(String(reader.result ?? ""));
                      setShowAnswer(false);
                    };
                    reader.readAsText(file);
                  }}
                  className="mt-2 block w-full text-sm text-[#B7B7B7] file:mr-4 file:rounded-lg file:border-0 file:bg-[#FF7A00] file:px-4 file:py-2 file:text-sm file:font-black file:text-[#050505]"
                />
              </label>
            </div>
          )}
          <button
            onClick={askAgent}
            className="mt-4 rounded-lg bg-[#FF7A00] px-4 py-3 text-sm font-black text-[#050505] hover:bg-[#ff9a32]"
          >
            {isAsking ? "Asking Agent..." : "Ask Agent"}
          </button>

          <div className="mt-4 rounded-xl border border-[#2A2A2A] bg-[#111111] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7E7E7E]">
              Agent Answer Preview
            </p>
            <p className="mt-3 text-sm leading-6 text-[#B7B7B7]">
              {showAnswer
                ? answer
                : "Ask a question to preview how this role-specific agent will help in Phase 2 and Phase 3."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function analyzeCsv(csvText: string, question: string) {
  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    return "CSV Insights Agent: add a header row and at least one data row so I can analyze it locally.";
  }

  const headers = rows[0];
  const dataRows = rows.slice(1).filter((row) => row.some(Boolean));
  const numericSummaries = headers
    .map((header, columnIndex) => {
      const values = dataRows
        .map((row) => Number(row[columnIndex]))
        .filter((value) => Number.isFinite(value));

      if (values.length === 0) {
        return null;
      }

      const total = values.reduce((sum, value) => sum + value, 0);
      const average = total / values.length;
      const max = Math.max(...values);
      const min = Math.min(...values);

      return `${header}: total ${formatNumber(total)}, average ${formatNumber(average)}, high ${formatNumber(max)}, low ${formatNumber(min)}`;
    })
    .filter(Boolean);

  const questionHint = question.trim()
    ? ` You asked: "${question.trim()}".`
    : " Ask a specific question for a sharper recommendation.";

  return [
    `CSV Insights Agent analyzed ${dataRows.length} row(s) and ${headers.length} column(s).`,
    `Columns: ${headers.join(", ")}.`,
    numericSummaries.length
      ? `Numeric insights: ${numericSummaries.join("; ")}.`
      : "No numeric columns were detected, so focus on categories, notes, and text patterns.",
    `Recommended next step: turn the strongest trend or risk into a report, then assign it to the correct role.${questionHint}`,
  ].join(" ");
}

function parseCsv(csvText: string) {
  return csvText
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.trim()))
    .filter((row) => row.length > 0);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}
