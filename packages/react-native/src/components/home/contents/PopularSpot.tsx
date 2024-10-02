import { Font } from 'design-system';
import { Image, ImageSourcePropType, View } from 'react-native';
import ContentTitle from '../ContentTitle';
import ContentImage from '../ContentImage';

interface PopularSpotContent {
  title: string;
  subtitle: string;
  content: string;
  image: ImageSourcePropType;
  imageType: 'poster' | 'wide';
}

const CONTENTS: PopularSpotContent[] = [
  {
    title: '동백꽃 필무렵',
    subtitle: '포항 구룡포 일본인 가옥거리',
    content:
      "구룡포 일본인 가옥거리는 '동백꽃 필 무렵'의 주요 촬영지 중 하나로, 드라 마의 포스터에도 등장한 바로 그 장소입니다. 이곳에는 주인공 동백이가 운영하던 까멜리아도 자리하고 있어, 드라마 속 장면들이 현실에서 그대로 펼쳐지는 듯한 분위기를 자아냅니다. 좁은 골목길과 고즈넉한 건물들이 어우러져 동백이의 일상과 따뜻한 사랑 이야기가 그려졌던 공간의 감성을 고스란히 느낄 수 있으며, 동백이의 삶 이 우리 눈앞에 펼쳐지는 듯한 특별한 경험을 할 수 있습니다.",
    image: require('../../../assets/home/dongbaek.png'),
    imageType: 'poster',
  },
  {
    title: '도깨비',
    subtitle: '주문진 방파제',
    content:
      "'도깨비' 하면 떠오르는 가장 기억에 남는 장면 중 하나가 바로 주문진 방파제를 배경으로 한 이 장면입니다. 이곳은 도깨비 김신과 지은탁이 처음 만난 장소로, 지은탁이 붉은 목도리를 두르고 김신과의 운명적인 만남을 가졌던 그 순간이 많은 팬들에게 깊은 인상을 남겼습니다. 푸른 바다와 파도가 어우러진 방파제는 그 자체로도 낭만적이지만, 드라마 속 장면 덕분에 더 특별한 분위기를 자아냅니다. SPOT! 필터를 이용해 도깨비와 함께하는 그 순간을 재현해보세요. 드라마의 감동을 직접 느끼며 잊지 못할 추억을 남길 수 있습니다.",
    image: require('../../../assets/home/dokaebi.png'),
    imageType: 'wide',
  },
  {
    title: '미스터 선샤인',
    subtitle: '만휴정',
    content: `'미스터 션샤인' 속 웅장한 자연과 고즈넉한 한옥이 조화를 이루는 만휴정 은 주인공들의 깊은 감정이 오고 갔던 중요한 장면이 촬영된 곳입니다. 으 히 "합시다. 러브. 나랑 같이."라는 명대사가 담긴 장면으로, 드라마 팬들에 게 더욱 특별한 의미를 갖는 명소입니다. 고요하고 아름다운 자연을 느낄 수 있는 만휴정은 사계절 내내 매력적인 경치로 많은 여행객들의 사랑을인 받고 있습니다. 이곳에서 SPOT! 필터를 사용해 주인공처럼 드라마 속 장 면을 재현해보고, 드라마의 감동을 직접 느껴보세요.`,
    image: require('../../../assets/home/mrsunshine.png'),
    imageType: 'wide',
  },
  {
    title: '사랑의 불시착',
    subtitle: '포천 한탄강 하늘다리',
    content: `한탄강 하늘다리는 ‘사랑의 불시착’ 속 윤세리와 리정혁이 자신들이 이전 에 스위스에서 만났다는 운명적인 첫 인연을 서로에게 이야기하는 중요한 장면이 촬영된 곳입니다. 이 다리는 두 주인공의 이야기가 깊어지는 낭만 적인 순간을 담아내며, 많은 팬들이 그 감동을 되새기기 위해 이곳을 찾습 니다. 한탄강 협곡 위에 놓여진 하늘다리는 웅장한 자연경관을 자랑하며, 방문객들에게도 사랑받는 명소입니다. 탁 트인 한탄강의 경치와 어우러진 이 다리를 건너며, 드라마의 감동을 생생하게 체험하고 특별한 순간을 기록해보세요.`,
    image: require('../../../assets/home/sarang.png'),
    imageType: 'wide',
  },
];

export default function PopularSpot() {
  return (
    <View className="mt-4 flex flex-col items-center justify-center px-2 pb-4">
      <View className="flex-col justify-center items-center">
        <Font.Bold color="red" type="title1">
          Spot! 필터와 함께하는
        </Font.Bold>
        <Font.Bold color="black" type="title1">
          인기 드라마 촬영지 모음
        </Font.Bold>
      </View>
      <View className="justify-center flex items-center mt-4">
        <Font.Light color="black" type="body3">
          Spot! | 2024-10-01
        </Font.Light>
      </View>
      <View className="mt-4">
        <Image
          style={{ aspectRatio: 3 / 4, height: 500 }}
          source={require('../../../assets/home/popular-spot.png')}
        />
      </View>
      <View className="mt-4">
        <Font type="body2" color="black">
          드라마 속 촬영지를 직접 만나보고, 그 감동을 다시 느껴볼 수 있는 특별한
          기회! 이번에 소개할 여행지들은 한국의 대표적인 인기 드라마 속 명장면
          이 담긴 장소들로, 많은 이들에게 사랑받아온 곳들입니다. SPOT! 필터와
          함께라면, 우리도 드라마 속 주인공이 될 수 있어요! 촬영지 에서 주인공과
          함께 사진을 찍은 듯한 SPOT! 필터를 적용해, 드라마의 감 동을 사진으로
          남겨보세요. 잊지 못할 순간을 기록하며, 현실 속에서 드라 마의 한 장면을
          직접 재현할 수 있는 절호의 기회입니다.
        </Font>
      </View>
      {CONTENTS.map((item) => (
        <View key={item.title}>
          <ContentTitle mainTitle={item.title} subTitle={item.subtitle} />
          <ContentImage type={item.imageType} asset={item.image} />
          <View className="mt-4">
            <Font type="body2" color="black">
              {item.content}
            </Font>
          </View>
        </View>
      ))}
    </View>
  );
}
