import type { RoleSlug } from "@/lib/business-lab-data";

export function roleNameToSlug(roleName: string): RoleSlug {
  if (roleName === "CEO") {
    return "ceo";
  }

  if (roleName === "VP") {
    return "vp";
  }

  if (roleName === "Manager") {
    return "manager";
  }

  return "team-member";
}

export function roleSlugToName(roleSlug: RoleSlug) {
  if (roleSlug === "ceo") {
    return "CEO";
  }

  if (roleSlug === "vp") {
    return "VP";
  }

  if (roleSlug === "manager") {
    return "Manager";
  }

  return "Team Member";
}
