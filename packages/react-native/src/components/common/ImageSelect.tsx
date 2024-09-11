import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import PlusIcon from '@/assets/PlusIcon';

interface ImageSelectProps {
  images: string[];
  handlePressAddPhoto: () => Promise<unknown>;
}

export default function ImageSelect({
  images,
  handlePressAddPhoto,
}: ImageSelectProps) {
  return (
    <>
      <Font type="body2" color="white">
        이미지 첨부
      </Font>
      <View className="flex-row items-center mt-2 ">
        <TouchableOpacity
          className="bg-SPOT-white/60 rounded-md p-6 aspect-square w-16 justify-center items-center "
          onPress={handlePressAddPhoto}
        >
          <PlusIcon />
        </TouchableOpacity>
        <FlatList
          className="ml-2"
          horizontal
          data={images}
          renderItem={({ item }) => {
            return (
              <Image
                source={{ uri: item }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 6,
                }}
              />
            );
          }}
        />
      </View>
    </>
  );
}
