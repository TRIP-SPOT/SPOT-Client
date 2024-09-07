import { Font } from 'design-system';
import { View } from 'react-native';
import Badge, { badgePath } from '../common/Badge';
import Spacing from '../common/Spacing';

interface BadgeListItemProps {
  location: keyof typeof badgePath;
}

export default function BadgeListItem({ location }: BadgeListItemProps) {
  return (
    <View className="flex-row items-center justify-start py-4">
      <View className="items-center justify-center mr-3">
        <Badge location={location} preventFade width={80} />
      </View>
      <View>
        <Font type="title1" color="black">
          안동
        </Font>
        <Spacing height={8} />
        <Font type="ui-text" color="black">
          2024. 08. 18.
        </Font>
        <Font type="body3" color="black">
          Spot! 퀴즈 정답
        </Font>
      </View>
    </View>
  );
}
