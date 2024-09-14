import { useRef } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import tinycolor from 'tinycolor2';
import { AppStorage } from '@/utils/storage';
import useAuthAxios from '../useAuthAxios';

interface UseNicknameQueryReturn {
  nickname?: {
    value: string;
    colorSet?: {
      color: string;
      bgColor: string;
    };
  };
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

interface ProfileResponse {
  result: {
    profileUrl: string;
    color: string;
    nickname: string;
  };
}

export default function useNicknameQuery() {
  const authAxios = useAuthAxios();
  const ref = useRef({} as UseNicknameQueryReturn);

  const getProfile = async () => {
    const result = await authAxios.get<ProfileResponse>('/api/user/profile');
    return result.data.result;
  };

  const { data, refetch, isLoading, isError } = useSuspenseQuery({
    queryKey: ['nickname'],
    queryFn: async () => {
      const profile = await getProfile();
      AppStorage.saveData({
        key: 'nickname',
        value: {
          value: profile.nickname,
          colorSet: {
            bgColor: profile.color,
            color: tinycolor(profile.color).darken(25).toHexString(),
          },
        },
      });

      const savedNickname = await AppStorage.getData('nickname');

      if (!savedNickname) {
        throw new Error('닉네임을 불러올 수 없습니다. 다시 한번 시도해보세요');
      }

      return savedNickname;
    },
  });

  ref.current.nickname = data;
  ref.current.isError = isError;
  ref.current.isLoading = isLoading;
  ref.current.refetch = refetch;

  return ref.current;
}
