import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface RecordFormContextState {
  title: string;
  description: string;
  images: string[];
  handleTitleChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  addImages: (imgUrl: string) => void;
  removeImages: (imgUrl: string) => void;
  resetImages: (imgList?: string[]) => void;
  validate: () => boolean;
}

const RecordFormContext = createContext<RecordFormContextState | null>(null);

export function RecordFormProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);

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

  const value = useMemo(
    () => ({
      title,
      description,
      images,
      handleTitleChange,
      handleDescriptionChange,
      addImages,
      removeImages,
      resetImages,
      validate,
    }),
    [title, description, images],
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
