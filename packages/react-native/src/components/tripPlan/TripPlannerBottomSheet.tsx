import { useState } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { TripPlanResponse } from '@/apis/queries/tripPlan/useTripPlansQuery';
import BottomSheet from '../common/BottomSheet';
import TripPlannerBottomSheetOptions from './TripPlannerBottomSheetOptions';
import TripPlannerBottomSheetCalendar from './TripPlannerBottomSheetCalendar';

interface TripPlannerBottomSheetProps {
  selectedPlan?: TripPlanResponse;
  handleClose: () => void;
}

export default function TripPlannerBottomSheet({
  selectedPlan,
  handleClose,
}: TripPlannerBottomSheetProps) {
  const [viewMode, setViewMode] = useState<'options' | 'calendar'>('options');

  if (!selectedPlan) {
    return null;
  }

  const closeAndResetBottomSheet = () => {
    setViewMode('options');
    handleClose();
  };

  return (
    <BottomSheet
      isShow={Boolean(selectedPlan)}
      snapPoints={viewMode === 'options' ? ['30%'] : ['70%']}
      handleClose={closeAndResetBottomSheet}
    >
      <BottomSheetView
        style={{
          flex: 1,
          justifyContent: viewMode === 'options' ? 'center' : 'flex-start',
        }}
      >
        {viewMode === 'options' ? (
          <TripPlannerBottomSheetOptions
            selectedPlan={selectedPlan}
            handleClose={closeAndResetBottomSheet}
            openCalendar={() => setViewMode('calendar')}
          />
        ) : (
          <TripPlannerBottomSheetCalendar
            handleClose={closeAndResetBottomSheet}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}
