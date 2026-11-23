import { Suspense, type ReactNode } from "react";
import { requireAdmin } from "@/lib/data-access/current-user";
import { SidebarDashboard } from "./_components/sidebar";

async function AdminContent({ children }: { children: ReactNode }) {
  await requireAdmin();
  return <SidebarDashboard>{children}</SidebarDashboard>;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <AdminContent>{children}</AdminContent>
    </Suspense>
  );
}
