import { create } from "zustand";
import axios from "axios";
import { login } from "@/lib/functions";

export interface AuthState {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  login: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: "",
  setError: (error) => set({ error }),
  login: async () => {
    const { email, password } = get();
    set({ loading: true });
    const result = await login(email, password);
    set({ loading: false });
    if (result.type === "error") {
      set({ error: result.message });
    } else {
      set({ error: "" });
    }
    try {
    } catch (e) {
      set({ error: "Wrong Password!" });
    }
  },
}));
