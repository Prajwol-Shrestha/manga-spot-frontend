import useAuthStore from "@/stores/authStore";

export const useIsLoggedIn = () => {
  const user = useAuthStore((state) => state.user);
  return !!user;
};
