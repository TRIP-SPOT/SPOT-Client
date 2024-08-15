import { TouchableOpacity } from 'react-native-gesture-handler';
import Cancel from '@/assets/CancelIcon';
import Header from '@/components/common/Header';
import { SignupStackNavigation } from '@/types/navigation';
import { SignupStackParamList } from '@/routes/SignupStackNavigator';

interface HeaderProps {
  navigation: SignupStackNavigation<keyof SignupStackParamList>;
  onBack: () => void;
  onCancel: () => void;
}

export default function SignupHeader({
  navigation,
  onBack,
  onCancel,
}: HeaderProps) {
  return (
    <Header
      navigation={navigation}
      onBack={onBack}
      RightActionButton={
        <TouchableOpacity onPress={onCancel}>
          <Cancel />
        </TouchableOpacity>
      }
    />
  );
}
