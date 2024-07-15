import { Text, View } from 'react-native';

interface CardProps {
  locationName: string;
  location: string;
  tags: string[];
  liked: boolean;
  backgroundImage: string;
}

export default function Card({
  locationName,
}: Pick<CardProps, 'locationName'>) {
  return (
    <View className="w-[180px] h-[240px] rounded-lg bg-[#909090]">
      <Text>{locationName}</Text>
    </View>
  );
}
