# Business Lab

Business Lab is a hackathon MVP for an AI-powered internal business operating
system.

## Phase 1: Frontend Foundation

Built so far:

- Landing page
- Demo business login page
- Role selector
- About page
- Join waitlist page
- Route-based dashboards for CEO, VP, Manager, and Team Member
- Black/orange Business Lab visual theme
- Report builder modal/wizard placeholder
- Five agent cards/placeholders
- Task To Do and Output Report placeholders

This phase uses local React state only. There is no database, real
authentication, backend API, or OpenAI integration yet.

## Phase 2: Local Reports and Tasks

Built so far:

- Local browser-session state for reports, tasks, and output reports
- LocalStorage persistence so demo data survives refreshes
- Create Report wizard now creates a real local report
- Approved/assigned reports create local task assignments
- Reports can be edited and deleted
- Tasks can move between To Do, In Progress, and Done
- Activate Agent creates a local placeholder follow-up task
- Output Report updates after Activate Agent
- Dashboard demo flow panel and last-action feedback
- CSV Insights Agent for every role with local CSV upload/paste analysis
- Guided /demo page with one-click CEO -> VP -> Manager -> Team Member flow

Phase 2 still does not use a database, Supabase, real authentication, backend
API, or OpenAI. It proves the product workflow locally first.

## Phase 3: Backend Agent Foundation

Started:

- Added `/api/agent/report`
- Added `/api/agent/chat`
- `Activate Agent` now calls the fake backend API route
- Role agents now call the fake backend chat API
- API returns a generated task and output report
- Frontend saves the API-generated task/output into local state
- Local fallback remains if the fake API call fails
- Demo OTP authentication stores verified user/business details in localStorage
- Role selector and dashboards require demo OTP sign-in

OpenAI is still not connected yet. This step creates the frontend-to-backend
shape first.

## Routes

```text
/                         Redirects to public About page
/login                    Demo business login
/roles                    Role selector
/about                    About Business Lab
/waitlist                 Join waitlist
/demo                     Guided demo mode
/api/agent/chat           Fake role-agent chat route
/api/agent/report         Fake backend agent route
/api/waitlist             Waitlist submissions API
/dashboard/ceo            CEO dashboard
/dashboard/vp             VP dashboard
/dashboard/manager        Manager dashboard
/dashboard/team-member    Team Member dashboard
```

## Run Locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Project Structure

```text
src/app/page.tsx                    Landing page
src/app/login/page.tsx              Demo login page
src/app/roles/page.tsx              Role selector page
src/app/about/page.tsx              About page
src/app/waitlist/page.tsx           Join waitlist page
src/app/demo/page.tsx               Guided demo mode page
src/app/api/waitlist/route.ts       Waitlist API
src/app/api/agent/chat/route.ts     Fake role-agent chat API
src/app/api/agent/report/route.ts   Fake backend agent API
src/app/dashboard/[role]/page.tsx   Dynamic dashboard route
middleware.ts                       Public/internal route protection
src/components/brand-header.tsx     Shared header
src/components/dashboard-shell.tsx  Shared dashboard UI
src/components/demo-runner.tsx      One-click demo flow UI
src/components/auth-provider.tsx    Demo OTP auth state
src/components/login-client.tsx     OTP login flow UI
src/components/auth-gate.tsx        Sign-in required gate
src/components/auth-status.tsx      Header auth status
src/components/report-wizard.tsx    Create Report modal/wizard
src/lib/agent-types.ts              Shared fake agent response types
src/lib/business-lab-data.ts        Static demo data
src/app/layout.tsx                  App metadata and root layout
src/app/globals.css                 Tailwind import and global styles
```

## Next Phases

Phase 2 will add local report creation, editing, deleting, and generated task
assignment logic.

Phase 3 will add backend API routes and AI agent activation.

## Public Launch Notes

Public visitors should only use:

```text
/
/about
/waitlist
```

Internal routes such as `/login`, `/roles`, `/demo`, and `/dashboard/*` are
protected by middleware. For local demo testing, set:

```text
ENABLE_DEMO_LOGIN=true
```

Do not enable demo login for a public Vercel launch unless you intentionally
want public demo access.

## View Waitlist Submissions

Set `WAITLIST_ADMIN_TOKEN` in `.env.local` or Vercel environment variables.

Waitlist submissions include:

```text
id, name, email, country_code, phone, role, company, major_problem, status, created_at,
invite_token, invited_at
```

Then call:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/api/waitlist" `
  -Headers @{ "x-admin-token" = "your-token" }
```

Local development stores submissions in `.data/waitlist.json`. For production,
connect this API route to Supabase or another durable database.

## Vercel Deployment

1. Push the project to GitHub.
2. Import it into Vercel.
3. Add environment variables from `.env.example`.
4. Leave `ENABLE_DEMO_LOGIN` unset or set to `false` for public launch.
5. Run the default Vercel build command:

```text
npm run build
```
