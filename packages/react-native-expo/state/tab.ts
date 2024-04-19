import { create } from "zustand";

type Tab = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const useTab = create<Tab>()((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set((state) => ({ loading })),
}));

export default useTab;
