import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Asset } from 'react-native-image-picker';
import CustomForm from '@/utils/CustomForm';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseUpdateTripPlanImageOptions {
  onSuccess?: () => void;
}

export default function useUpdateTripPlanImage(
  id: number | undefined,
  options?: UseUpdateTripPlanImageOptions,
) {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const updateImage = async (image: Asset) => {
    const formData = new CustomForm();
    formData.appendImage('image', image);

    await authAxios.patch(`/api/schedule/image/${id}`, formData.getForm(), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return useMutation({
    mutationFn: updateImage,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QUERY_KEYS.TRIP_PLANS] });
      if (options?.onSuccess) options.onSuccess();
    },
  });
}
