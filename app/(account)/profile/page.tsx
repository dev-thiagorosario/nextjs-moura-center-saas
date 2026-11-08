//pagina perfil do usuairo
import { redirect } from "next/navigation";
import { getUserData } from "./_data-access/get-info-user";

export default async function Profile() {

  if (!session) {
    redirect("/login");
  }

  const user = await getUserData({ userId: session.user?.id });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Perfil do Usuário</h1>
      <p className="mt-4 text-lg">Bem-vindo à sua página de perfil!</p>
    </div>
  );
}
