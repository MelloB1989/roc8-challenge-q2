import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginPage from "./login";

export default async function Login() {
  const session = await auth();
  if (session?.user.jwt) {
    redirect(`/dashboard`);
  }

  return <LoginPage />;
}
