import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Answers, DataPoint } from './types';
import { nanoid } from 'nanoid'; 


interface DatapointsState {
  datapoints: DataPoint[];
  setDatapoints: (datapoints: DataPoint[]) => void;
  addDatapointFromAnswers: (answers: Answers, value: number, date: Date | string) => void;
}

const useDatapointsStore = create<DatapointsState>()(
  devtools(
    (set) => ({
      datapoints: [],
      setDatapoints: (datapoints) => set(() => ({ datapoints })),
      addDatapointFromAnswers: (answers, value, date) =>
        set((state) => ({
          datapoints: [
            ...state.datapoints,
            {
              id: nanoid(),
              value,
              date,
              answerTitle: answers.title,
              answerBorder: answers.borderColor,
              answer: { ...answers }, // full snapshot
            },
          ],
        })),
    }),
    {
      name: "datapoints"
    }
  )
);


export default useDatapointsStore;
