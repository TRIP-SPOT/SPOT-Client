import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Asset } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import useAuthAxios from '../useAuthAxios';
import { City, Region } from '@/constants/CITY';
import CustomForm from '@/utils/CustomForm';
import { StackNavigation } from '@/types/navigation';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface PlanInfo {
  region: Region;
  city: City;
  startDate: string;
  endDate: string;
}

interface AddTripPlanProps {
  planInfo: PlanInfo;
  image: Asset;
}

export default function useAddTripPlan() {
  const navigate = useNavigation<StackNavigation<'TripPlanner/Post'>>();
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const addTripPlan = async ({ planInfo, image }: AddTripPlanProps) => {
    const customForm = new CustomForm();
    Object.entries(planInfo).forEach(([key, value]) => {
      customForm.append(key, value);
    });

    customForm.appendImage('image', image);

    await authAxios.post('/api/schedule', customForm.getForm(), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return useMutation({
    mutationFn: addTripPlan,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TRIP_PLANS],
      });
      navigate.goBack();
    },
  });
}
