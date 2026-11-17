import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import Profile from "./_components/profile";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return <Profile />;
}
