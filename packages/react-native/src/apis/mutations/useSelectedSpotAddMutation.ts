import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SpotResponse } from '../queries/spot/useSpotDetailQuery';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface AddSpotToPlanRequest {
  planId: number;
  spotList: SpotResponse[];
}

export default function useSelectedSpotAddMutation() {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const addSpotToPlan = async ({ planId, spotList }: AddSpotToPlanRequest) => {
    await authAxios.post(
      `/api/schedule/selected-spot/${planId}`,
      spotList.map((spot) => ({
        title: spot.title,
        addr1: spot.addr1,
        addr2: spot.addr2,
        contentId: spot.contentId,
        image: spot.image,
        dist: spot.dist,
        contentTypeId: spot.contentTypeId,
      })),
    );
  };

  return useMutation({
    mutationFn: addSpotToPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIP_PLANS] });
    },
  });
}
