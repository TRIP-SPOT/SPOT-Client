import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { AllRouteNavigation } from '@/types/navigation';
import BackIcon from '@/assets/BackIcon';

interface HeaderProps {
  navigation: AllRouteNavigation;
  title?: string;
  RightActionButton?: ReactElement;
  onBack?: () => void;
}

export default function Header({
  title,
  navigation,
  RightActionButton,
  onBack,
}: HeaderProps) {
  const Right = useMemo(
    () => <View className="px-4">{RightActionButton}</View>,
    [RightActionButton],
  );

  const Left = useMemo(
    () => (
      <TouchableOpacity
        onPress={onBack ? () => onBack() : () => navigation.goBack()}
        className="px-4"
      >
        <BackIcon />
      </TouchableOpacity>
    ),
    [onBack],
  );

  useEffect(() => {
    if (!navigation) {
      return;
    }

    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitleStyle: {
        color: 'white',
      },
      headerRight: () => Right,
      headerLeft: () => Left,
      title: title || '',
    });
  }, [title, RightActionButton, onBack]);

  return null;
}
