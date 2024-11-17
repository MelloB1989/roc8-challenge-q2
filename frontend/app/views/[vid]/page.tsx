import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ViewPage from "./view";
import { getViewById } from "@/app/actions/actions";

export default async function View({ params }: { params: { vid: string } }) {
  const session = await auth();
  if (!session?.user.jwt) {
    redirect(`/auth/login`);
  }
  const view = await getViewById(params.vid);
  if (!view) {
    redirect(`/404`);
  }

  return <ViewPage view={view} />;
}
