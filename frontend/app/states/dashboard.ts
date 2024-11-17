import { create } from "zustand";
import { Data, Filters } from "@/types";
import { createView, getFilteredData } from "../actions/actions";

interface LineData {
  [key: string]: { date: string; value: number }[];
}

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
  lineData: LineData;
  calculateLineData: () => void;
  lineFeature: string;
  setLineFeature: (feature: string) => void;
  shareView: () => Promise<string | null>;
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
  barData: [],
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
    set({ barData: featureTotals });
  },
  getDashboardData: async () => {
    const { filters, calculateBarData, calculateLineData } = get();
    const res = await getFilteredData(filters);
    if (res) {
      set({ data: res });
      set({ loading: false });
      // console.log(res.length);
      calculateBarData();
      calculateLineData();
      return;
    }
    set({ data: [] });
    set({ error: "No data found" });
    set({ loading: false });
  },
  lineData: {},
  calculateLineData: async () => {
    const features = [
      "feature_a",
      "feature_b",
      "feature_c",
      "feature_d",
      "feature_e",
      "feature_f",
    ];

    const { data } = get();

    // Initialize the result object to store the formatted data
    const result: LineData = {};

    // Helper function to format the date as DD-MMM (e.g., 03-Nov)
    const formatDate = (timestamp: string): string => {
      const date = new Date(timestamp);
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
      };
      return date.toLocaleDateString("en-GB", options);
    };

    // Iterate over each feature
    features.forEach((feature) => {
      // Initialize an array for the feature's data
      result[feature.charAt(feature.length - 1)] = [];

      // For each record, extract the relevant feature value and timestamp
      data.forEach((record) => {
        result[feature.charAt(feature.length - 1)].push({
          date: formatDate(record.timestamp),
          value: Number(record[feature as keyof Data]),
        });
      });
    });
    // console.log(result);
    set({ lineData: result });
  },
  lineFeature: "a",
  setLineFeature: (feature) => set({ lineFeature: feature }),
  shareView: async () => {
    const { filters } = get();
    const res = await createView(filters);
    if (res) {
      return `${window.location.origin}/view/${res.vid}` as string;
    }
    return null;
  },
}));
