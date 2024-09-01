import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Button, Font, TextField } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import Calendar from '@/assets/Calendar';
import PlusIcon from '@/assets/PlusIcon';
import Header from '@/components/common/Header';
import DatePickers from '@/components/maps/DatePickers';
import useGallery from '@/hooks/useGallery';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useRecordMutation from '@/apis/mutations/useRecordMutation';
import useRecordFormState from '@/hooks/useRecordFormState';

const MAX_TITLE_LENGTH = 20;

export default function PostRecord() {
  const { params } = useRoute<StackRouteProps<'Maps/PostRecord'>>();
  const navigate = useNavigation<StackNavigation<'Maps/Record'>>();
  const {
    title,
    description,
    images,
    validate,
    resetImages,
    handleDescriptionChange,
    handleTitleChange,
  } = useRecordFormState();

  const { getPhoto } = useGallery();

  const { postMutate } = useRecordMutation();

  const handlePress = async () => {
    if (!validate()) {
      return;
    }

    await postMutate({
      record: {
        name: title,
        description,
        region: params.location,
      },
      images,
    });

    navigate.navigate('Maps/Record', {
      location: params.location,
    });
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
              onChange={handleTitleChange}
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
                if (photos && Array.isArray(photos)) resetImages(photos);
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
              onChange={handleDescriptionChange}
              placeholder="내용을 작성해주세요."
            />
          </View>
        </View>
      </View>
      <View className="mt-6">
        <Button disabled={!validate()} onPress={handlePress}>
          <Font type="body2" color="white">
            완료
          </Font>
        </Button>
      </View>
    </BackGroundGradient>
  );
}
