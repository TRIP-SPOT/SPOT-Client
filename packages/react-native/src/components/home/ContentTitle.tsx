import { Font } from 'design-system';
import { View } from 'react-native';

interface ContentTitleProps {
  mainTitle: string;
  subTitle: string;
}

export default function ContentTitle({
  mainTitle,
  subTitle,
}: ContentTitleProps) {
  return (
    <View className="mt-4 justify-center items-center flex-col">
      <View>
        <Font.Bold type="mainTitle" color="black">
          {mainTitle}
        </Font.Bold>
      </View>
      <View className="mt-2">
        <Font.Bold type="title1" color="black">
          {subTitle}
        </Font.Bold>
      </View>
    </View>
  );
}
