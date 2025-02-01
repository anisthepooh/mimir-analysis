import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModelStore, ModelType } from "./types";



const useModelStore = create<ModelStore>()(
  persist(
    (set) => ({
      model: "cronical", // Default value
      setModel: (value: string) => set(() => ({ model: value as ModelType })),
    }),
    {
      name: "model-storage", // Unique storage key
      // @ts-ignore
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useModelStore;
