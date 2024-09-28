import { useRef } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import tinycolor from 'tinycolor2';
import { AppStorage } from '@/utils/storage';
import useAuthAxios from '../../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { ServerResponse } from '@/types/response';

interface UseProfileQueryReturn {
  profile: {
    nickname: string;
    image?: string;
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
  profileUrl: string;
  color: string;
  nickname: string;
}

export interface NicknameResponse {
  nickname: string;
}

export default function useProfileQuery() {
  const authAxios = useAuthAxios();
  const ref = useRef({} as UseProfileQueryReturn);

  const getProfile = async () => {
    const profileResut =
      await authAxios.get<ServerResponse<ProfileResponse>>('/api/user/profile');
    const nicknameResult =
      await authAxios.get<ServerResponse<NicknameResponse>>(
        '/api/user/nickname',
      );

    const profile = profileResut.data.result;
    const { nickname } = nicknameResult.data.result;

    await AppStorage.saveData({
      key: 'profileImage',
      value: profile.profileUrl,
    });

    await AppStorage.saveData({
      key: 'nickname',
      value: {
        value: nickname,
        colorSet: {
          bgColor: profile.color,
          color: tinycolor(profile.color).darken(25).toHexString(),
        },
      },
    });
    const savedNickname = await AppStorage.getData('nickname');
    const savedProfile = await AppStorage.getData('profileImage');

    if (!savedNickname) {
      throw new Error('닉네임을 불러올 수 없습니다. 다시 한번 시도해보세요');
    }

    return {
      nickname: savedNickname.value,
      image: savedProfile || undefined,
      colorSet: savedNickname.colorSet,
    };
  };

  const { data, refetch, isLoading, isError } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: getProfile,
  });

  ref.current.profile = data;
  ref.current.isError = isError;
  ref.current.isLoading = isLoading;
  ref.current.refetch = refetch;

  return ref.current;
}
