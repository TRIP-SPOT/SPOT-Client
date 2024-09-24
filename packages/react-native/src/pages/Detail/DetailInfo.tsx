import { ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Block from '@/components/detail/Block';
import DetailMap from './DetailMap';
import useDetailQuery from '@/apis/queries/detail/useDetailQuery';
import { StackRouteProps } from '@/types/navigation';

export default function DetailInfo() {
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
        <Block title="내용 타이틀" content={data.overview} />
      </View>
    </ScrollView>
  );
}
