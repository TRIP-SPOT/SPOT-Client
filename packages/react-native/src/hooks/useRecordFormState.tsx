import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { RecordGetResponse } from '@/apis/queries/records/useRecordDetailQuery';
import { CitySelectValue } from '@/components/common/CitySelect';
import { DateSelectProps } from '@/components/common/DateSelect';

type RecordFormContextState = DateSelectProps & {
  title: string;
  handleTitleChange: (value: string) => void;
  description: string;
  handleDescriptionChange: (value: string) => void;
  selectedCity: CitySelectValue | undefined;
  handleSelectCityChange: (item: CitySelectValue) => void;
  images: string[];
  addImages: (imgUrl: string) => void;
  removeImages: (imgUrl: string) => void;
  resetImages: (imgList?: string[]) => void;
  validate: () => boolean;
};

interface RecordFormProviderDefulatProps {
  children: ReactNode;
  defaultProps?: RecordGetResponse;
}

const RecordFormContext = createContext<RecordFormContextState | null>(null);

export function RecordFormProvider({
  children,
  defaultProps,
}: RecordFormProviderDefulatProps) {
  const [title, setTitle] = useState(defaultProps?.name || '');
  const [description, setDescription] = useState(
    defaultProps?.description || '',
  );
  const [selectedCity, setSelectedCity] = useState<CitySelectValue>();

  const [images, setImages] = useState<string[]>(defaultProps?.imageUrls || []);

  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });

  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>();

  const handleTitleChange = (value: string) => {
    if (value.length <= 20) {
      setTitle(value);
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const validate = () => {
    return title.length > 0 && images.length > 0;
  };

  const addImages = (imgUrl: string) => {
    setImages((prev) => [...prev, imgUrl]);
  };

  const removeImages = (imgUrl: string) => {
    setImages((prev) => prev.filter((img) => img !== imgUrl));
  };

  const resetImages = (imgList?: string[]) => {
    if (imgList) {
      return setImages(imgList);
    }

    return setImages([]);
  };

  const handleSelectCityChange = (item: CitySelectValue) =>
    setSelectedCity(item);

  const value = useMemo(
    () => ({
      title,
      description,
      images,
      date,
      selectionMode,
      selectedCity,
      handleTitleChange,
      handleDescriptionChange,
      addImages,
      removeImages,
      resetImages,
      validate,
      setDate,
      setSelectionMode,
      handleSelectCityChange,
    }),
    [title, description, images, date, selectionMode],
  );

  return (
    <RecordFormContext.Provider value={value}>
      {children}
    </RecordFormContext.Provider>
  );
}

export default function useRecordFormState() {
  const context = useContext(RecordFormContext);

  if (context) return context;

  throw new Error('Proivder를 확인해주세요.');
}
