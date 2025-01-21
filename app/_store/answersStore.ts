import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Answers, AnswersState } from './types';

const useAnswersStore = create<AnswersState>()(
  devtools(
    (set) => ({
      answers: {
        title: 'defaultAnswers.title',
        text: 'defaultAnswers.text',
        borderColor: 'border-4 border-slate-500',
        calculation: 'defaultAnswers.calculation',
        outside: '',
        specimenBaseDate: '',
        specimenLastDate: '',
        specimenBase: 0,
      },
      setTitle: (title) => set((state) => ({ answers: { ...state.answers, title } })),
      setText: (text) => set((state) => ({ answers: { ...state.answers, text } })),
      setBorderColor: (color) =>
        set((state) => ({ answers: { ...state.answers, borderColor: color } })),
      setCalculation: (calculation) =>
        set((state) => ({ answers: { ...state.answers, calculation } })),
      setOutside: (outside) => set((state) => ({ answers: { ...state.answers, outside } })),
      setSpecimenBaseDate: (specimenBaseDate) =>
        set((state) => ({ answers: { ...state.answers, specimenBaseDate } })),
      setSpecimenLastDate: (specimenLastDate) =>
        set((state) => ({ answers: { ...state.answers, specimenLastDate } })),
      setSpecimenBase: (specimenBase) =>
        set((state) => ({ answers: { ...state.answers, specimenBase } })),
    }),
    { 
      name: 'AnswersStore',

     }
  )
);

export default useAnswersStore;
