import { View } from 'react-native';

interface SpacingProps {
  height: number;
}

export default function Spacing({ height }: SpacingProps) {
  return <View style={{ height }} />;
}
