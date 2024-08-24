import { Font } from 'design-system';
import { Alert, ImageBackground, TouchableOpacity, View } from 'react-native';
import DotMenuIcon from '@/assets/DotMenuIcon';

interface MySpotBlockProps {
  id: number;
  title: string;
  location: string;
  backgroundImage: string;
  date: string;
  width: number;
  gap: number;
}

export default function MySpotBlock({
  id,
  title,
  location,
  backgroundImage,
  date,
  width,
  gap,
}: MySpotBlockProps) {
  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{ width, height: width * 1.3, margin: gap / 2 }}
      className="bg-red-300 rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={() => Alert.alert(`${id}`)}
      >
        <View className="p-2">
          <Font.Bold type="title1" color="white">
            {title}
          </Font.Bold>
          <Font type="body2" color="white" opacity={0.7}>
            {location}
          </Font>
          <Font type="body2" color="white" opacity={0.7}>
            {date}
          </Font>
        </View>
        <TouchableOpacity
          className="absolute top-2 right-2"
          onPress={() => Alert.alert('메뉴 클릭')}
        >
          <DotMenuIcon />
        </TouchableOpacity>
      </TouchableOpacity>
    </ImageBackground>
  );
}
