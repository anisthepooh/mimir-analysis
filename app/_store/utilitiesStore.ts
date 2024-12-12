import { create } from 'zustand';
import { Utilities } from './types';



const useUtilitiesStore = create<Utilities>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  warning: null,
  isWarningOpen: false,
  setOpenWarning: (value) => set(() => ({ isWarningOpen: value })),
  setWarning: (value) => set(() => ({ warning: value })),
  shouldAnimate: true,
  setShouldAnimate: (value) => set(() => ({shouldAnimate: value}))
}));

export default useUtilitiesStore;
