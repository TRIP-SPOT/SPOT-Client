import { useState } from 'react';
import { Dimensions, FlatList, Image, View, ViewToken } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Font } from 'design-system';
import useRecordDetailQuery from '@/apis/queries/records/useRecordDetailQuery';
import Header from '@/components/common/Header';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import withSuspense from '@/components/HOC/withSuspense';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';

interface LogDetailProps {
  navigation: StackNavigation<'Maps/RecordDetail'>;
}

const { width: fullWidth } = Dimensions.get('window');

export default withSuspense(function RecordDetail({
  navigation,
}: LogDetailProps) {
  const route = useRoute<StackRouteProps<'Maps/RecordDetail'>>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { recordDetail } = useRecordDetailQuery({
    recordId: route.params.recordId,
  });

  const snapToOffset = recordDetail?.images.map(
    (_, index) => index * fullWidth,
  );

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<string>[];
  }) => {
    setCurrentIndex(viewableItems[0].index ?? 0);
  };

  return (
    <BackGroundGradient>
      <View className="flex flex-col">
        <Header
          title={route.params.location}
          onBack={() => navigation.goBack()}
        />

        <View className="gap-2.5">
          <FlatList
            horizontal
            data={recordDetail.images}
            renderItem={({ item }) => {
              return (
                <View className="mt-5">
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: fullWidth,
                      height: fullWidth,
                    }}
                  />
                </View>
              );
            }}
            snapToOffsets={snapToOffset}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
          />
          <View className="flex flex-row gap-2 w-full justify-center">
            {recordDetail.images.map((_, index) => (
              <View
                key={index}
                className={`w-1 h-1 rounded-full ${index === currentIndex ? 'bg-SPOT-red' : 'bg-SPOT-white'}`}
              />
            ))}
          </View>
        </View>
        <View className="px-4 gap-7 mt-2">
          <View>
            <Font type="body1" color="white">
              {getDisplayRegion({
                locationEnum: recordDetail.region,
                cityEnum: recordDetail.city,
              })}
            </Font>
            <Font type="mainTitle" color="white">
              {recordDetail.title}
            </Font>
          </View>
          <View>
            <Font type="body1" color="white">
              {recordDetail.description}
            </Font>
          </View>
        </View>
      </View>
    </BackGroundGradient>
  );
});
