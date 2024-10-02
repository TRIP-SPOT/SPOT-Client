import { Font } from 'design-system';
import { Image, ImageSourcePropType, View } from 'react-native';
import ContentImage from '../ContentImage';
import SetJettingContent from '../SetJettingContent';

interface SetJettingContent {
  title: string;
  image?: ImageSourcePropType;
  content: string;
}

const SET_JETTING_CONTENTS: SetJettingContent[] = [
  {
    title: 'Set-Jetting 트렌드',
    content: `최근 여행 트렌드 중 하나로 떠오르고 있는 ‘Set-Jetting’은 전 세계 여행 자들 사이에서 하나의 관광 형태로 빠르게 인기를 얻고 있습니다. Set-Jetting이란 드라마나 영화에 등장한 실제 촬영지를 직접 여행하는 것을 의미하는 신조어로, 콘텐츠 소비 방식이 여행 선택에까지 영향을 미 치는 현상을 반영하고 있습니다. American Express의 2023 Global Travel Trends Report에 따르면, 'Set-Jetting'은 주목해야 할 4가지 여행 트렌드 중 하나로 선정되었으며, Expedia의 2023 여행 트렌드 보고서 또한 2023년 주목해야 할 트렌드 중 하나로 ‘Set-Jetters’를 꼽았습니다. 관련 조사에 따르면, 전 세계 여행자들 중 2/3가 여행 전 'Set-Jetting'을 고려했으며, 그 중 39%는 드라마나 영화와 같은 미디어 콘텐츠 속 장면에 서 영감을 받아 여행을 떠난 경험이 있다고 응답했습니다. 이는 TV와 영화 같은 미디어 콘텐츠가 이제 하나의 여행 동기이자 테마로 발전하고 있음을 보여줍니다.`,
    image: require('../../../assets/home/setjettingtrend.png'),
  },
  {
    title: 'K-Contents 열풍과 한국 내 Set-Jetting 여행의 확산',
    content:
      '특히 K-드라마와 영화의 전 세계적인 인기가 높아지면서 한국의 촬영 장소 로 향하는 관광객이 급증하고 있습니다. 예를 들어, 드라마 도깨비에서 등장한 강릉의 주문진 방파제는 ‘도깨비 방파제’라는 이름으로 포토존으로 자리 잡았고, 수많은 팬들이 드라마 속 한 장면을 재현하기 위해 이곳을 찾고 있습니다.',
    image: require('../../../assets/home/tv.png'),
  },
  {
    title: '여행과 이야기가 만나는 순간',
    content:
      'Set-Jetting의 가장 큰 매력은 단순한 여행을 넘어 자신이 사랑한 이야기 속으로 들어가는 듯한 몰입감을 선사한다는 점입니다. 아름다운 자연 경관 이나 도시를 배경으로 내가 좋아하는 드라마/영화 속 장면을 떠올리며, 그 공간에 서 있는 것만으로도 특별한 감동을 느낄 수 있습니다. 뿐만 아니라 촬영지가 제공하는 고유의 분위기를 직접 경험하며, 작품 속 인물들과 더 가까워지는 기분도 느낄 수 있죠.',
  },
  {
    title: 'Spot!과 함께하는 Set-Jetting 여행 팁',
    content:
      '이러한 Set-Jetting 여행을 즐기기 위해서는, 자신이 좋아하는 작품 속 촬 영지 저보를 사전에 조사하고, 이를 바탕으로 여행을 계획하는 것이 중요 합니다. 그리고 Spot!은 이러한 Set-Jetter들을 위해 단순히 촬영지 정보 획득을 넘어 더욱 다채로운 여행을 경험할 수 있도록 도와줍니다. 촬영지 를 중심으로 하되, 그 주변의 관광 명소와 주변맛집, 숙소를 함께 탐험할 수 있도록 도와줌으로써, 촬영지 방문을 핵심으로 하면서도 현지의 고유한 매력까지 놓치지 않는 풍부한 여행 경험을 즐길 수 있습니다. 그럼 Spot!을 활용해 Set-Jetting 여행을 단계별로 준비하는 방법을 소 개합니다. 홈 탭에서 촬영지 탐색',
  },
  {
    title: '1. 홈탭에서 촬영지 검색',
    content:
      'Spot!의 홈 탭에서는 좋아하는 드라마나 영화를 검색해 해당 콘텐츠의 촬영지를 한눈에 확인할 수 있습니다. 드라마 속 주요 촬영지를 추천받고, 각 장소에 대한 상세 정보와 위치, 주소까지 모두 제공됩니다. 이뿐만 아니라, 주변 관광명소, 맛집, 숙소까지 추천받을 수 있어 한 번에 다양한 여행 정 보를 얻고 계획을 세울 수 있습니다. 원하는 장소를 내 여행에 담아 Trip Planner 탭의 My Trip(내 여행)에 저장해두는 것도 잊지 마세요.',
    image: require('../../../assets/home/homecapture.png'),
  },
  {
    title: '2. Trip Planner로 맞춤형 여행 경로 설계',
    content:
      '촬영지 탐색이 끝났다면, Trip Planner 탭에서 모아둔 장소들을 활용해 나만의 여행 경로를 설계할 차례입니다. 담은 촬영지와 관광 명소, 맛집, 숙소를 한곳에 모아보고, 그 장소들을 중심으로 여행 일정을 자유롭게 편 집할 수 있습니다. 나아가 새로운 장소를 직접 추가할 수도 있어요! 일정에 따라 장소를 추가, 삭제하고 순서를 편집하며 나만의 최적의 여행 루트를 완성해보세요.',
    image: require('../../../assets/home/tripcapture.png'),
  },
  {
    title: '3. Quiz & Filter로 촬영지에서의 특별한 체험',
    content:
      '실제 촬영지에 도착했다면 Quiz & Filter 탭을 활용해 반경 20km 내에 있 는 촬영지들을 탐색해보세요. 해당 장소에서만 사용할 수 있는 필터 카메 라를 통해 드라마의 주인공과 함께 사진을 찍은 것 같은 특별한 경험을 남 길 수 있습니다. 또한, 각 촬영지에서 퀴즈를 풀고 정답을 맞출 경우, 여행 뱃지도 획득할 수 있으니 놓치지 마세요!',
  },
  {
    title: '4. Travel Log로 나만의 여행 기록 남기기',
    content:
      '여행이 끝난 후에는 Travel Log 탭에서 방문한 촬영지와 여행 경험을 기 록하고 저장해보세요. 한국 지도에서 지역별로 대표사진을 설정해 나의 여 행 사진들로 나만의 지도를 완성할 수 있으며, 각 지역별로 여행의 추억들 기록할 수 있어요. 이 기능을 통해 여행지에서의 특별한 순간을 오래도록 간직하고 추억할 수 있겠죠.',
    image: require('../../../assets/home/travellogcapture.png'),
  },
  {
    title: '5.마이페이지에서 뱃지 확인과 레벨업',
    content: `Spot! 앱을 통해 모은 여행 뱃지들을 마이페이지 탭에서 확인해보세요. 대한민국 행정구역 별로 촬영지 방문 여부에 따라 뱃지를 수집하고, 뱃지 를 클릭해 어느 지역에서 뱃지를 획득했는지도 확인할 수 있습니다.할 배지를 많이 모을수록 나의 프로필 레벨이 올라가며, Set-Jetting 여행자 로서의 성장을 확인할 수 있습니다. 최종적으로는 최상위의 Set-Jetter 여행자인 'Director's Cut' 레벨까지 도전해보세요!`,
  },
];

export default function SetJetting() {
  return (
    <View className="mt-4 flex flex-col items-center justify-center px-2 pb-4">
      <View className="flex-col justify-center items-center">
        <View className="flex flex-row">
          <Font.Bold color="red" type="title1">
            Spot!
          </Font.Bold>
          <Font.Bold color="black" type="title1">
            과 함께 떠나는
          </Font.Bold>
        </View>
        <Font.Bold color="black" type="title1">
          Set-Jetting 여행
        </Font.Bold>
        <Font.Bold color="black" type="title1">
          : 드라마와 영화 속 그 장소로!
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
          source={require('../../../assets/home/set-jetting.png')}
        />
      </View>
      {SET_JETTING_CONTENTS.map((item) => (
        <SetJettingContent
          key={item.content}
          title={item.title}
          content={item.content}
          image={item.image}
        />
      ))}
    </View>
  );
}
