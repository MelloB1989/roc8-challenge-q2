"use server";
import axios from "axios";
import { config } from "@/config";
import { Filters, Data } from "@/types";
import { auth } from "@/auth";

export async function registerUser(
  email: string,
  password: string,
  name: string,
) {
  try {
    const response = await axios.post(
      `${config.api}/${config.api_v}/auth/register`,
      {
        email,
        password,
        name,
      },
    );
    return response.data;
  } catch (e) {
    return { type: "error", error: "Email already taken" };
  }
}

export async function getFilteredData(filters: Filters) {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    console.log("filters", filters);
    const response = await axios.post(
      `${config.api}/${config.api_v}/data/filters`,
      filters,
      {
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      },
    );
    console.log(
      "response",
      response.data.records[0],
      response.data.records.length,
    );
    return response.data.records as Data[];
  } catch (e) {
    console.error("API Error:", e);
    return null;
  }
}
