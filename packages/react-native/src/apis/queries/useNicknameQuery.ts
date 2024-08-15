import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppStorage } from '@/utils/storage';

interface UseNicknameQueryReturn {
  nickname: string;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export default function useNicknameQuery() {
  const ref = useRef({} as UseNicknameQueryReturn);

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['nickname'],
    queryFn: async () => {
      const savedNickname = await AppStorage.getData('nickname');
      if (savedNickname) {
        return savedNickname;
      }

      // TODO: 서버데이터 패칭 로직 추가 필요
      return '';
    },
  });

  ref.current.nickname = data;
  ref.current.isError = isError;
  ref.current.isLoading = isLoading;
  ref.current.refetch = refetch;

  return ref.current;
}
