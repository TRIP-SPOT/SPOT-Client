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
  const { location, name, tags, backgroundImage, likeCount } = data;

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="w-[262px] h-[350px] rounded-2xl overflow-hidden"
    >
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View className="flex-row justify-between items-center">
          <FlatList
            data={tags}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={TagSeperation}
            renderItem={({ item }) => <Tag tag={item} />}
            className="flex flex-row p-2"
          />
          <TouchableOpacity
            className="flex-row items-center p-2"
            // FIXME: 실제 좋아요 기능 추가
            onPress={() => Alert.alert('좋아요')}
          >
            <HeartIcon width={14} height={14} />
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
      </View>
    </ImageBackground>
  );
}

function Small({ data }: { data: SpotData }) {
  const { location, name, tags, backgroundImage } = data;

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="w-[180px] h-[240px] rounded-lg overflow-hidden"
    >
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View className="p-2.5 gap-2">
          <View>
            <View className="flex flex-row justify-start items-center">
              <Font.Bold type="body1" color="white">
                {name}
              </Font.Bold>
              <View className="ml-2">
                <HeartIcon width={12} height={12} />
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
