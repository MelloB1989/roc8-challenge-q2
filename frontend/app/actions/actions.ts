"use server";
import axios from "axios";
import { config } from "@/config";
import { Filters, Data } from "@/types";

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

export async function getFilteredData(filters: Filters, jwt: string) {
  try {
    const response = await axios.post(
      `${config.api}/${config.api_v}/data/filters`,
      { filters },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data.records as Data[];
  } catch (e) {
    console.error("API Error:", e);
    return null;
  }
}
