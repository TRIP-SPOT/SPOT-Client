import { useRef, useState } from 'react';
import { Dimensions, View, TouchableOpacity, Alert } from 'react-native';
import { Font } from 'design-system';
import { geoPath, geoMercator } from 'd3-geo';
import { Svg, G, Path, Image, Defs, Pattern } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import mapData from '@/assets/mapData';
import { KoreaLocationName } from '@/types/map';
import { StackNavigation } from '@/types/navigation';
import useBottomSheet from '@/hooks/useBottomSheet';
import useGallery from '@/hooks/useGallery';
import Header from '@/components/common/Header';
import MapSaveButtonIcon from '@/assets/MapSaveButtonIcon';
import MapDownloadIcon from '@/assets/MapDownloadIcon';
import useRecordRepresentativeMutation from '@/apis/mutations/useRecordRepresentativeMutation';
import useRecordRepresentativeQuery from '@/apis/queries/records/useRecordRepresentativeQuery';

interface MapsMainProps {
  navigation: StackNavigation<'Maps/Main'>;
}

const { width, height } = Dimensions.get('window');

export default function Maps({ navigation }: MapsMainProps) {
  const [region, setRegion] = useState<KoreaLocationName>();
  const { BottomSheet, showBottonSheet, hideBottomSheet } = useBottomSheet();
  const { getPhoto } = useGallery();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const ref = useRef<View>(null);
  const { savePhoto } = useGallery();

  const { data: regionImage } = useRecordRepresentativeQuery();
  const { mutateAsync: postRepresentativeImage } =
    useRecordRepresentativeMutation();

  const projection = geoMercator()
    .scale(3300)
    .center([127.766922, 35.907757])
    .translate([width / 2, height / 2]);

  const pathGenerator = geoPath().projection(projection);

  const handleAddRegionImage = async (regionName: KoreaLocationName) => {
    hideBottomSheet();
    const photo = (await getPhoto()) as string;

    await postRepresentativeImage({
      region: regionName,
      imageUri: photo,
    });
  };

  const handleCapture = async () => {
    const result = await captureRef(ref, {
      format: 'png',
      quality: 0.8,
    });
    await savePhoto(result);
    Alert.alert('지도가 저장됐어요!');
    setButtonClicked(false);
  };

  return (
    <View className="flex-1 bg-[#D2F3F8] relative">
      <Header type="logo" />
      <View className="bg-[#D2F3F8]" ref={ref}>
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
      </View>

      <TouchableOpacity
        className="absolute bottom-6 right-6"
        onPress={() => {
          setRegion(undefined);
          setButtonClicked(true);
        }}
      >
        <MapSaveButtonIcon />
      </TouchableOpacity>
      {region && (
        <BottomSheet
          isShow={Boolean(region)}
          handleClose={() => setRegion(undefined)}
        >
          <BottomSheetView
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
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
                  onPress={() => {
                    hideBottomSheet();
                    if (region) {
                      navigation.navigate('Maps/Record', { location: region });
                    }
                  }}
                >
                  <Font type="title1" color="black">
                    로그보기
                  </Font>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}

      {isButtonClicked && (
        <TouchableOpacity
          style={{
            flex: 1,
            position: 'absolute',
            width,
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
          activeOpacity={1}
          onPress={() => setButtonClicked(false)}
        >
          <View
            className="absolute right-6 flex flex-row items-center justify-center"
            style={{
              bottom: 108,
            }}
          >
            <Font type="title1" color="white">
              이미지 저장
            </Font>
            <TouchableOpacity
              className="bg-SPOT-red/20 rounded-full justify-center items-center ml-4"
              style={{
                width: 70,
                height: 70,
              }}
              onPress={handleCapture}
            >
              <MapDownloadIcon />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
