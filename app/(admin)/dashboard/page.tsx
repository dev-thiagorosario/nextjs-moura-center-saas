import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dasboard() {

  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <h1>
      pagina dashboard administrativo
    </h1>
  );
}
