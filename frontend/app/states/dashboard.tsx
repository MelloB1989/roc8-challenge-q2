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
  getDashboardData: () => void;
  barData: {
    feature: string;
    total: number;
    fill: string;
  }[];
  calculateBarData: () => void;
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
  calculateBarData: () => {
    const { data } = get();
    const featureTotals: {
      feature: string;
      total: number;
      fill: string;
    }[] = [
      { feature: "a", total: 0, fill: "var(--color-a)" },
      { feature: "b", total: 0, fill: "var(--color-b)" },
      { feature: "c", total: 0, fill: "var(--color-c)" },
      { feature: "d", total: 0, fill: "var(--color-d)" },
      { feature: "e", total: 0, fill: "var(--color-e)" },
      { feature: "f", total: 0, fill: "var(--color-f)" },
    ];

    // Loop over each data entry and add the values to the respective feature total
    for (const entry of data) {
      featureTotals[0].total += entry.feature_a;
      featureTotals[1].total += entry.feature_b;
      featureTotals[2].total += entry.feature_c;
      featureTotals[3].total += entry.feature_d;
      featureTotals[4].total += entry.feature_e;
      featureTotals[5].total += entry.feature_f;
    }
    console.log(featureTotals);
    set({ barData: featureTotals });
  },
  getDashboardData: async () => {
    const { filters, calculateBarData } = get();
    const res = await getFilteredData(filters);
    if (res) {
      set({ data: res });
      set({ loading: false });
      // console.log(res.length);
      calculateBarData();
      return;
    }
    set({ data: [] });
    set({ error: "No data found" });
    set({ loading: false });
  },
  barData: [],
}));
