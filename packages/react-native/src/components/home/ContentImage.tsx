import { Dimensions, Image, ImageSourcePropType, View } from 'react-native';

type ImageType = 'wide' | 'poster';

interface ContentImageProps {
  type: ImageType;
  asset: ImageSourcePropType;
}

const { width } = Dimensions.get('window');

export default function ContentImage({ type, asset }: ContentImageProps) {
  if (type === 'poster')
    return (
      <View className="mt-4">
        <Image style={{ aspectRatio: 3 / 4, height: 500 }} source={asset} />
      </View>
    );

  return (
    <View className="mt-4">
      <Image style={{ width: width - 16 }} source={asset} />
    </View>
  );
}
