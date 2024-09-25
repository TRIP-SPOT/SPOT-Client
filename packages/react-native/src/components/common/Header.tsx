import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '@/assets/BackIcon';
import { HEADER_STYLE } from '@/constants/HEADER_STYLE';
import SPOTLogo from '@/assets/SPOTLogo';

interface HeaderProps {
  title?: string;
  RightActionButton?: ReactElement;
  onBack?: () => void;
  type?: 'logo' | 'default';
  TitleComponent?: ReactElement;
  hideLeft?: boolean;
}

export default function Header({
  title = '',
  RightActionButton,
  onBack,
  type = 'default',
  TitleComponent,
  hideLeft,
}: HeaderProps) {
  const navigation = useNavigation();

  const getHeight = () => {
    if (type === 'logo') {
      return 80;
    }
    if (TitleComponent) {
      return 100;
    }

    return undefined;
  };

  const Right = useMemo(
    () => <View className="px-4">{RightActionButton}</View>,
    [RightActionButton],
  );

  const Left = useMemo(
    () =>
      type === 'default' ? (
        <TouchableOpacity
          onPress={onBack ? () => onBack() : () => navigation.goBack()}
          className="px-4"
        >
          <BackIcon />
        </TouchableOpacity>
      ) : (
        <View className="p-4">
          <SPOTLogo height={45} width={110} />
        </View>
      ),
    [onBack],
  );

  useEffect(() => {
    if (!navigation) {
      return;
    }

    navigation.setOptions({
      ...HEADER_STYLE,
      headerShown: true,
      headerRight: () => Right,
      headerLeft: hideLeft ? null : () => Left,
      headerStyle: {
        height: getHeight(),
      },
      title: TitleComponent || title,
    });
  }, [title, RightActionButton, onBack]);

  return null;
}
