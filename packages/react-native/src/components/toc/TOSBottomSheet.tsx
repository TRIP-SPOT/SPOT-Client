import { View } from 'react-native';
import { Font } from 'design-system';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Agree } from '@/pages/TOS';
import BottomSheet from '../common/BottomSheet';

interface TOSBottomSheetProps {
  selectedAgree?: keyof Agree;
  handleClose: () => void;
}

const POLICY: Record<keyof Agree, { title: string; content: string }> = {
  TOS: {
    title: '서비스 이용 약관 동의 (필수)',
    content:
      '제 1 조 (목적) \n\n 본 약관은 NICE평가정보(주)(이하 "회사"라 한다)가 제공하는 NICE아이디 서비스(이하 "서비스"라 한다)의 이용조건 및 절차를 포함한 제반 사항을 규정함을 목적으로 합니다.\n\n제 2 조 (용어의 정의)\n\n본 약관에서 사용하는 용어의 정의는 다음과 같습니다.1. 서비스: 구현되는 단말기(PC, 휴대폰 등의 각종 유무선 장치를 포함)와 상관없이 “이용자”가 본인 또는 본인의 정보 일부를 식별하여 그 결과값을 “서비스 이용사”에게 전달하는 NICE아이디 제반 서비스를 말합니다.2. 이용자: 본 약관에 정한 바에 따라서 "회사"가 제공하는 “서비스”를 이용하는 고객을 말합니다.3. 서비스 이용사: "회사"와 “서비스” 이용계약을 체결하여 “서비스”를 이용하는 회사를 의미합니다.4. 개인정보: 이용자의 성명, 주민등록번호(외국인의 경우 외국인등록번호), 주소, 연락처, 이메일 주소 등 특정 정보주체를 식별할 수 있는 정보를 뜻합니다.5. 서비스 이용기록: “이용자”가 “서비스”를 이용한 기록 이력을 의미합니다.\n\n제 3 조 (약관의 효력 발생 및 개정)\n\n1. 본 약관은 그 내용을 "서비스"의 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 즉시 그 효력이 발생합니다.2. "회사"는 “약관의 규제에 관한 법률”, “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 등 관련 법령에 위배되지 않는 범위 내에서 본 약관을 개정할 수 있습니다.3. "회사"가 본 약관을 개정할 경우에는 적용 일자와 개정 사항을 명시하여 제1항의 방식에 따라 그 적용일자 7일이전부터 적용일자 전일까지 공지 합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지 또는 통지합니다. 4. "회사"가 전항에 따라 약관의 변경을 공지 또는 통지하고 이용자가 명시적으로 거부의 의사표시를 하지 아니한 경우, 이용자는 변경된 약관에 동의한 것으로 봅니다. 이 경우 약관의 변경과 관련한 정보를 알지 못해 발생하는 이용자의 피해는 "회사"에서 책임지지 않습니다',
  },
  privacyCollection: {
    title: '개인정보 수집 및 이용동의',
    content:
      '1. 개인정보 수집 항목\n\n필수 수집 항목\n- 닉네임\n- 이메일 주소\n- 위치 정보(촬영지 근처 추천 서비스 제공을 위함)\n- 서비스 이용 기록(여행 경로 저장, 퀴즈 참여 내역 등)\n\n선택 수집 항목\n- 프로필 사진\n- 여행 기록(지도 로그, 방문 장소, 여행 후기 등)\n- 필터로 촬영한 사진(갤러리 저장 기능 활용 시)\n\n2. 개인정보 수집 및 이용 목적\n\n회사는 다음의 목적을 위해 이용자의 개인정보를 수집하고 이용합니다:\n\n1. 서비스 제공\n- 촬영지 추천, 여행 경로 저장, 퀴즈 참여 등 서비스 운영을 위한 본인 확인 및 정보 처리\n- 위치 기반 서비스를 통한 사용자 근처 촬영지 추천\n- 여행 로그, 필터 촬영 사진 등을 저장하고 사용자에게 제공\n\n2. 회원 관리\n- 회원 가입 및 계정 관리, 회원 식별\n- 불법/부정 이용 방지\n\n3. 마케팅 및 광고 활용(선택)\n- 신규 서비스, 이벤트 정보 제공\n- 광고성 정보 제공 및 마케팅 활용(선택 동의 시)\n\n3. 개인정보의 보유 및 이용 기간\n\n- 회원가입 정보: 회원 탈퇴 시 즉시 파기\n- 위치 정보: 서비스 이용 중 실시간으로만 처리되며, 기록은 저장되지 않음\n- 여행 기록 및 필터 사진: 회원이 직접 삭제하지 않는 한 보유하며, 탈퇴 시 함께 파기\n- 마케팅 및 광고 활용 정보: 동의 철회 시 즉시 파기\n\n4. 개인정보의 제3자 제공\n\n회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에 한하여 제3자에게 제공할 수 있습니다:\n\n1. 이용자가 사전에 동의한 경우\n2. 법령에 의해 요구되는 경우\n\n5. 개인정보 처리 위탁\n\n회사는 서비스 운영을 위해 개인정보 처리 업무를 외부 업체에 위탁할 수 있으며, 위탁받는 자 및 위탁 업무 내용은 개인정보 처리방침에 명시하여 고지합니다.\n\n6. 이용자의 권리\n\n이용자는 언제든지 다음의 권리를 행사할 수 있습니다:\n\n1. 개인정보 열람 및 정정 요청\n2. 개인정보 수집, 이용, 제공에 대한 동의 철회\n3. 회원 탈퇴 및 개인정보 삭제 요청\n\n7. 동의 거부 권리 및 불이익\n\n이용자는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의를 거부할 경우, 서비스 이용이 제한될 수 있습니다.\n\n8. 개인정보 보호책임자 및 문의처\n\n서비스는 개인정보 보호에 관한 사항을 총괄하는 책임자를 지정하고 있습니다. 개인정보와 관련된 문의사항은 아래의 연락처로 문의해 주시기 바랍니다.\n\n- 개인정보 보호책임자: 황유빈\n- 이메일: alicee0047@gmail.com\n- 전화번호: 010-2527-0047\n\n[동의] 본인은 위의 개인정보 수집 및 이용에 관한 내용을 충분히 이해하였으며, 이에 동의합니다.',
  },
  marketing: {
    title: '마케팅 정보 수신 동의',
    content:
      'Spot!은 이용자에게 다양한 혜택 및 맞춤형 서비스 제공을 위하여 마케팅 정보를 수집, 이용하고 있습니다. 아래의 내용을 충분히 읽어보신 후 동의 여부를 결정해 주시기 바랍니다.\n\n1. 수집 항목\n\n- 닉네임\n- 이메일 주소\n- 서비스 이용 기록(촬영지 추천, 여행 경로 저장, 퀴즈 참여 내역 등)\n\n2. 마케팅 정보 수신 목적\n\n회사는 이용자에게 다음과 같은 목적으로 마케팅 정보를 발송합니다:\n\n1. 신규 서비스 및 기능 업데이트 안내\n- Spot!의 새로운 기능, 콘텐츠, 서비스 추가 시 안내\n2. 이벤트 및 프로모션 안내\n- 이용자 참여형 이벤트, 할인 혜택, 경품 제공 관련 정보\n3. 맞춤형 광고 및 정보 제공\n- 이용자의 서비스 이용 기록을 바탕으로 맞춤형 촬영지 추천, 여행 상품 안내\n4. 앱 사용 안내 및 혜택 제공\n- 앱 사용 방법 안내 및 회원을 위한 추가 혜택 제공\n\n3. 마케팅 정보 수신 방법\n\n회사는 다음과 같은 방법으로 마케팅 정보를 제공할 수 있습니다:\n\n- 이메일\n- SMS 또는 MMS\n- 앱 푸시 알림\n\n4. 동의 철회 및 거부 권리\n\n이용자는 언제든지 마케팅 정보 수신에 대한 동의를 철회할 수 있으며, 철회 시 더 이상 마케팅 정보를 수신하지 않습니다.\n\n- 철회 방법: 앱 내 설정 메뉴 또는 이메일, SMS, 푸시 알림의 "수신 거부" 버튼을 통해 철회 가능\n- 철회 시: 동의 철회 후에도 서비스 이용에는 제한이 없으며, 마케팅 정보만 수신하지 않게 됩니다.\n\n5. 개인정보 보유 및 이용 기간\n\n- 마케팅 정보 수신 동의 철회 시 즉시 파기\n- 동의 철회 전까지 수집된 정보는 서비스 개선을 위한 데이터 분석 목적으로 일정 기간 보유될 수 있습니다.\n\n[동의] 본인은 위의 마케팅 정보 수신 동의서 내용을 충분히 이해하였으며, 이에 동의합니다.',
  },
};

export default function TOSBottomSheet({
  selectedAgree,
  handleClose,
}: TOSBottomSheetProps) {
  if (!selectedAgree) {
    return null;
  }

  return (
    <BottomSheet
      isShow={Boolean(selectedAgree)}
      handleClose={handleClose}
      snapPoints={['95%']}
    >
      <BottomSheetScrollView className="bg-white flex-1 ">
        <View className="justify-center items-center">
          <Font.Bold color="black" type="mainTitle">
            {POLICY[selectedAgree].title}
          </Font.Bold>
        </View>
        <View className="p-4">
          <Font color="black" type="body2">
            {POLICY[selectedAgree].content}
          </Font>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
