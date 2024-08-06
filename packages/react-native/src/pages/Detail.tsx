import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Font } from 'design-system';
import { HomeRouteProps } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { SpotData } from '@/types/spot';

// FIXME: 추후 제거
const mockData: SpotData[] = [
  {
    spotId: 10,
    name: '주문진 방파제',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    backgroundImage:
      'https://i.namu.wiki/i/oIbSW8G0ldkxIJGYLf9e9OzO1n2PkDJMu78IBDV1wh7v06rSdSvlzGUc4znFOc7EH0xi1OLJx3HqzfJgkb514Oj0BPqXU2m0dWl0wwY8coA1A7rQiOcKlLpUfEZ45Ee7bKskmI3RSb760_xrYzysTw.webp',
    isLiked: true,
    likeCount: 21,
  },
  {
    spotId: 20,
    name: '룰루랄라',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    backgroundImage:
      'https://i.namu.wiki/i/5YW8uWfQIeY4JG56CkWX8tL8hzeQxsQ9o8aXoLkHiMxHkTJLyRzC0RHdd6zJHctNQYXfhHqddAg48LhqHIgdyTRRH-awxeCSoCSIT04XlPAx_ciulV9hfEPPdir_zbiT0mtWDNtr9a1hewqNhwpAbg.webp',
    isLiked: false,
    likeCount: 12,
  },
  {
    spotId: 30,
    name: '룰루랄라2',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    backgroundImage:
      'https://i.namu.wiki/i/x9m5nUyjJvqSTSPX5EczIy02UrLrzZ7ndKHhsh2yl7SXKRQMGwHCtGM-vvfWI6ySufjf_2YXXoZezjSNgDSFRyvilXPootx2PKAitdNBvEizIkMBYCCnZxu98NMSudE83LkWHXhWIVNsCXBblDzctQ.webp',
    isLiked: false,
    likeCount: 12,
  },
];

export default function Detail() {
  const route = useRoute<HomeRouteProps<'home/detail'>>();
  const { title } = route.params;

  return (
    <BackGroundGradient withHeader>
      <View className="items-center">
        <Font.Bold type="mainTitle" color="white">
          {title}
        </Font.Bold>
      </View>
    </BackGroundGradient>
  );
}
