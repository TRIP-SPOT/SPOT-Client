import { StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import useCamera from '@/hooks/useCamera';

export default function CameraPage() {
  const { device, hasPermission } = useCamera();

  if (!device || !hasPermission) return null;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive
      photo
      audio={false}
    />
  );
}
