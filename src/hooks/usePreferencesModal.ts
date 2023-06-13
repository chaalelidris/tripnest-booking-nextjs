import { create } from 'zustand';

interface PreferencesModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePreferencesModal = create<PreferencesModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreferencesModal;
