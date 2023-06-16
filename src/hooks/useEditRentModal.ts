import { SafeListing } from '@/types';
import { create } from 'zustand';

interface EditRentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  listing: SafeListing | null;
  setListing: (listing: SafeListing | null) => void;
}

const useEditRentModal = create<EditRentModalStore>((set) => ({
  isOpen: false,
  listing: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setListing: (listing: SafeListing | null) => set(() => ({ listing })),
}));


export default useEditRentModal;
