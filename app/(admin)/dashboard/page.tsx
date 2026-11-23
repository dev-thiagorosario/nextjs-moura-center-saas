import { requireAdmin } from "@/lib/data-access/current-user";

export default async function Page() {
  await requireAdmin();

  return (
    <h1>
      pagina dashboard administrativo
    </h1>
  );
}
