import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface UseSignupParams {
  nickname: string;
  profile?: string;
  nicknameProfileColor?: string;
}

export default function useSignup({
  nickname,
  profile,
  nicknameProfileColor,
}: UseSignupParams) {
  return useMutation({
    // FIXME: 실제 연동 로직 필요
    mutationFn: () =>
      axios.post('SOME url...', {
        nickname,
        profile,
        nicknameProfileColor,
      }),
    onSuccess: () => {},
    onError: () => {},
  });
}
