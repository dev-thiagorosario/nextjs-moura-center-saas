import { Header } from "@/app/(public)/_components/header";
import { NavBar } from "@/app/(public)/_components/nav-bar";

import "./institutional-header.css";

export function InstitutionalHeader() {
  return (
    <div className="institutional-header">
      <Header editorial menuClassName="institutional-menu" />
      <NavBar />
    </div>
  );
}
