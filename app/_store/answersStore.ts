import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AnswersState } from './types';

const useAnswersStore = create<AnswersState>()(
  devtools(
    (set) => ({
      answers: {
        title: 'defaultAnswers.title',
        text: 'defaultAnswers.text',
        borderColor: 'border-4 border-slate-500',
        calculation: 'defaultAnswers.calculation',
        outside: '',
        baseDate: null,
        lastDate: null,
        specimenBase: 0,
        specimenLast: 0,
        status: null,
        lastNewUseIndex: null,
        testsSinceNewUse: 0,
      },
      setTitle: (title) => set((state) => ({ answers: { ...state.answers, title } })),
      setText: (text) => set((state) => ({ answers: { ...state.answers, text } })),
      setBorderColor: (color) =>
        set((state) => ({ answers: { ...state.answers, borderColor: color } })),
      setCalculation: (calculation) =>
        set((state) => ({ answers: { ...state.answers, calculation } })),
      setOutside: (outside) => set((state) => ({ answers: { ...state.answers, outside } })),
      setBaseDate: (baseDate) =>
        set((state) => ({ answers: { ...state.answers, baseDate } })),
      setLastDate: (lastDate) =>
        set((state) => ({ answers: { ...state.answers, lastDate } })),
      setSpecimenBase: (specimenBase) =>
        set((state) => ({ answers: { ...state.answers, specimenBase } })),
      setSpecimenLast: (specimenLast) =>
        set((state) => ({ answers: { ...state.answers, specimenLast } })),
      setStatus: (status) =>
        set((state) => ({ answers: { ...state.answers, status } })),
      setLastNewUseIndex: (lastNewUseIndex) =>
        set((state) => ({ answers: { ...state.answers, lastNewUseIndex } })),
      setTestsSinceNewUse: (testsSinceNewUse) =>
        set((state) => ({ answers: { ...state.answers, testsSinceNewUse } })),
      resetAfterNewUse: (currentIndex) =>
        set((state) => ({ 
          answers: { 
            ...state.answers, 
            lastNewUseIndex: currentIndex,
            testsSinceNewUse: 0,
            specimenBase: currentIndex 
          } 
        })),
    }),
    { 
      name: 'AnswersStore',

     }
  )
);

export default useAnswersStore;
