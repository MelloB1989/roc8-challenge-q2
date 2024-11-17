import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashboardPage from "./dash";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user.jwt) {
    redirect(`/login`);
  }

  return <DashboardPage jwt={session.user.jwt} />;
}
