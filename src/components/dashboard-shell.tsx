import type { RoleData } from "@/lib/business-lab-data";
import { AuthGate } from "@/components/auth-gate";
import { DashboardClient } from "@/components/dashboard-client";

type DashboardShellProps = {
  role: RoleData;
};

export function DashboardShell({ role }: DashboardShellProps) {
  return (
    <AuthGate>
      <DashboardClient role={role} />
    </AuthGate>
  );
}
