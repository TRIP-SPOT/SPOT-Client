import React, { useRef } from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import FILTER_PATHS from '@/constants/FILTER_PATHS';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width / 5; // 화면에 5개의 요소가 보이게 설정

interface FilterCarouselProps {
  filterIndex: number;
  takePhoto: () => Promise<void>;
  handleSnap: (index: number) => void;
}

interface FilterItemProps {
  item: (typeof FILTER_PATHS)[number];
  animationValue: Animated.SharedValue<number>;
  onPress: () => void;
}

function FilterItem({ item, animationValue, onPress }: FilterItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [0, 1, 2, 3, 4],
      [0.8, 0.8, 1.1, 0.8, 0.8],
    );
    const translateX = interpolate(
      animationValue.value,
      [0, 1, 2, 3, 4],
      [0, -ITEM_WIDTH * 0.1, 0, ITEM_WIDTH * 0.1, 0],
    );

    return {
      transform: [{ scale }, { translateX }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 15,
        },
        animatedStyle,
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <Image
          source={item}
          style={{
            width: ITEM_WIDTH,
            height: ITEM_WIDTH,
            resizeMode: 'cover',
          }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

// Carousel은 실제 index보다 2가 작게 시작합니다.
// 따라서 handleSnap으로 실질 인덱스와 맞출 때는 2크게 설정되어야 합니다.

function FilterCarousel({
  filterIndex,
  takePhoto,
  handleSnap,
}: FilterCarouselProps) {
  const carouselRef = useRef<ICarouselInstance>(null);
  const experienceFilterLength = FILTER_PATHS.length;

  const snapToIndex = (index: number) => {
    const moveMent = Math.abs(filterIndex - index);
    const isLoop = moveMent >= experienceFilterLength - 2;
    const vector = filterIndex - index > 0 ? 1 : -1;

    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        count: isLoop
          ? vector * (experienceFilterLength - moveMent)
          : index - filterIndex,
        animated: true,
      });
    }
  };

  const handleClickImage = (index: number) => {
    if (index === filterIndex) {
      takePhoto();
      return;
    }
    snapToIndex(index);
  };

  return (
    <Carousel
      ref={carouselRef}
      snapEnabled
      pagingEnabled
      loop
      width={ITEM_WIDTH}
      height={ITEM_WIDTH}
      style={{
        width,
        height: ITEM_WIDTH,
      }}
      defaultIndex={
        filterIndex - 2 >= 0
          ? filterIndex - 2
          : experienceFilterLength - 2 + filterIndex
      }
      scrollAnimationDuration={500}
      data={FILTER_PATHS}
      onSnapToItem={(index) => {
        handleSnap((index + 2) % experienceFilterLength);
      }}
      renderItem={({ item, animationValue, index }) => (
        <FilterItem
          item={item}
          animationValue={animationValue}
          onPress={() => handleClickImage(index)}
        />
      )}
    />
  );
}

export default FilterCarousel;
