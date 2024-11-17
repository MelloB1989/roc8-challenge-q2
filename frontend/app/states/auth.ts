import { create } from "zustand";
import { login } from "@/lib/functions";
import { registerUser } from "../actions/actions";

export interface AuthState {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  cPassword: string;
  setCPassword: (cPassword: string) => void;
  name: string;
  setName: (name: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  signup: boolean;
  error: string;
  setError: (error: string) => void;
  login: () => void;
  register: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  cPassword: "",
  setCPassword: (cPassword) => set({ cPassword }),
  name: "",
  setName: (name) => set({ name }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  signup: false,
  error: "",
  setError: (error) => set({ error }),
  login: async () => {
    const { email, password } = get();
    if (email === "" || password === "") {
      set({ error: "Please fill in all fields" });
      set({ loading: false });
      return;
    }
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
  register: async () => {
    const { email, password, name } = get();
    if (email === "" || password === "" || name === "") {
      set({ error: "Please fill in all fields" });
      set({ loading: false });
      return;
    }
    const result = await registerUser(email, password, name);
    set({ loading: false });
    if (result.type === "error") {
      set({ error: result.error });
      set({ signup: false });
    } else {
      set({ error: "" });
      set({ signup: true });
    }
    try {
    } catch (e) {
      set({ error: "Wrong Password!" });
    }
  },
}));
