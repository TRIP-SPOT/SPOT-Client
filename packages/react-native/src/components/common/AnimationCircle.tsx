import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import LoadingIcon from '@/assets/LoadingIcon';

export default function AnimationCircle() {
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
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <LoadingIcon />
    </Animated.View>
  );
}