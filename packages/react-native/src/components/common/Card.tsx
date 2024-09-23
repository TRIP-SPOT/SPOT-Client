import { Alert, ImageBackground, TouchableOpacity, View } from 'react-native';
import HeartIcon from '@assets/HeartIcon';
import { useNavigation } from '@react-navigation/native';
import { Font } from 'design-system';
import { SpotCardData } from '@/types/spot';
import { StackNavigation } from '@/types/navigation';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';

interface CardProps {
  data: SpotCardData;
  size?: number;
}

function Default({ data, size = 260 }: CardProps) {
  const { isLiked, name, region, city, posterUrl, likeCount, contentId, id } =
    data;
  const navigation = useNavigation<StackNavigation<'Home/Search'>>();

  return (
    <ImageBackground
      source={{ uri: posterUrl }}
      className="rounded-2xl overflow-hidden bg-SPOT-black"
      style={{ width: size, aspectRatio: 3 / 4 }}
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={() => navigation.navigate('Home/Detail', { contentId, id })}
        activeOpacity={1}
      >
        <View className="flex-row justify-end items-center">
          <TouchableOpacity
            className="flex-row items-center p-2"
            // FIXME: 실제 좋아요 기능 추가
            onPress={() => Alert.alert('좋아요', `${id}`)}
          >
            <HeartIcon
              width={15}
              height={15}
              color={isLiked ? 'red' : 'white'}
            />
            <View className="ml-1">
              <Font type="body3" color="white">
                {likeCount}
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
  const { name, region, city, posterUrl, contentId, id } = data;
  const navigation = useNavigation<StackNavigation<'Home/Search'>>();

  return (
    <ImageBackground
      source={{ uri: posterUrl }}
      className="rounded-lg overflow-hidden bg-SPOT-black"
      style={{ width: size, aspectRatio: 3 / 4 }}
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={() => navigation.navigate('Home/Detail', { contentId, id })}
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
