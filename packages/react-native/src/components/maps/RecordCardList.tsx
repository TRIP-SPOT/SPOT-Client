import React from 'react';
import { View } from 'react-native';
import RecordCard, { CARD_GAP } from './RecordCard';
import { KoreaLocationName } from '@/types/map';

export type MockCardData = {
  id: number;
  title: string;
  location: KoreaLocationName;
  date: string;
  backgroundImage: string;
};

const MOCK_LOG_CARD: MockCardData[] = [
  {
    id: 1,
    title: '민지사진',
    date: '2024.08.04',
    location: '강원도',
    backgroundImage:
      'https://i.namu.wiki/i/8BAuDmjlFbHoGpGTyTUJyeIsrWw7vrGKTvbOBS1DbaLNHHFL6D05TSZEyVGGffn_RIs6zrf4jCb5Xq5Lnbs8QQ.webp',
  },
  {
    id: 2,
    title: '준비갈완료',
    date: '2024.08.04',
    location: '경상남도',
    backgroundImage:
      'https://t1.daumcdn.net/news/202406/27/poctan/20240627172416746baii.jpg',
  },
  {
    id: 3,
    title: '이미지 구하기 귀찮다',
    date: '2024.08.04',
    location: '제주특별자치도',
    backgroundImage:
      'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202406/20/starfashion/20240620094035441whlh.jpg',
  },
];

interface RecordCardListProps {
  handleOpenOptions: (data: MockCardData) => void;
}

export default function RecordCardList({
  handleOpenOptions,
}: RecordCardListProps) {
  return (
    <View
      className="mt-5 flex flex-row flex-wrap "
      style={{
        gap: CARD_GAP,
      }}
    >
      {MOCK_LOG_CARD.map((data) => (
        <View key={data.title + data.backgroundImage}>
          <RecordCard
            id={data.id}
            title={data.title}
            date={data.date}
            location={data.location}
            backgroundImage={data.backgroundImage}
            handleClickCard={() => handleOpenOptions(data)}
          />
        </View>
      ))}
    </View>
  );
}
