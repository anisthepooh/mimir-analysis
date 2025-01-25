import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DataPoint } from './types';

interface DatapointsState {
  datapoints: DataPoint[];
  setDatapoints: (datapoints: DataPoint[]) => void;
}

const useDatapointsStore = create<DatapointsState>()(
  devtools(
    (set) => ({
      datapoints: [],
      setDatapoints: (datapoints) => set(() => ({ datapoints })),
    }),
    {
      name: "datapoints"
    }
  )
);

export default useDatapointsStore;
