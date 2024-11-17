import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ViewsPage from "./views";

export default async function Views() {
  const session = await auth();
  if (!session?.user.jwt) {
    redirect(`/auth/login`);
  }

  return <ViewsPage />;
}
