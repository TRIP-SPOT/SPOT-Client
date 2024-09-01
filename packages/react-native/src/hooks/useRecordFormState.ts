import { useState } from 'react';

export default function useRecordFormState() {
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

  return {
    title,
    description,
    images,
    handleTitleChange,
    handleDescriptionChange,
    addImages,
    removeImages,
    resetImages,
    validate,
  };
}
