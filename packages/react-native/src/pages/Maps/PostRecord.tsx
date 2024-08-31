import { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Button, Font, TextField } from 'design-system';
import Calendar from '@/assets/Calendar';
import PlusIcon from '@/assets/PlusIcon';
import Header from '@/components/common/Header';
import DatePickers from '@/components/maps/DatePickers';
import useGallery from '@/hooks/useGallery';
import BackGroundGradient from '@/layouts/BackGroundGradient';

const MAX_TITLE_LENGTH = 20;

export default function PostRecord() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { getPhoto } = useGallery();

  const [images, setImages] = useState<string[]>();

  const handleChange = (value: string) => {
    if (value.length <= 20) {
      setTitle(value);
    }
  };

  const validate = () => {
    return title.length > 0;
  };

  return (
    <BackGroundGradient>
      <Header title="로그 등록" />
      <View className="gap-4 flex flex-col flex-1 px-4">
        <View>
          <Font type="body2" color="white">
            지역 선택
          </Font>
        </View>
        <View>
          <Font type="body2" color="white">
            여행 제목
          </Font>
          <View className="mt-2">
            <TextField
              value={title}
              onChange={handleChange}
              placeholder="제목"
            />
            <View className="w-full justify-center items-end mt-2.5">
              <Font
                type="ui-text"
                color="white"
              >{`${title.length}/${MAX_TITLE_LENGTH}`}</Font>
            </View>
          </View>
        </View>

        <View>
          <Font type="body2" color="white">
            여행 기간
          </Font>
          <View className="bg-SPOT-white/60 rounded-md flex flex-row justify-start px-4 py-3.5 items-center mt-2">
            <View className="mr-3">
              <Calendar color="white" />
            </View>
            <DatePickers />
          </View>
        </View>

        <View>
          <Font type="body2" color="white">
            이미지 첨부
          </Font>
          <View className="flex-row items-center mt-2 ">
            <TouchableOpacity
              className="bg-SPOT-white/60 rounded-md p-6 aspect-square w-16 justify-center items-center "
              onPress={async () => {
                const photos = await getPhoto(10);
                if (photos && Array.isArray(photos)) setImages(photos);
              }}
            >
              <PlusIcon />
            </TouchableOpacity>
            <FlatList
              className="ml-2"
              horizontal
              data={images}
              renderItem={({ item }) => {
                return (
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 6,
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
        <View>
          <Font type="body2" color="white">
            짧은 기록
          </Font>
          <View className="mt-2">
            <TextField
              multiline
              numberOfLines={3}
              value={description}
              onChange={(value) => {
                setDescription(value);
              }}
              placeholder="내용을 작성해주세요."
            />
          </View>
        </View>
      </View>
      <View className="mt-6">
        <Button disabled={!validate()}>
          <Font type="body2" color="white">
            완료
          </Font>
        </Button>
      </View>
    </BackGroundGradient>
  );
}
