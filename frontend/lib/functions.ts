import { signIn } from "next-auth/react";

export const login = async (email: string, password: string) => {
  try {
    signIn("credentials", { email, password });
    return { message: "success", type: "success" };
  } catch {
    return { message: "Invalid Credentials", type: "error" };
  }
};
