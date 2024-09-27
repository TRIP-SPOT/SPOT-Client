import { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import HeartIcon from '@assets/HeartIcon';
import { useNavigation } from '@react-navigation/native';
import { Font } from 'design-system';
import { SpotCardData } from '@/types/spot';
import { StackNavigation } from '@/types/navigation';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import useSpotLikeMutation from '@/apis/mutations/useSpotLikeMutation';
import MutationLoadingModal from './MutationLoadingModal';

interface CardProps {
  data: SpotCardData;
  size?: number;
}

interface CardLike {
  likeCount: number;
  isLiked: boolean;
}

function Default({ data, size = 260 }: CardProps) {
  const {
    isLiked,
    name,
    region,
    city,
    posterUrl,
    likeCount,
    contentId,
    id,
    workId,
  } = data;

  const [cardLike, setCardLike] = useState<CardLike>({
    isLiked,
    likeCount,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setCardLike({
      isLiked: data.isLiked,
      likeCount: data.likeCount,
    });
  }, [data]);

  const navigation = useNavigation<StackNavigation<'Home/Search'>>();
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

  return (
    <ImageBackground
      source={{ uri: posterUrl }}
      className="rounded-2xl overflow-hidden bg-SPOT-black"
      style={{ width: size, aspectRatio: 3 / 4 }}
    >
      <MutationLoadingModal
        isSubmiting={isLikePending || isCancelLikePending}
      />
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={() =>
          navigation.navigate('Home/Detail', { contentId, id, workId })
        }
        activeOpacity={1}
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
        <View className="bg-SPOT-black p-3">
          <Font.Bold type="body1" color="white">
            {name}
          </Font.Bold>
          <View className="mt-1">
            <Font type="body3" color="white">
              {getDisplayRegion({ locationEnum: region, cityEnum: city })}
            </Font>
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

function Small({ data, size = 180 }: CardProps) {
  const { name, region, city, posterUrl, contentId, id, workId } = data;
  const navigation = useNavigation<StackNavigation<'Home/Search'>>();

  return (
    <ImageBackground
      source={{ uri: posterUrl }}
      className="rounded-lg overflow-hidden bg-SPOT-black"
      style={{ width: size, aspectRatio: 3 / 4 }}
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={() =>
          navigation.navigate('Home/Detail', { contentId, id, workId })
        }
      >
        <View className="p-2.5 gap-2">
          <View>
            <View className="flex flex-row justify-start items-center">
              <Font.Bold type="body1" color="white">
                {name}
              </Font.Bold>
            </View>
            <Font type="body3" color="white">
              {getDisplayRegion({ locationEnum: region, cityEnum: city })}
            </Font>
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const Card = Object.assign(Default, { Small });

export default Card;
