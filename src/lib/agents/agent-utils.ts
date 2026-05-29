import type { RoleSlug } from "@/lib/business-lab-data";

export function getNextRole(role: RoleSlug): RoleSlug {
  if (role === "ceo") {
    return "vp";
  }

  if (role === "vp") {
    return "manager";
  }

  if (role === "manager") {
    return "team-member";
  }

  return "manager";
}

export function getReportTitle(fallback: string, title?: string) {
  return title?.trim() || fallback;
}
