import { redirect } from "next/navigation";
import { getAccountDestination, getCurrentUser } from "@/lib/data-access/current-user";

export async function GET() {
  redirect(getAccountDestination(await getCurrentUser()));
}
