import { Font } from 'design-system';
import { ImageSourcePropType, View } from 'react-native';
import ContentImage from './ContentImage';

interface SetJettingContentProps {
  title: string;
  image?: ImageSourcePropType;
  content: string;
}

export default function SetJettingContent({
  title,
  content,
  image,
}: SetJettingContentProps) {
  return (
    <View>
      <View className="mt-4 w-full justify-start">
        <Font.Bold type="body1" color="black">
          {title}
        </Font.Bold>
      </View>
      {image && <ContentImage type="wide" asset={image} />}
      <View className="mt-4">
        <Font type="body2" color="black">
          {content}
        </Font>
      </View>
    </View>
  );
}
