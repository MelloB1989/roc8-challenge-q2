import { create } from "zustand";
import { getUserViews } from "../actions/actions";

export interface View {
  vid: string;
  filters: {
    age: number;
    date_start: string;
    date_end: string;
    gender: number;
  };
  created_by: string;
  created_at: string;
}

interface ViewState {
  views: View[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  getViews: () => void;
  error: string;
}

export const useViewsStore = create<ViewState>((set, get) => ({
  views: [],
  loading: false,
  error: "",
  setLoading: (loading) => set({ loading }),
  getViews: async () => {
    set({ loading: true });
    try {
      const res = await getUserViews();
      console.log(res);
      if (res) {
        set({ views: res });
        set({ loading: false });
        return;
      }
      set({ error: "Error getting views" });
    } catch (e) {
      console.log(e);
      set({ loading: false });
    }
  },
}));
