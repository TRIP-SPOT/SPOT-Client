import { Font } from 'design-system';
import { TouchableOpacity, View } from 'react-native';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';

// FIXME: 실제 네비게이션 연결
export default function Setting() {
  return (
    <BackGroundGradient>
      <Header title="설정" />
      <View className="p-4 flex gap-4">
        <View
          className="bg-[#4C4C4C]/80 rounded-lg p-6"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            gap: 16,
          }}
        >
          <Font.Bold type="body1" color="white">
            앱 정보
          </Font.Bold>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
              gap: 4,
            }}
          >
            <TouchableOpacity className="py-2">
              <Font type="body2" color="white">
                앱 버전 정보
              </Font>
            </TouchableOpacity>
            <TouchableOpacity className="py-2">
              <Font type="body2" color="white">
                서비스 이용약관
              </Font>
            </TouchableOpacity>
            <TouchableOpacity className="py-2">
              <Font type="body2" color="white">
                개인정보 취급 방침
              </Font>
            </TouchableOpacity>
          </View>
        </View>
        <View
          className="bg-[#4C4C4C]/80 rounded-lg p-6"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            gap: 16,
          }}
        >
          <Font.Bold type="body1" color="white">
            이용 정보
          </Font.Bold>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
              gap: 4,
            }}
          >
            <TouchableOpacity className="py-2">
              <Font type="body2" color="white">
                공지사항
              </Font>
            </TouchableOpacity>
            <TouchableOpacity className="py-2">
              <Font type="body2" color="white">
                문의하기
              </Font>
            </TouchableOpacity>
            <TouchableOpacity className="py-2">
              <Font type="body2" color="white">
                신고하기
              </Font>
            </TouchableOpacity>
            <TouchableOpacity className="py-2">
              <Font type="body2" color="white">
                탈퇴하기
              </Font>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackGroundGradient>
  );
}
