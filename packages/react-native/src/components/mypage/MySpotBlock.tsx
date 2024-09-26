import { Font } from 'design-system';
import { ImageBackground, TouchableOpacity, View } from 'react-native';

interface MySpotBlockProps {
  title: string;
  location?: string;
  backgroundImage: string;
  width: number;
  gap: number;
  handleClickBlock: () => void;
}

export default function MySpotBlock({
  title,
  location,
  backgroundImage,
  width,
  gap,
  handleClickBlock,
}: MySpotBlockProps) {
  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{ width, height: width * 1.3, margin: gap / 2 }}
      className="bg-red-300 rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={handleClickBlock}
      >
        <View className="p-2 bg-SPOT-black">
          <Font.Bold type="body1" color="white">
            {title}
          </Font.Bold>
          <Font type="body3" color="white" opacity={0.7}>
            {location}
          </Font>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
