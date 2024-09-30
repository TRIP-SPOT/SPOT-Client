import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { ServerResponse } from '@/types/response';

interface LevelResponse {
  profileLevel: string;
  description: string;
}

export default function useMyLevelQuery() {
  const authAxios = useAuthAxios();
  const getMyLevel = async () => {
    const result =
      await authAxios.get<ServerResponse<LevelResponse>>('/api/user/level');
    return result.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.MY_LEVEL],
    queryFn: getMyLevel,
  });
}
