import { Dimensions, View, TouchableOpacity } from 'react-native';
import { Font } from 'design-system';
import { geoPath, geoMercator } from 'd3-geo';
import { Svg, G, Path } from 'react-native-svg';
import { useState } from 'react';
import mapData from '@/assets/mapData';
import { KoreaLocationName } from '@/types/map';
import { StackNavigation } from '@/types/navigation';
import useBottomSheet from '@/hooks/useBottomSheet';

interface MapsMainProps {
  navigation: StackNavigation<'Maps/Main'>;
}

const { width, height } = Dimensions.get('window');

export default function Maps({ navigation }: MapsMainProps) {
  const [region, setRegion] = useState<KoreaLocationName>();
  const { BottomSheet, showBottonSheet } = useBottomSheet();

  const projection = geoMercator() // 구형 투영도
    .scale(3300) // 스케일 조정
    .center([127.766922, 35.907757]) // 한국의 중심 좌표
    .translate([width / 2, height / 2]);

  const pathGenerator = geoPath().projection(projection);

  return (
    <View className="flex-1 bg-[#D2F3F8]">
      <Svg width={width} height={height}>
        <G>
          {mapData.features.map((feature) => {
            const geoFeature = feature as GeoJSON.Feature<GeoJSON.Geometry>;
            return (
              <Path
                key={feature.properties.CTP_KOR_NM}
                d={pathGenerator(geoFeature) || ''}
                fill="white"
                stroke="#000"
                strokeWidth={1}
                onPress={() => {
                  setRegion(feature.properties.CTP_KOR_NM);
                  showBottonSheet();
                }}
              />
            );
          })}
        </G>
      </Svg>
      <BottomSheet isShow={Boolean(region)}>
        <View className="flex justify-evenly items-center mt-2 flex-col gap-4">
          <View className="flex">
            <Font.Bold type="mainTitle" color="black">
              {region}
            </Font.Bold>
          </View>
          <View className="flex items-center w-full ">
            <TouchableOpacity className="py-2">
              <Font type="title1" color="black">
                대표사진 설정하기
              </Font>
            </TouchableOpacity>
            <View className="w-[90%] h-[0.5px] bg-[#333333]" />
            <TouchableOpacity
              className="py-2"
              onPress={() =>
                region &&
                navigation.navigate('Maps/Record', { location: region })
              }
            >
              <Font type="title1" color="black">
                로그보기
              </Font>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
