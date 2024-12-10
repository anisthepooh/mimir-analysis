import { create } from 'zustand';
import { Answers, AnswersState } from './types';

const useAnswersStore = create<AnswersState>((set) => ({
  answers: {
    title: 'defaultAnswers.title',
    text: 'defaultAnswers.text',
    borderColor: 'border-4 border-slate-500',
    calculation: 'defaultAnswers.calculation',
    outside: '',
    specimenBaseDate: null,
    specimenLastDate: null
  },
  setTitle: (title) => set((state) => ({ answers: { ...state.answers, title } })),
  setText: (text) => set((state) => ({ answers: { ...state.answers, text } })),
  setBorderColor: (color) => set((state) => ({ answers: { ...state.answers, borderColor: color } })),
  setCalculation: (calculation) => set((state) => ({ answers: { ...state.answers, calculation } })),
  setOutside: (outside) => set((state) => ({ answers: { ...state.answers, outside } })),
  setSpecimenBaseDate: (specimenBaseDate) => set((state) => ({ answers: { ...state.answers, specimenBaseDate } })),
  setSpecimenLastDate: (specimenLastDate) => set((state) => ({ answers: { ...state.answers, specimenLastDate } })),
}));

export default useAnswersStore;
