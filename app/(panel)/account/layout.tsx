import { Suspense, type ReactNode } from "react";
import { Header } from "@/app/(public)/_components/header";
import { Footer } from "@/app/(public)/_components/footer";
import { Sidebar } from "./_components/sidebar";
import "@/components/storefront.css";
import { requireAccount } from "@/lib/data-access/current-user";

async function AccountContent({ children }: { children: ReactNode }) {
  await requireAccount();

  return (
    <div className="storefront flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-10 xl:px-16">
        <div className="grid gap-8 lg:min-h-[620px] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <Sidebar />
          <main id="account-content" className="min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <AccountContent>{children}</AccountContent>
    </Suspense>
  );
}
