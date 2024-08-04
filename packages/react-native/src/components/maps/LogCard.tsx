import { Dimensions, ImageBackground, View } from 'react-native';
import { Font } from 'design-system';
import DotMenuIcon from '@/assets/DotMenuIcon';

interface CardProps {
  title: string;
  location: string;
  date: string;
  backgroundImage: string;
}

const { width } = Dimensions.get('window');
export const LOG_PADDING_X = 16;
export const CARD_GAP = 8;

export default function LogCard({
  title,
  location,
  date,
  backgroundImage,
}: CardProps) {
  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="h-[240px] rounded-lg overflow-hidden"
      style={{
        width: (width - 2 * LOG_PADDING_X - CARD_GAP) / 2,
        height: 240,
      }}
    >
      <View
        className="flex-1 justify-between px-3 py-1.5"
        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      >
        <View className="flex items-end w-full">
          <DotMenuIcon />
        </View>
        <View className="p-2.5 gap-2">
          <Font.Bold type="body1" color="white">
            {title}
          </Font.Bold>
          <Font.Light type="body1" color="white">
            {location}
          </Font.Light>
          <Font.Light type="body1" color="white">
            {date}
          </Font.Light>
        </View>
      </View>
    </ImageBackground>
  );
}
