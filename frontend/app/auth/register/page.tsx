import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginPage from "./register";

export default async function Login() {
  const session = await auth();
  if (session?.user.jwt) {
    redirect(`/dashboard`);
  }

  return <LoginPage />;
}
