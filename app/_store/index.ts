import { create } from 'zustand';

interface DataPoint {
  id: any;
  value: number;
  date: Date;
  answerTitle: string;
  answerBorder: string;
}

interface AnswersState {
  answers: {
    title: string;
    text: string;
    borderColor: string;
    calculation: string;
    outside: string;
  };
  datapoints: DataPoint[];
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setBorderColor: (color: string) => void;
  setCalculation: (calculation: string) => void;
  setOutside: (outside: string) => void;
  setDatapoints: (datapoints: DataPoint[]) => void;
  isOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
  warning: React.ReactNode;
  setWarning: (warning:  React.ReactNode) => void;
  isWarningOpen: boolean;
  setOpenWarning: (isWarningOpen: boolean) => void;
}

const useStore = create<AnswersState>((set) => ({
  answers: {
    title: 'defaultAnswers.title',
    text: 'defaultAnswers.text',
    borderColor: 'border-4 border-slate-500',
    calculation: 'defaultAnswers.calculation',
    outside: '',
  },
  datapoints: [],
  setTitle: (title) => set((state) => ({ answers: { ...state.answers, title } })),
  setText: (text) => set((state) => ({ answers: { ...state.answers, text } })),
  setBorderColor: (color) => set((state) => ({ answers: { ...state.answers, borderColor: color } })),
  setCalculation: (calculation) => set((state) => ({ answers: { ...state.answers, calculation } })),
  setOutside: (outside) => set((state) => ({ answers: { ...state.answers, outside } })),
  setDatapoints: (datapoints) => set(() => ({ datapoints })),
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  warning: null as React.ReactNode | null,
  isWarningOpen: false,
  setOpenWarning: (value: boolean) =>
    set(() => ({ isWarningOpen: value })),
  setWarning: (value: React.ReactNode) =>
    set(() => ({ warning: value })),
}));


export default useStore;
