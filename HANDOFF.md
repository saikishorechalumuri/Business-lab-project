# Business Lab Handoff

## Current Status

Business Lab has completed Phase 1 and most of Phase 2.

The project is a Next.js, TypeScript, App Router, Tailwind CSS app with a premium black/orange Business Lab theme.

## What Is Built

- Landing page
- About page
- Waitlist page
- Demo login page
- Role selector
- CEO dashboard
- VP dashboard
- Manager dashboard
- Team Member dashboard
- Guided demo mode at `/demo`
- Create Report wizard
- Local report creation
- Local task assignment
- Edit/delete reports
- Task status updates
- Activate Agent local placeholder flow
- Output Report local updates
- localStorage persistence
- Role-specific agents
- Report Builder Agent
- CSV Insights Agent for every role
- Fake backend agent API route at `/api/agent/report`
- Fake role-agent chat API route at `/api/agent/chat`
- Public About/Waitlist page upgraded for launch
- Waitlist API route at `/api/waitlist`
- Middleware protects internal routes
- Activate Agent calls the fake backend API
- Demo OTP login stores verified user/business details locally
- Role selector and dashboards require demo OTP sign-in
- One-page pitch brief
- Flowchart document

## Important Routes

```text
/                         Landing page
/about                    About page
/waitlist                 Join waitlist
/login                    Demo login, protected unless ENABLE_DEMO_LOGIN=true or access cookie exists
/roles                    Role selector
/demo                     Guided demo mode
/dashboard/ceo            CEO dashboard
/dashboard/vp             VP dashboard
/dashboard/manager        Manager dashboard
/dashboard/team-member    Team Member dashboard
```

## How To Run

```powershell
cd C:\Users\chalu\OneDrive\Desktop\codex-work\business-lab-project
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

## Best Demo Flow

1. Open `/demo`.
2. Click `Run Demo Flow`.
3. Open CEO dashboard.
4. Open VP dashboard and check assigned tasks.
5. Open Manager dashboard and check assigned tasks.
6. Open Team Member dashboard and check assigned tasks.
7. Test Create Report.
8. Test CSV Insights Agent.
9. Test Activate Agent.

## Docs Created

```text
README.md
FLOWCHART.md
PITCH_BRIEF.md
HANDOFF.md
```

## Known Notes

- No Supabase yet.
- No real database yet.
- No OpenAI API yet.
- No real authentication yet.
- Current authentication is demo OTP only. It does not send real email or SMS.
- Public Vercel launch should leave `ENABLE_DEMO_LOGIN` disabled.
- Waitlist data is local JSON in development and should move to Supabase for production durability.
- Data is stored in browser localStorage for demo purposes.
- If local demo data gets messy, use `Reset Local Demo Data`.

## Next Recommended Step

Continue Phase 3:

```text
backend fake agent -> real OpenAI integration
```

Suggested Phase 3 order:

1. Test `/api/agent/report` through the dashboards.
2. Test `/api/agent/chat` through each role agent.
3. Improve the fake API prompt/response shape if needed.
4. Add real OTP/email provider and OpenAI only after fake flows feel right.
