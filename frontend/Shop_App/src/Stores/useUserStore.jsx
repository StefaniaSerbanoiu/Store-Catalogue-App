import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      username: "username",
      setUsername: (newUsername) => set({ username: newUsername }),
    }),
    { name: 'user-storage' }
  )
);

export default useUserStore;