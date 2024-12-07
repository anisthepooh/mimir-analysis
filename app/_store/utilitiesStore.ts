import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  toggleModal: () => void;
  warning: React.ReactNode | null;
  isWarningOpen: boolean;
  setOpenWarning: (isWarningOpen: boolean) => void;
  setWarning: (warning: React.ReactNode) => void;
}

const useUtilitiesStore = create<ModalState>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  warning: null,
  isWarningOpen: false,
  setOpenWarning: (value) => set(() => ({ isWarningOpen: value })),
  setWarning: (value) => set(() => ({ warning: value })),
}));

export default useUtilitiesStore;
