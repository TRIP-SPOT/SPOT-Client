import React from 'react';
import { View } from 'react-native';
import RecordCard, { CARD_GAP } from './RecordCard';
import { RecordResponse } from '@/apis/queries/records/useRecordsQuery';

interface RecordCardListProps {
  cards: RecordResponse[];
  handleOpenOptions: (data: RecordResponse) => void;
}

export default function RecordCardList({
  cards,
  handleOpenOptions,
}: RecordCardListProps) {
  return (
    <View
      className="mt-5 flex flex-row flex-wrap "
      style={{
        gap: CARD_GAP,
      }}
    >
      {cards.map((card) => (
        <View key={card.title + card.imageUrl}>
          <RecordCard
            data={card}
            handleClickCard={() => handleOpenOptions(card)}
          />
        </View>
      ))}
    </View>
  );
}
