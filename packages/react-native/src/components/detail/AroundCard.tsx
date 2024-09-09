import { Font, CheckBox } from 'design-system';
import { Alert, ImageBackground, TouchableOpacity, View } from 'react-native';

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
  const selectCard = (cardId: number) => {
    Alert.alert(`${cardId}-select`);
  };

  const getInfo = (cardId: number) => {
    Alert.alert(`${cardId}-info`);
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="w-[120px] h-[160px] rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={() => getInfo(id)}
        onLongPress={() => selectCard(id)}
        activeOpacity={0.8}
      >
        <View className="absolute top-2 left-2">
          <CheckBox onPress={() => selectCard(id)} selected={id === 1} />
        </View>
        <View className="p-2">
          <Font.Bold type="body1" color="white">
            {title}
          </Font.Bold>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
