import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { DEV_ACCESS_TOKEN, DEV_REFRESH_TOKEN } from '@env';
import { AuthToken } from '@/types/storage';

interface AuthState extends AuthToken {
  setAccess: (value: string) => void;
  setRefresh: (value: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  access: DEV_ACCESS_TOKEN || '',
  refresh: DEV_REFRESH_TOKEN || '',
  setAccess: (value: string) => set((state) => ({ ...state, access: value })),
  setRefresh: (value: string) => set((state) => ({ ...state, refresh: value })),
}));

export default useAuthStore;

export const useToken = () => {
  return useAuthStore(useShallow((state) => ({ ...state })));
};
