import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const host = req.headers.get("referer");
  if (host) {
    const absoluteUrl = new URL(
      "?message=Please+Check+password+again",
      host,
    ).toString();
    return NextResponse.redirect(absoluteUrl);
  }
  // handle the case where the host header is not set
}
