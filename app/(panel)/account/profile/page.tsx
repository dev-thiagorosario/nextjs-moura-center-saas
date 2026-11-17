import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import ProfileForm from "./_components/profile-form";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return <ProfileForm />;
}
