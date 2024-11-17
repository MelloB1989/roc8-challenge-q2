"use server";
import axios from "axios";
import { config } from "@/config";
import { Filters, Data } from "@/types";
import { auth } from "@/auth";
import { Views } from "@/types";
import { View } from "../states/views";

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
    console.error("API Error:", e);
    return { type: "error", error: "Email already taken" };
  }
}

export async function getFilteredData(filters: Filters) {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const response = await axios.post(
      `${config.api}/${config.api_v}/data/filters`,
      filters,
      {
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      },
    );
    return response.data.records as Data[];
  } catch (e) {
    console.error("API Error:", e);
    return null;
  }
}

export async function createView(filters: Filters) {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const response = await axios.post(
      `${config.api}/${config.api_v}/views/create`,
      filters,
      {
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      },
    );
    return response.data.data;
  } catch (e) {
    console.error("API Error:", e);
    return null;
  }
}

export async function getUserViews() {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const response = await axios.get(`${config.api}/${config.api_v}/views`, {
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    });

    const d = response.data.data.map((view: Views) => ({
      ...view,
      filters: JSON.parse(JSON.parse(view.filters)),
    }));

    return d as View[];
  } catch (e) {
    console.error("API Error:", e);
    return null;
  }
}

export async function getViewById(vid: string) {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const response = await axios.get(
      `${config.api}/${config.api_v}/views/${vid}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      },
    );

    const d = {
      ...response.data.data,
      filters: JSON.parse(JSON.parse(response.data.data.filters)),
    };

    return d as View;
  } catch (e) {
    console.error("API Error:", e);
    return null;
  }
}
