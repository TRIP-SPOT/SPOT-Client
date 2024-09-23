import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import PlusIcon from '@/assets/PlusIcon';
import DeleteIcon from '@/assets/DeleteIcon';

interface ImageSelectProps {
  image?: string | string[];
  onDelete?: (image: string) => void;
  handlePressAddPhoto: () => Promise<unknown>;
}

export default function ImageSelect({
  image,
  handlePressAddPhoto,
  onDelete,
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
            horizontal
            data={image}
            renderItem={({ item }) => {
              return (
                <View className="ml-2 relative">
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 6,
                      opacity: 0.8,
                    }}
                  />
                  <View className="absolute flex justify-center items-center w-full h-full">
                    <TouchableOpacity
                      className="bg-white/30  justify-center items-center flex rounded-full p-2"
                      onPress={() => onDelete && onDelete(item)}
                    >
                      <DeleteIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 64,
                height: 64,
                borderRadius: 6,
                marginLeft: 8,
              }}
            />
          )
        )}
      </View>
    </>
  );
}
