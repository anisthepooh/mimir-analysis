import { create } from 'zustand';
import { Answers } from './types';

interface AnswersState {
  answers: Answers;
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setBorderColor: (color: string) => void;
  setCalculation: (calculation: string) => void;
  setOutside: (outside: string) => void;
}

const useAnswersStore = create<AnswersState>((set) => ({
  answers: {
    title: 'defaultAnswers.title',
    text: 'defaultAnswers.text',
    borderColor: 'border-4 border-slate-500',
    calculation: 'defaultAnswers.calculation',
    outside: '',
  },
  setTitle: (title) => set((state) => ({ answers: { ...state.answers, title } })),
  setText: (text) => set((state) => ({ answers: { ...state.answers, text } })),
  setBorderColor: (color) => set((state) => ({ answers: { ...state.answers, borderColor: color } })),
  setCalculation: (calculation) => set((state) => ({ answers: { ...state.answers, calculation } })),
  setOutside: (outside) => set((state) => ({ answers: { ...state.answers, outside } })),
}));

export default useAnswersStore;
