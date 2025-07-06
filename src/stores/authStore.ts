import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: { id: string; username: string } | null; // TODO: fill all details later
  accessToken: string | null;
  setUser: (user: AuthStore['user']) => void;
  setAccessToken: (value: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      setUser: (user: any) => set({ user }),
      setAccessToken: (value) => set({ accessToken: value }),

      logout: () => {
        set({ user: null, accessToken: null });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

export const isLoggedIn = () => useAuthStore.getState().user && useAuthStore.getState().accessToken
export const getAccessToken = () => useAuthStore.getState().accessToken

export default useAuthStore;
