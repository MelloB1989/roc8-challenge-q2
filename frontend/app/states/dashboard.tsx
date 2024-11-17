import { create } from "zustand";
import { Data, Filters } from "@/types";
import { getFilteredData } from "../actions/actions";

interface DashState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  data: Data[];
  filters: Filters;
  setData: (data: Data[]) => void;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
  getDashboardData: (jwt: string) => void;
}

export const useDashStore = create<DashState>((set, get) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: "",
  setError: (error) => set({ error }),
  data: [],
  filters: {
    age: -1,
    gender: -1,
    date_start: "",
    date_end: "",
  },
  setData: (data) => set({ data }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () =>
    set({
      filters: {
        age: -1,
        gender: -1,
        date_start: "",
        date_end: "",
      },
    }),
  getDashboardData: async (jwt: string) => {
    const { filters } = get();
    const res = await getFilteredData(filters, jwt);
    if (res) {
      set({ data: res });
      set({ loading: false });
      return;
    }
    set({ data: [] });
    set({ error: "No data found" });
    set({ loading: false });
  },
}));
