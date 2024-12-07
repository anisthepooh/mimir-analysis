import { create } from 'zustand';
import { DataPoint } from './types';

interface DatapointsState {
  datapoints: DataPoint[];
  setDatapoints: (datapoints: DataPoint[]) => void;
}

const useDatapointsStore = create<DatapointsState>((set) => ({
  datapoints: [],
  setDatapoints: (datapoints) => set(() => ({ datapoints })),
}));

export default useDatapointsStore;
