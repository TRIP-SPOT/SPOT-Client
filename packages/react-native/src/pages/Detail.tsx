import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Font } from 'design-system';
import Carousel from 'react-native-reanimated-carousel';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { SpotData } from '@/types/spot';
import Card from '@/components/common/Card';
import WordBreak from '@/components/common/WordBreak';
import Header from '@/components/common/Header';
import { StackRouteProps } from '@/types/navigation';

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

const mockDescription =
  '"너와 함께한 시간 모두 눈부셨다. 날이 좋아서, 날이 좋지 않아서, 날이 적당해서 모든 날이 좋았다."';

export default function Detail() {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const { title } = route.params;

  return (
    <BackGroundGradient>
      <Header />
      <View className="items-center">
        <Font.Bold type="mainTitle" color="white">
          {title}
        </Font.Bold>
      </View>
      <View className="mt-4 justify-center items-center">
        <WordBreak
          width={220}
          type="body1"
          color="white"
          content={mockDescription}
        />
      </View>
      <View className="mt-5 mb-20">
        <Carousel
          style={{
            width: '100%',
            height: 400,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          width={260}
          height={350}
          mode="horizontal-stack"
          modeConfig={{ showLength: mockData.length }}
          loop={false}
          data={mockData}
          renderItem={({ item }) => <Card data={item} />}
        />
      </View>
    </BackGroundGradient>
  );
}
