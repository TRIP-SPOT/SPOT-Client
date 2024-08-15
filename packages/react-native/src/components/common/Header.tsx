import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '@/assets/BackIcon';
import { useHeaderState } from '@/stores/header';
import { HEADER_STYLE } from '@/constants/HEADER_STYLE';

interface HeaderProps {
  title?: string;
  RightActionButton?: ReactElement;
  onBack?: () => void;
}

export default function Header({
  title,
  RightActionButton,
  onBack,
}: HeaderProps) {
  const { showHeader } = useHeaderState();
  const navigation = useNavigation();

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

    showHeader();

    navigation.setOptions({
      ...HEADER_STYLE,
      headerShown: true,
      headerRight: () => Right,
      headerLeft: () => Left,
      title: title || '',
    });
  }, [title, RightActionButton, onBack]);

  return null;
}
