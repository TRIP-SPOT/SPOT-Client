import { TouchableOpacity } from 'react-native-gesture-handler';
import Cancel from '@/assets/CancelIcon';
import Header from '@/components/common/Header';
import { SignupStackNavigation } from '@/types/navigation';
import { SignupStackParamList } from '@/routes/SignupStackNavigator';

interface HeaderProps {
  onBack: () => void;
  onCancel: () => void;
}

export default function SignupHeader({ onBack, onCancel }: HeaderProps) {
  return (
    <Header
      onBack={onBack}
      RightActionButton={
        <TouchableOpacity onPress={onCancel}>
          <Cancel />
        </TouchableOpacity>
      }
    />
  );
}
