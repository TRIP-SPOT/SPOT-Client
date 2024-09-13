import React, { useEffect, useRef } from 'react';
import { Modal, View, Animated, Easing } from 'react-native';
import { Font } from 'design-system';
import LoadingIcon from '@/assets/LoadingIcon';

interface MutationLoadingModalProps {
  isSubmiting: boolean;
}

export default function MutationLoadingModal({
  isSubmiting,
}: MutationLoadingModalProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };

    startRotation();
  }, [rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal visible={isSubmiting} transparent animationType="fade">
      <View className="flex-1 justify-center text-center px-20">
        <View className="p-4 bg-[#191919] rounded-lg justify-center items-center py-10">
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <LoadingIcon />
          </Animated.View>
          <View className="mt-5 items-center">
            <Font type="body1" color="white">
              잠시만
            </Font>
            <Font type="body1" color="white">
              기다려주세요
            </Font>
          </View>
        </View>
      </View>
    </Modal>
  );
}
