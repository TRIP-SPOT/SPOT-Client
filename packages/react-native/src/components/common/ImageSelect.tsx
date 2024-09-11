import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import PlusIcon from '@/assets/PlusIcon';

interface ImageSelectProps {
  image: string | string[];
  handlePressAddPhoto: () => Promise<unknown>;
}

export default function ImageSelect({
  image,
  handlePressAddPhoto,
}: ImageSelectProps) {
  return (
    <>
      <Font type="body2" color="white">
        이미지 첨부
      </Font>
      <View className="flex-row items-center mt-2 ">
        <TouchableOpacity
          className="bg-Button-gray rounded-md p-6 aspect-square w-16 justify-center items-center "
          onPress={handlePressAddPhoto}
        >
          <PlusIcon color="#ff1919" />
        </TouchableOpacity>
        {Array.isArray(image) ? (
          <FlatList
            className="ml-2"
            horizontal
            data={image}
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
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 6,
            }}
          />
        )}
      </View>
    </>
  );
}
