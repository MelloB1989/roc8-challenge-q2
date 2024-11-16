import { NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/config";

export async function POST(req: Request) {
  const json = await req.json();
  const { email, password } = json;

  try {
    const data = await axios.post(
      `${config.api}/${config.api_v}/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (data.data.error)
      return NextResponse.json({ success: false, error: data.data.error });
    else {
      return NextResponse.json({
        message: "Login success",
        data: {
          token: data.data.token,
          message: "Login success",
        },
        type: "",
      });
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      success: false,
      error: e,
      full_error: e.toString(),
    });
  }
}
