import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: { id: string; username: string } | null; // TODO: fill all details later
  setUser: (user: AuthStore['user']) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user: any) => set({ user }),

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);


export default useAuthStore;
