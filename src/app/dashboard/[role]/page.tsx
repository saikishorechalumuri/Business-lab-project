import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { getRoleBySlug, roles } from "@/lib/business-lab-data";

type DashboardPageProps = {
  params: Promise<{
    role: string;
  }>;
};

export function generateStaticParams() {
  return roles.map((role) => ({
    role: role.slug,
  }));
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { role: roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);

  if (!role) {
    notFound();
  }

  return <DashboardShell role={role} />;
}
