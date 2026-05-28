import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import crypto from "node:crypto";

type WaitlistSubmission = {
  id: string;
  name: string;
  email: string;
  country_code: string;
  phone: string;
  role: string;
  company: string;
  major_problem: string;
  status: "pending";
  created_at: string;
  invite_token: null;
  invited_at: null;
};

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "waitlist.json");

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<WaitlistSubmission>;
  const name = clean(body.name);
  const email = clean(body.email);
  const countryCode = clean(body.country_code);
  const phone = clean(body.phone);
  const role = clean(body.role);
  const company = clean(body.company);
  const majorProblem = clean(body.major_problem);

  if (!name || !email || !countryCode || !phone || !role || !company || !majorProblem) {
    return NextResponse.json(
      {
        message:
          "Name, email, country code, phone number, role, company, and major problem are required.",
      },
      { status: 400 },
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const submission: WaitlistSubmission = {
    id: crypto.randomUUID(),
    name,
    email,
    country_code: countryCode,
    phone,
    role,
    company,
    major_problem: majorProblem,
    status: "pending",
    created_at: new Date().toISOString(),
    invite_token: null,
    invited_at: null,
  };

  const submissions = await readSubmissions();
  submissions.unshift(submission);
  await writeSubmissions(submissions);
  await saveToSupabase(submission);

  return NextResponse.json({
    message: "Waitlist request received.",
    submission,
  });
}

export async function GET(request: Request) {
  const adminToken = process.env.WAITLIST_ADMIN_TOKEN;
  const providedToken = request.headers.get("x-admin-token");

  if (!adminToken || providedToken !== adminToken) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ submissions: await readSubmissions() });
}

function clean(value: unknown) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 1000);
}

async function readSubmissions() {
  try {
    const file = await readFile(dataFile, "utf8");
    return JSON.parse(file) as WaitlistSubmission[];
  } catch {
    return [];
  }
}

async function writeSubmissions(submissions: WaitlistSubmission[]) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(submissions, null, 2));
}

async function saveToSupabase(submission: WaitlistSubmission) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/waitlist_submissions`,
    {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(submission),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Supabase waitlist insert failed:", error);
  }
}
