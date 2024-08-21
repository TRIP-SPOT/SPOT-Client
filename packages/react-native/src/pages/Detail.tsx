import { useRoute } from '@react-navigation/native';
import { ImageBackground, View } from 'react-native';
import { Font } from 'design-system';
import { StackRouteProps } from '@/types/navigation';
import useDetailQuery from '@/apis/queries/useDetailQuery';
import withSuspense from '@/components/HOC/withSuspense';

const Detail = withSuspense(() => {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const { id: spotId } = route.params;

  const { data } = useDetailQuery(spotId);
  const { backgroundImage, content, location, name, title, id } = data;

  return (
    <>
      <ImageBackground className="h-[200px]" source={{ uri: backgroundImage }}>
        <View className="flex-1 justify-end bg-black/20" />
      </ImageBackground>
      <View className="flex-1 bg-[#100F0F] p-3">
        <View>
          <Font type="mainTitle" color="white">
            {title}
          </Font>
          <Font type="body1" color="white" opacity={0.5}>
            {location}
          </Font>
        </View>
      </View>
    </>
  );
});

export default Detail;
