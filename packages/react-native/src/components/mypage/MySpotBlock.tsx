import { useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Font } from 'design-system';
import useSpotLikeMutation from '@/apis/mutations/useSpotLikeMutation';
import { MySpotResponse } from '@/apis/queries/mypage/useMySpotsQuery';
import HeartIcon from '@/assets/HeartIcon';
import { StackNavigation } from '@/types/navigation';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import MutationLoadingModal from '../common/MutationLoadingModal';

interface MySpotBlockProps {
  mySpot: MySpotResponse;
  width: number;
  gap: number;
}
interface CardLike {
  likeCount: number;
  isLiked: boolean;
}

export default function MySpotBlock({ mySpot, width, gap }: MySpotBlockProps) {
  const navigation = useNavigation<StackNavigation<'MyPage/Profile'>>();
  const {
    posterUrl,
    name,
    region,
    city,
    likeCount,
    isLiked,
    id,
    contentId,
    workId,
  } = mySpot;

  const [cardLike, setCardLike] = useState<CardLike>({
    isLiked,
    likeCount,
  });
  const { like, isLikePending, isCancelLikePending, cancelLike } =
    useSpotLikeMutation({ contentId });

  const handleClickLike = () => {
    if (cardLike.isLiked) {
      setCardLike((prev) => ({
        isLiked: !prev.isLiked,
        likeCount: prev.likeCount - 1,
      }));
      cancelLike({ id });
      return;
    }

    setCardLike((prev) => ({
      isLiked: !prev.isLiked,
      likeCount: prev.likeCount + 1,
    }));
    like({ id });
  };

  const handleClick = () => {
    navigation.navigate('MyPage/Detail', {
      contentId,
      id,
      workId,
    });
  };

  return (
    <ImageBackground
      source={{ uri: posterUrl }}
      style={{ width, height: width * 1.3, margin: gap / 2 }}
      className="bg-red-300 rounded-lg overflow-hidden"
    >
      <MutationLoadingModal
        isSubmiting={isLikePending || isCancelLikePending}
      />
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={handleClick}
      >
        <View className="flex-row justify-end items-center">
          <TouchableOpacity
            className="flex-row items-center p-2"
            onPress={handleClickLike}
          >
            <HeartIcon
              width={15}
              height={15}
              color={cardLike.isLiked ? 'red' : 'white'}
            />
            <View className="ml-1">
              <Font type="body3" color="white">
                {cardLike.likeCount}
              </Font>
            </View>
          </TouchableOpacity>
        </View>
        <View className="p-2 bg-SPOT-black">
          <Font.Bold type="body1" color="white">
            {name}
          </Font.Bold>
          <Font type="body3" color="white" opacity={0.7}>
            {getDisplayRegion({
              locationEnum: region,
              cityEnum: city,
            })}
          </Font>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
