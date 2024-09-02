import { Dimensions, View, TouchableOpacity } from 'react-native';
import { Font } from 'design-system';
import { geoPath, geoMercator } from 'd3-geo';
import { Svg, G, Path, Image, Defs, Pattern } from 'react-native-svg';
import { useState } from 'react';
import mapData from '@/assets/mapData';
import { KoreaLocationName } from '@/types/map';
import { StackNavigation } from '@/types/navigation';
import useBottomSheet from '@/hooks/useBottomSheet';
import useGallery from '@/hooks/useGallery';

interface MapsMainProps {
  navigation: StackNavigation<'Maps/Main'>;
}

type RegionRepresentImage = Partial<Record<KoreaLocationName, string>>;

const { width, height } = Dimensions.get('window');

export default function Maps({ navigation }: MapsMainProps) {
  const [region, setRegion] = useState<KoreaLocationName>();
  const { BottomSheet, showBottonSheet } = useBottomSheet();
  const [regionImage, setRegionImage] = useState<RegionRepresentImage>();
  const { getPhoto } = useGallery();

  const projection = geoMercator()
    .scale(3300)
    .center([127.766922, 35.907757])
    .translate([width / 2, height / 2]);

  const pathGenerator = geoPath().projection(projection);

  const handleAddRegionImage = async (regionName: KoreaLocationName) => {
    const photo = (await getPhoto()) as string;
    if (photo) {
      setRegionImage((prev) => ({
        ...prev,
        [regionName]: photo,
      }));
    }
  };

  return (
    <View className="flex-1 bg-[#D2F3F8]">
      <Svg width={width} height={height}>
        <Defs>
          {mapData.features.map((feature) => {
            const regionName = feature.properties.CTP_KOR_NM;
            const patternImage = regionImage?.[regionName];
            return (
              patternImage && (
                <Pattern
                  key={regionName}
                  id={`${regionName}Image`}
                  patternUnits="userSpaceOnUse"
                  width={width / 4}
                  height={height / 4}
                >
                  <Image
                    href={patternImage}
                    width={width / 4}
                    height={height / 4}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </Pattern>
              )
            );
          })}
        </Defs>
        <G>
          {mapData.features.map((feature) => {
            const geoFeature = feature as GeoJSON.Feature<GeoJSON.Geometry>;
            const regionName = feature.properties.CTP_KOR_NM;
            const patternId = `${regionName}Image`;

            return (
              <Path
                key={regionName}
                d={pathGenerator(geoFeature) || ''}
                fill={
                  regionImage?.[regionName] ? `url(#${patternId})` : 'white'
                }
                stroke="#000"
                strokeWidth={1}
                onPress={() => {
                  setRegion(regionName);
                  showBottonSheet();
                }}
              />
            );
          })}
        </G>
      </Svg>
      {region && (
        <BottomSheet isShow={Boolean(region)}>
          <View className="flex justify-evenly items-center mt-2 flex-col gap-4">
            <View className="flex">
              <Font.Bold type="mainTitle" color="black">
                {region}
              </Font.Bold>
            </View>
            <View className="flex items-center w-full ">
              <TouchableOpacity
                className="py-2"
                onPress={() => handleAddRegionImage(region)}
              >
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
      )}
    </View>
  );
}
