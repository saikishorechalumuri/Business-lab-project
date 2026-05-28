# Business Lab Flow Chart

Business Lab is an AI-powered internal business operating system for the chain:

```text
CEO -> VP -> Manager -> Team Member
```

The MVP proves one core idea:

```text
Business reports go in -> tasks, action plans, and output reports come out
```

## Main Product Flow

```mermaid
flowchart TD
    A[Landing Page] --> B[Business Login]
    B --> C[Role Selector]
    C --> D1[CEO Dashboard]
    C --> D2[VP Dashboard]
    C --> D3[Manager Dashboard]
    C --> D4[Team Member Dashboard]

    D1 --> E[Create or Review Reports]
    D2 --> E
    D3 --> E
    D4 --> E

    E --> F[Activate Agent]
    F --> G[AI Reads Reports]
    G --> H[AI Creates Task To Do]
    H --> I[AI Assigns Task to Correct Role]
    I --> J[Output Report Generated]
    J --> K[Assigned Person Sees Task in Dashboard]
```

## Role Hierarchy

```mermaid
flowchart TD
    CEO[CEO] --> VP[VP]
    VP --> Manager[Manager]
    Manager --> TeamMember[Team Member]
```

## Route Flow

```mermaid
flowchart TD
    Home["/"] --> Login["/login"]
    Login --> Roles["/roles"]

    Roles --> CEODashboard["/dashboard/ceo"]
    Roles --> VPDashboard["/dashboard/vp"]
    Roles --> ManagerDashboard["/dashboard/manager"]
    Roles --> TeamDashboard["/dashboard/team-member"]
```

## Dashboard Layout Flow

Each role dashboard has the same structure so the app stays simple and easy to understand.

```mermaid
flowchart TD
    Dashboard[Role Dashboard] --> Sidebar[Sidebar]
    Dashboard --> Header[Header]
    Dashboard --> Profile[Role Profile Card]
    Dashboard --> Reports[My Reports Section]
    Dashboard --> TasksAssigned[Assigned Tasks Section]
    Dashboard --> TasksCreated[Tasks I Created Section]
    Dashboard --> Agent[Agent Output Preview]

    Reports --> CreateReport[Create Report Button]
    Reports --> ReportList[Report List Placeholder]

    Agent --> ActivateAgent[Activate Agent Button]
    Agent --> TaskTodo[Task To Do Placeholder]
    Agent --> OutputReport[Output Report Placeholder]
```

## Phase 1 Flow

Phase 1 is frontend only.

```mermaid
flowchart TD
    A[User opens landing page] --> B[Clicks Start Demo]
    B --> C[Demo Login Page]
    C --> D[Clicks Enter Business Lab]
    D --> E[Role Selector]
    E --> F[Chooses CEO, VP, Manager, or Team Member]
    F --> G[Static Dashboard Opens]
```

Phase 1 includes:

- Landing page
- Demo login page
- Role selector page
- CEO dashboard
- VP dashboard
- Manager dashboard
- Team Member dashboard
- Static reports
- Static assigned tasks
- Static created tasks
- Agent placeholders

Phase 1 does not include:

- Real authentication
- Database
- Supabase
- OpenAI
- Backend API
- Real report saving

## Phase 2 Flow

Phase 2 adds local report and task behavior using React state.

```mermaid
flowchart TD
    A[User opens role dashboard] --> B[Clicks Create Report]
    B --> C[Report Form Opens]
    C --> D[User enters title and content]
    D --> E[Report is saved in local state]
    E --> F[Report appears in My Reports]

    F --> G[User can Edit Report]
    F --> H[User can Delete Report]

    F --> I[User clicks Activate Agent]
    I --> J[Local demo logic reads reports]
    J --> K[Demo task is generated]
    K --> L[Task is assigned by hierarchy]
    L --> M[Task appears in correct dashboard section]
    M --> N[Output Report is shown]
```

Phase 2 should still avoid:

- Database
- Supabase
- OpenAI
- Real login

## Phase 3 Flow

Phase 3 adds backend API routes and real AI agent activation.

```mermaid
flowchart TD
    A[User creates reports] --> B[User clicks Activate Agent]
    B --> C[Frontend sends reports to API route]
    C --> D[Backend API receives reports]
    D --> E[OpenAI agent reads reports]
    E --> F[Agent creates tasks]
    F --> G[Agent assigns tasks to roles]
    G --> H[Agent writes output report]
    H --> I[API returns result to frontend]
    I --> J[Dashboard displays tasks and output report]
```

Phase 3 adds:

- API routes
- AI agent activation
- Report-to-task generation
- Output report generation

Phase 3 still can use temporary local/demo storage until the core flow works.

## Future Database Flow

This should come after the frontend and AI flow are clear.

```mermaid
flowchart TD
    A[User logs in] --> B[Auth confirms user]
    B --> C[Load user's business]
    C --> D[Load role dashboard]
    D --> E[Fetch reports from database]
    D --> F[Fetch tasks from database]
    E --> G[Activate Agent]
    F --> G
    G --> H[Save generated tasks]
    G --> I[Save output report]
```

Future database tables may include:

- businesses
- users
- roles
- reports
- tasks
- agent_runs
- output_reports

## Simple User Story

Example:

1. CEO logs in.
2. CEO opens the CEO dashboard.
3. CEO creates a report called "Quarterly Growth Direction".
4. CEO clicks "Activate Agent".
5. The agent reads the CEO report.
6. The agent creates a task: "Break growth direction into department goals".
7. The task is assigned to the VP.
8. VP sees the assigned task in the VP dashboard.
9. VP creates their own department report.
10. The chain continues down to Manager and Team Member.

## MVP Success Criteria

The MVP is successful when a judge or viewer can understand this flow:

```text
Reports -> Agent -> Tasks -> Assigned Roles -> Output Report
```

The app does not need to be perfect. It needs to clearly prove the product idea.
