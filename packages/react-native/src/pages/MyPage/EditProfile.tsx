import { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Button, Font, TextField } from 'design-system';
import useProfileImage from '@/hooks/useProfileImage';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { MyPageStackNavigation } from '@/types/navigation';

interface EditProfileProps {
  navigation: MyPageStackNavigation<'myPage/editProfile'>;
}

export default function EditProfile({ navigation }: EditProfileProps) {
  // FIXME: 실제 닉네임으로 변경
  const { ProfileImage, photoUri } = useProfileImage();
  const [nickname, setNickname] = useState('');

  const handleChangeProfile = () => {
    Alert.alert(photoUri);
  };

  return (
    <>
      <BackGroundGradient>
        <View className="p-4 pt-14">
          <View className="flex gap-10">
            <View className="flex items-center justify-center pt-5">
              <ProfileImage />
            </View>
            <View>
              <View>
                <Font type="body2" color="white">
                  닉네임
                </Font>
              </View>
              <View className="mt-2">
                <TextField
                  placeholder="닉네임을 입력하세요."
                  value={nickname}
                  onChange={(newNickName) => setNickname(newNickName)}
                />
              </View>
            </View>
            <View className="flex items-center gap-2">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('myPage/editProfileWithNickname', {
                    nickname,
                  })
                }
              >
                <Font.Bold type="body3" color="white" underline>
                  닉네임으로 프로필 사진 설정하기
                </Font.Bold>
              </TouchableOpacity>
              {/* FIXME: 로그아웃 기능 추가 */}
              <TouchableOpacity
                onPress={() => Alert.alert('로그아웃')}
                className="opacity-50"
              >
                <Font.Bold type="body3" color="white" underline>
                  로그아웃 하기
                </Font.Bold>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BackGroundGradient>

      <View className="bottom-16">
        <Button onPress={handleChangeProfile}>
          <Font.Bold type="title1" color="white">
            완료
          </Font.Bold>
        </Button>
      </View>
    </>
  );
}