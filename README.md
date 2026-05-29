# Business Lab

**Business Lab turns reports into execution.**

Business Lab is an AI-powered internal business operating system built for the Fitness Lab AI community during the OpenAI x Outskill AI Builders Hackathon. It helps teams convert updates, reports, and ideas into assigned tasks, clear ownership, and measurable progress.

```text
Reports -> AI Agents -> Tasks -> Assigned Roles -> Output Reports
```

## Product Snapshot

```text
Public Website
  -> About + Waitlist
  -> Invite-only access
  -> Login + Role Selector
  -> CEO / VP / Manager / Team Member Dashboards
  -> Reports -> Agents -> Tasks -> Output Reports
```

## Why This Exists

Most teams do not fail because they lack ideas. They fail because reports, responsibilities, and execution are disconnected.

Business Lab creates a simple operating rhythm:

```text
Win the day -> repeat for 30 days -> win the month
Win the month -> repeat for 12 months -> win the year
```

## MVP Features

| Area | Built |
| --- | --- |
| Public site | Premium About page and invite-only Waitlist |
| Access | Protected internal routes and demo OTP login |
| Roles | CEO, VP, Manager, Team Member dashboards |
| Reports | Create Report wizard, edit/delete, local persistence |
| Tasks | Assigned Tasks, Tasks I Created, status updates |
| Agents | Strategy Agent, Execution Agent, Insights Agent, Report Builder, CSV Insights |
| Backend | OpenAI-ready agent API routes with safe demo fallback |
| Demo | One-click guided demo flow at `/demo` |
| Storage | Supabase waitlist insert plus local fallback |

## Agent Layer

The MVP includes a simple agent orchestrator:

```text
CEO -> Strategy Agent
VP / Manager -> Execution Agent
Team Member -> Insights Agent
CSV upload -> CSV Insights Agent
```

Agent activation flow:

```text
Dashboard -> Activate Agent -> /api/agent/report
  -> Agent Orchestrator
  -> Role Agent
  -> Generated task + output report
```

Agent Q&A flow:

```text
Dashboard -> Ask Agent -> /api/agent/chat
  -> OpenAI if OPENAI_API_KEY exists
  -> Demo fallback if no key exists
```

## Product Journey

```text
Visitor
  -> About Page
  -> Join Waitlist
  -> Founder Reviews Request
  -> Selected User Gets Invite
  -> User Logs In
  -> Chooses Role
  -> Creates Report
  -> Activates Agent
  -> Tasks Are Assigned
  -> Output Report Is Generated
```

## Routes

### Public Routes

```text
/           Redirects to /about
/about      Public product story
/waitlist   Invite-only waitlist
```

### Protected Internal Routes

```text
/login
/roles
/demo
/dashboard/ceo
/dashboard/vp
/dashboard/manager
/dashboard/team-member
```

### API Routes

```text
/api/waitlist       Waitlist submission API
/api/agent/report   Agent orchestration API
/api/agent/chat     Agent question-answer API
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Waitlist DB | Supabase |
| AI-ready layer | OpenAI Responses API |
| Local MVP state | React state + localStorage |
| Auth MVP | Demo OTP + protected routes |

## Run Locally

```powershell
cd C:\Users\chalu\OneDrive\Desktop\codex-work\business-lab-project
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

Create `.env.local` for local development:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
WAITLIST_ADMIN_TOKEN=your-secure-token
ENABLE_DEMO_LOGIN=true
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4.1-mini
```

For public Vercel launch, only enable demo login if reviewers need internal demo access.

## Security Notes

- Never commit `.env.local`, API keys, service role keys, or screenshots of secrets.
- `OPENAI_API_KEY` is server-only. It must never use the `NEXT_PUBLIC_` prefix.
- Agent API routes require same-origin requests and the `business_lab_access=granted` demo access cookie.
- Agent API routes include request size limits, text sanitization, and basic rate limiting.
- Supabase public access is limited to waitlist inserts only. Do not add public select/update/delete policies.
- Rotate the OpenAI key immediately if it is ever shared publicly.

## View Waitlist Submissions

In Supabase:

```text
Table Editor -> waitlist_submissions
```

Or with SQL:

```sql
select *
from public.waitlist_submissions
order by created_at desc;
```

Submission fields:

```text
id, name, email, country_code, phone, role, company,
major_problem, status, created_at, invite_token, invited_at
```

## Vercel Deployment

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Add environment variables from `.env.example`.
4. Keep public routes open and internal routes protected.
5. Deploy with Vercel.

## Founder

**Sai Kishore Chalumuri**  
Founder | Fitness Lab AI  
AI Product Builder

Founder message:

> I am building Business Lab to help teams stop losing execution inside scattered reports, meetings, and follow-ups. The goal is simple: turn business information into action, ownership, and measurable progress.

## Hackathon Submission Notes

Business Lab was built as a fast MVP for the OpenAI x Outskill AI Builders Hackathon.

Submission assets:

- Public Vercel app
- GitHub repository
- 4-slide pitch deck
- One-page pitch brief
- Working waitlist
- Protected internal MVP demo
- Agent orchestration foundation

## Tiny Award

```text
BUSINESS LAB MVP AWARD
Presented to: Sai Kishore Chalumuri
For shipping a founder-led AI execution OS under deadline pressure.
Status: Built. Shipped. Ready for review.
```
