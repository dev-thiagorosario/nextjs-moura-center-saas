import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Profile from "./_components/profile";
import { getUserData } from "./_data-access/get-info-user";

export const metadata: Metadata = { title: "Meu perfil | Moura Center" };

export default async function ProfilePage() {
  const user = await getUserData();
  if (!user) redirect("/");

  return <Profile user={user} />;
}
