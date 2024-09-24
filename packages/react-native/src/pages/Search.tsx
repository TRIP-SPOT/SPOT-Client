import { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Card from '@/components/common/Card';
import WordBreak from '@/components/common/WordBreak';
import Header from '@/components/common/Header';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import { DEFAULT_COLOR } from '@/constants/DEFAULT_COLOR';
import useSearchQuery from '@/apis/queries/useSearchQuery';
import withSuspense from '@/components/HOC/withSuspense';

export default withSuspense(function Search() {
  const route = useRoute<StackRouteProps<'Home/Search'>>();
  const { title } = route.params;
  const { data } = useSearchQuery({ keyword: title });
  const navigation = useNavigation<StackNavigation<'Home/Search'>>();

  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const onProgressChange = () => {
    if (!carouselRef.current) return;
    const index = carouselRef.current.getCurrentIndex();
    setCarouselIndex(index);
  };

  if (data.length === 0) {
    return (
      <BackGroundGradient withoutScroll>
        <Header />
        <View className="flex-1 justify-center items-center">
          <Font type="body1" color="white">
            검색결과가 없어요.
          </Font>
          <Font type="body1" color="white">
            다른 작품을 검색해볼까요?
          </Font>
          <TouchableOpacity
            className="bg-Button-red rounded-xl px-4 py-2 mt-4"
            onPress={() => navigation.navigate('Home/Main')}
          >
            <Font type="body2" color="white">
              돌아가기
            </Font>
          </TouchableOpacity>
        </View>
      </BackGroundGradient>
    );
  }

  return (
    <BackGroundGradient>
      <Header />
      <View className="items-center">
        <Font.Bold type="mainTitle" color="white">
          {data[carouselIndex].workName}
        </Font.Bold>
      </View>
      <View className="mt-4 justify-center items-center">
        <WordBreak
          width={220}
          type="body1"
          color="white"
          content={data[carouselIndex].quote}
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
          ref={carouselRef}
          onProgressChange={onProgressChange}
          width={260}
          height={350}
          mode="horizontal-stack"
          modeConfig={{ showLength: data.length }}
          loop={false}
          data={data}
          renderItem={({ item }) => <Card data={item} />}
        />
        <View className="flex-row justify-center gap-2">
          {data.map((_, index) => (
            <View
              key={index}
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor:
                  carouselIndex === index
                    ? DEFAULT_COLOR.SPOT_RED
                    : DEFAULT_COLOR.SPOT_GRAY,
              }}
            />
          ))}
        </View>
      </View>
    </BackGroundGradient>
  );
});
