import { useMutation } from '@tanstack/react-query';
import { Asset } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import useAuthAxios from '../useAuthAxios';
import { City, Region } from '@/constants/CITY';
import CustomForm from '@/utils/CustomForm';
import { StackNavigation } from '@/types/navigation';

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

  const addTripPlan = async ({ planInfo, image }: AddTripPlanProps) => {
    const customForm = new CustomForm();
    customForm.append('schedule', JSON.stringify(planInfo));
    customForm.appendImage('image', image);

    const response = await authAxios.post(
      '/api/schedule',
      customForm.getForm(),
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        transformRequest: (data) => data,
      },
    );

    return response.data;
  };

  return useMutation({
    mutationFn: addTripPlan,
    onSuccess: () => {
      navigate.navigate('TripPlanner/Main');
    },
  });
}
