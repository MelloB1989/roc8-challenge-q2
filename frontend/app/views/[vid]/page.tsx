import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ViewPage from "./view";
import { getViewById } from "@/app/actions/actions";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function View({ params }: any) {
  const { vid } = params;
  const session = await auth();
  if (!session?.user.jwt) {
    redirect(`/auth/login`);
  }
  const view = await getViewById(vid);
  if (!view) {
    redirect(`/404`);
  }

  return <ViewPage view={view} />;
}
