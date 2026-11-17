import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Orders() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Pedidos</h1>
      <p className="mt-4 text-lg">Esta é a página de pedidos do usuário.</p>
    </div>
  );
}
