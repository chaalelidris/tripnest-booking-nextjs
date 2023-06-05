import { create } from 'zustand';

interface BookModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBookModal = create<BookModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBookModal;
