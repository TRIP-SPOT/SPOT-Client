import { Font } from 'design-system';
import { Alert, ImageBackground, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AroundCardProps {
  id: number;
  title: string;
  backgroundImage: string;
}

export default function AroundCard({
  id,
  title,
  backgroundImage,
}: AroundCardProps) {
  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="w-[120px] h-[160px] rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={() => Alert.alert(`${id}`)}
      >
        <View className="p-2">
          <Font.Bold type="body1" color="white">
            {title}
          </Font.Bold>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
