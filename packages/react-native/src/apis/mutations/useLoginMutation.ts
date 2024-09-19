import { useRef } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env';
import { useToken } from '@/hooks/useToken';
import { ServerResponse } from '@/types/response';
import { AppStorage } from '@/utils/storage';
import { NicknameResponse } from '../queries/useProfileQuery';
import { StackNavigation } from '@/types/navigation';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface UseLoginMutationReturn {
  loginMutate: (kakaoToken: string) => Promise<LoginResponse>;
  isLoginPending: boolean;
}

const sendTokenToServer = async (kakaoToken: string) => {
  const result = await axios.post<ServerResponse<LoginResponse>>(
    `${BASE_URL}/api/login/kakao?accessToken=${kakaoToken}`,
  );
  return result.data.result;
};

export default function useLoginMutation() {
  const ref = useRef({} as UseLoginMutationReturn);
  const { setAccess, setRefresh } = useToken();
  const navigation = useNavigation<StackNavigation<'Login'>>();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (kakaoToken: string) => sendTokenToServer(kakaoToken),
    onSuccess: async (data) => {
      await AppStorage.saveData({
        key: 'token',
        value: {
          access: data.accessToken,
          refresh: data.refreshToken,
        },
      });
      setRefresh(data.refreshToken);
      setAccess(data.accessToken);

      const nicknameResult = await axios.get<NicknameResponse>(
        `${BASE_URL}/api/user/nickname`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        },
      );

      if (!nicknameResult.data.result.nickname) {
        return navigation.navigate('Signup');
      }

      return navigation.reset({ routes: [{ name: 'Main' }] });
    },
  });

  ref.current.loginMutate = mutateAsync;
  ref.current.isLoginPending = isPending;

  return ref.current;
}
