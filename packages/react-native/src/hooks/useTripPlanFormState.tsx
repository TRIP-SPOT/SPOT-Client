import { Asset } from 'react-native-image-picker';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CitySelectValue } from '@/components/common/CitySelect';
import { DateSelectProps } from '@/components/common/DateSelect';
import { RegionSelectType } from '@/components/tripPlan/RegionSelect';
import { DateRange } from './useCalendar';

type TripFormContextState = DateSelectProps & {
  region?: RegionSelectType;
  setRegion: (value: RegionSelectType) => void;
  image?: Asset;
  changeImage: (imgUrl: Asset) => void;
  selectedCity: CitySelectValue | undefined;
  handleSelectCityChange: (item: CitySelectValue) => void;
  validate: () => boolean;
};

const TripFormContext = createContext<TripFormContextState | null>(null);

interface TripPlanFormProviderProps {
  children: ReactNode;
}
export function TripFormProvider({ children }: TripPlanFormProviderProps) {
  const [region, setRegion] = useState<RegionSelectType>();
  const [selectedCity, setSelectedCity] = useState<CitySelectValue>();
  const [image, setImage] = useState<Asset>();
  const [date, setDate] = useState<DateRange>({
    start: undefined,
    end: undefined,
  });
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>();

  const validate = () => {
    return (
      Boolean(image) &&
      Boolean(region) &&
      Boolean(date.start) &&
      Boolean(date.end)
    );
  };

  const changeImage = (imgUrl: Asset) => {
    setImage(imgUrl);
  };

  const handleSelectCityChange = (item: CitySelectValue) =>
    setSelectedCity(item);

  const value = useMemo(
    () => ({
      region,
      image,
      date,
      selectionMode,
      selectedCity,
      changeImage,
      validate,
      setDate,
      setSelectionMode,
      setRegion,
      handleSelectCityChange,
    }),
    [image, date, selectionMode, selectedCity, region],
  );

  return (
    <TripFormContext.Provider value={value}>
      {children}
    </TripFormContext.Provider>
  );
}

export default function useTripPlanFormState() {
  const context = useContext(TripFormContext);

  if (context) return context;

  throw new Error('Proivder를 확인해주세요.');
}
