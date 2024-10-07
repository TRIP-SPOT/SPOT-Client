import { useRef, useState } from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
  Image as RNImage,
} from 'react-native';
import { Font } from 'design-system';
import { geoPath, geoMercator } from 'd3-geo';
import { Svg, G, Path, Image, Defs, Pattern } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import mapData from '@/assets/mapData';
import { KoreaLocationName } from '@/types/map';
import { StackNavigation } from '@/types/navigation';
import useGallery from '@/hooks/useGallery';
import Header from '@/components/common/Header';
import MapSaveButtonIcon from '@/assets/MapSaveButtonIcon';
import MapDownloadIcon from '@/assets/MapDownloadIcon';
import useRecordRepresentativeMutation from '@/apis/mutations/useRecordRepresentativeMutation';
import useRecordRepresentativeQuery from '@/apis/queries/records/useRecordRepresentativeQuery';
import useToggle from '@/hooks/useToggle';
import BottomSheet from '@/components/common/BottomSheet';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';
import withSuspense from '@/components/HOC/withSuspense';

interface MapsMainProps {
  navigation: StackNavigation<'Maps/Main'>;
}

const { width, height } = Dimensions.get('window');

const REGION_PATTERN_SIZE: Record<
  KoreaLocationName,
  { size: number; x: number; y: number }
> = {
  강원도: { size: 0.5, x: -60, y: 0 },
  경기도: { size: 0.4, x: -80, y: 60 },
  경상남도: { size: 0.3, x: 80, y: 100 },
  경상북도: { size: 0.45, x: 20, y: -180 },
  광주광역시: { size: 0.08, x: 4, y: 4 },
  대구광역시: { size: 0.2, x: -10, y: 8 },
  대전광역시: { size: 0.1, x: -6, y: -8 },
  부산광역시: { size: 0.15, x: -10, y: 60 },
  서울특별시: { size: 0.15, x: -10, y: 30 },
  세종특별자치시: { size: 0.1, x: 15, y: 50 },
  울산광역시: { size: 0.2, x: -20, y: 40 },
  인천광역시: { size: 0.2, x: -20, y: -15 },
  전라남도: { size: 0.35, x: -80, y: 85 },
  전라북도: { size: 0.25, x: 0, y: 120 },
  제주특별자치도: { size: 0.3, x: 40, y: 80 },
  충청남도: { size: 0.3, x: -50, y: -30 },
  충청북도: { size: 0.4, x: -40, y: 160 },
};

export default withSuspense(function Maps({ navigation }: MapsMainProps) {
  const [region, setRegion] = useState<KoreaLocationName>();
  const { savePhoto, getCropPhoto } = useGallery();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [showBottomSheet, toggleBottomSheet] = useToggle();
  const ref = useRef<View>(null);

  const { data: regionImage } = useRecordRepresentativeQuery();
  const { mutateAsync: requestSettingImage, isPending: isSettingImagePending } =
    useRecordRepresentativeMutation();

  const projection = geoMercator()
    .scale(5000)
    .center([127.766922, 35.907757])
    .translate([width / 2, height / 2]);

  const pathGenerator = geoPath().projection(projection);

  const handleAddRegionImage = async (regionName: KoreaLocationName) => {
    toggleBottomSheet();
    const photo = await getCropPhoto();

    if (!photo) {
      Alert.alert('이미지가 선택되지 않았습니다!');
      return;
    }

    await requestSettingImage({
      region: regionName,
      image: photo,
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
      <View className="hidden">
        {regionImage &&
          Object.values(regionImage).map(
            (value, index) =>
              value && (
                <RNImage
                  key={value + index}
                  source={{ uri: value }}
                  width={100}
                  height={100}
                />
              ),
          )}
      </View>
      <MutationLoadingModal isSubmiting={isSettingImagePending} />
      <Header type="logo" />
      <View className="bg-[#D2F3F8]" ref={ref}>
        <Svg width={width} height={height}>
          <Defs>
            {mapData.features.map((feature) => {
              const regionName = feature.properties.CTP_KOR_NM;
              const patternImage = regionImage?.[regionName];
              const { size, x, y } = REGION_PATTERN_SIZE[regionName];
              return (
                patternImage && (
                  <Pattern
                    key={regionName}
                    id={`${regionName}Image`}
                    patternUnits="userSpaceOnUse"
                    width={width * size}
                    height={height * size}
                    translateX={x}
                    translateY={y}
                  >
                    <Image
                      href={patternImage}
                      width={width * size}
                      height={height * size}
                      preserveAspectRatio="xMidYMid meet"
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
                    toggleBottomSheet();
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
          isShow={showBottomSheet}
          handleClose={() => setRegion(undefined)}
          snapPoints={['25%']}
        >
          <BottomSheetView
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <View className="flex justify-evenly items-center flex-col gap-2">
              <View className="flex">
                <Font.Bold type="mainTitle" color="black">
                  {region}
                </Font.Bold>
              </View>
              <View className="flex items-center w-full">
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
                    toggleBottomSheet();
                    if (region) {
                      navigation.navigate('Maps/Record', { location: region });
                    }
                  }}
                >
                  <Font type="title1" color="black">
                    여행기록 보기
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
});
