import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTokenStore = create(
  persist(
    (set) => ({
      token: "token",
      setToken: (newToken) => set({ token: newToken }),
    }),
    { name: 'token-storage' }
  )
);

export default useTokenStore;
