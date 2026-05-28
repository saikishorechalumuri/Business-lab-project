# Business Lab

**Business Lab turns reports into execution.**

Business Lab is an AI-powered internal business operating system built for the Fitness Lab AI community during the OpenAI x Outskill AI Builders Hackathon. It helps teams convert updates, reports, and ideas into assigned tasks, clear ownership, and measurable progress.

```text
Reports -> AI Agent -> Tasks -> Assigned Roles -> Output Report
```

## Product Snapshot

```text
┌──────────────────────┐
│ Public Website        │
│ About + Waitlist      │
└──────────┬───────────┘
           │ invite-only access
┌──────────▼───────────┐
│ Internal OS           │
│ Login + Role Selector │
└──────────┬───────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ CEO -> VP -> Manager -> Team Member               │
│ Reports -> Tasks -> Ownership -> Output Reports   │
└───────────────────────────────────────────────────┘
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
| Agents | Role agents, Report Builder Agent, CSV Insights Agent |
| Backend shape | Fake agent API routes for report and chat flows |
| Demo | One-click guided demo flow at `/demo` |
| Storage | Supabase waitlist insert plus local fallback |

## Phase Plan

### Phase 1: Build The MVP

Goal: prove the core product idea with a polished interface and clear flow.

Built:

- Premium black/orange Business Lab visual system
- Public About page
- Waitlist page
- Demo OTP login
- Role selector
- CEO, VP, Manager, and Team Member dashboards
- Report wizard
- Agent preview sections
- Protected internal product pages

### Phase 2: Launch And Ship

Goal: make the MVP usable enough to share, demo, and collect real interest.

Built:

- Supabase-ready waitlist collection
- Email, country code, and phone capture
- Public-only About/Waitlist experience
- Middleware route protection
- Local report/task workflows
- Guided `/demo` mode
- Fake backend agent APIs
- Vercel-ready build

### Phase 3: Make It Real

Next:

- Real invite approval flow
- Admin waitlist review dashboard
- Real OTP/email provider
- Real OpenAI agent responses
- Durable report/task database
- Production analytics and feedback loop

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
/api/agent/report   Fake report-agent API
/api/agent/chat     Fake role-agent chat API
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Waitlist DB | Supabase |
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
```

For public Vercel launch, do not enable demo login unless reviewers need internal demo access.

```text
ENABLE_DEMO_LOGIN=false
```

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
5. Deploy with:

```text
npm run build
```

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

## Tiny Award

```text
BUSINESS LAB MVP AWARD
Presented to: Sai Kishore Chalumuri
For shipping a founder-led AI execution OS under deadline pressure.
Status: Built. Shipped. Ready for review.
```

