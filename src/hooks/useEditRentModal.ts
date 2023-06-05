import { create } from 'zustand';

interface EditRentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditRentModal = create<EditRentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditRentModal;
