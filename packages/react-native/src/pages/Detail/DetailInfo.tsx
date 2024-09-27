import { ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Font } from 'design-system';
import Block from '@/components/detail/Block';
import DetailMap from './DetailMap';
import useDetailQuery from '@/apis/queries/detail/useDetailQuery';
import { StackRouteProps } from '@/types/navigation';
import withSuspense from '@/components/HOC/withSuspense';

export default withSuspense(
  function DetailInfo() {
    const route = useRoute<StackRouteProps<'Home/Detail'>>();
    const { contentId, workId } = route.params;
    const { data } = useDetailQuery({ id: contentId, workId });

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-[#100F0F] flex-1"
      >
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            gap: 20,
            paddingBottom: 20,
          }}
        >
          <Block title="주소" content={data.addr1 + data.addr2} />
          <View className="rounded-lg overflow-hidden items-center justify-center">
            <DetailMap longitude={data.longitude} latitude={data.latitude} />
          </View>
          <Block title="상세 정보" content={data.overview} />
        </View>
      </ScrollView>
    );
  },
  {
    fallback: (
      <View className="flex-1 justify-center items-center bg-SPOT-black">
        <Font type="body1" color="white">
          잠시만
        </Font>
        <Font type="body1" color="white">
          기다려주세요
        </Font>
      </View>
    ),
  },
);
