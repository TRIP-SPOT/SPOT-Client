import {
  Alert,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import HeartIcon from '@assets/HeartIcon';
import { Font } from 'design-system';
import { SpotData } from '@/types/spot';
import Tag from './Tag';

function TagSeperation() {
  return <View style={{ width: 5 }} />;
}

function Default({ data }: { data: SpotData }) {
  const { location, name, tags, backgroundImage, likeCount, spotId, isLiked } =
    data;

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="w-[262px] h-[350px] rounded-2xl overflow-hidden"
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        // FIXME: 실제 상세보기로 변경
        onPress={() => Alert.alert('상세정보보기', `${spotId}`)}
        activeOpacity={1}
      >
        <View className="flex-row justify-between items-center">
          <FlatList
            data={tags}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={TagSeperation}
            renderItem={({ item }) => <Tag tag={item} />}
            className="flex flex-row p-3"
          />
          <TouchableOpacity
            className="flex-row items-center p-3"
            // FIXME: 실제 좋아요 기능 추가
            onPress={() => Alert.alert('좋아요', `${spotId}`)}
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
              {location}
            </Font>
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

function Small({ data }: { data: SpotData }) {
  const { location, name, tags, backgroundImage, isLiked } = data;

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="w-[180px] h-[240px] rounded-lg overflow-hidden"
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="p-2.5 gap-2">
          <View>
            <View className="flex flex-row justify-start items-center">
              <Font.Bold type="body1" color="white">
                {name}
              </Font.Bold>
              <View className="ml-2">
                <HeartIcon
                  width={12}
                  height={12}
                  color={isLiked ? 'red' : 'white'}
                />
              </View>
            </View>
            <Font type="body3" color="white">
              {location}
            </Font>
          </View>
          <View>
            <FlatList
              data={tags}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={TagSeperation}
              renderItem={({ item }) => <Tag tag={item} />}
              className="flex flex-row"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const Card = Object.assign(Default, { Small });

export default Card;
