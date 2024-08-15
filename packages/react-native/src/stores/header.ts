import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

interface HeaderState {
  headerShown: boolean;
  showHeader: () => void;
  hideHeader: () => void;
}

const useHeaderStore = create<HeaderState>((set) => ({
  headerShown: false,
  showHeader: () =>
    set((state) => ({
      ...state,
      headerShown: true,
    })),
  hideHeader: () =>
    set((state) => ({
      ...state,
      headerShown: false,
    })),
}));

export const useHeaderState = () =>
  useHeaderStore(useShallow((state) => ({ ...state })));
