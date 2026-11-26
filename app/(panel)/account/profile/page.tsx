import type { Metadata } from "next";
import "./profile.css";
import Profile from "./_components/profile";
import { getUserData } from "./_data-access/get-info-user";

export const metadata: Metadata = { title: "Meu perfil | Moura Center" };

export default async function ProfilePage() {
  const user = await getUserData();

  return <Profile user={user} />;
}
