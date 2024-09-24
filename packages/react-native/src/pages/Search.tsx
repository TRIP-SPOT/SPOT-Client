import { useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Font } from 'design-system';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Card from '@/components/common/Card';
import WordBreak from '@/components/common/WordBreak';
import Header from '@/components/common/Header';
import { StackRouteProps } from '@/types/navigation';
import { DEFAULT_COLOR } from '@/constants/DEFAULT_COLOR';
import useSearchQuery from '@/apis/queries/useSearchQuery';

export default function Search() {
  const route = useRoute<StackRouteProps<'Home/Search'>>();
  const { title } = route.params;
  const { data } = useSearchQuery({ keyword: title });

  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const onProgressChange = () => {
    if (!carouselRef.current) return;
    const index = carouselRef.current.getCurrentIndex();
    setCarouselIndex(index);
  };

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
}
