import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, CheckBox, Font } from 'design-system';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import Header from '@/components/common/Header';
import AgreeElement, { AgreeElementProps } from '@/components/toc/AgreeElement';
import TOSBottomSheet from '@/components/toc/TOSBottomSheet';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackNavigation, StackRouteProps } from '@/types/navigation';

export interface Agree {
  TOS?: boolean;
  privacyCollection?: boolean;
  marketing?: boolean;
}

export default function TOS() {
  const route = useRoute<StackRouteProps<'TOS'>>();
  const [agree, setAgree] = useState<Agree>({});
  const [selectedAgree, setSelectedAgree] = useState<keyof Agree>();
  const navigation = useNavigation<StackNavigation<'TOS'>>();

  const selectedAll = agree.TOS && agree.marketing && agree.privacyCollection;

  const toggleAgree = (agreeType: keyof Agree) => {
    setAgree((prev) => ({ ...prev, [agreeType]: !prev[agreeType] }));
  };

  const toggleAll = () => {
    if (selectedAll) setAgree({});
    else setAgree({ TOS: true, marketing: true, privacyCollection: true });
  };

  const isInValid = !agree.TOS || !agree.privacyCollection;

  const handlePressButton = () => {
    if (isInValid) {
      return;
    }

    navigation.navigate('Signup');
  };

  const AGREE_LIST: AgreeElementProps[] = [
    {
      title: '서비스 이용 약관 동의 (필수)',
      selected: Boolean(agree.TOS),
      onCheck: () => toggleAgree('TOS'),
      onPress: () => setSelectedAgree('TOS'),
    },
    {
      title: '개인정보 수집 및 이용 동의 (필수)',
      selected: Boolean(agree.privacyCollection),
      onCheck: () => toggleAgree('privacyCollection'),
      onPress: () => setSelectedAgree('privacyCollection'),
    },
    {
      title: '마케팅 정보 수신 동의 (선택)',
      selected: Boolean(agree.marketing),
      onCheck: () => toggleAgree('marketing'),
      onPress: () => setSelectedAgree('marketing'),
    },
  ];

  return (
    <BackGroundGradient withoutScroll>
      <Header title="본인 확인" />
      <View className="flex-1 justify-between">
        <View className="px-4 flex-col gap-8">
          <View>
            <Font type="body2" color="white">
              이메일
            </Font>
            <View className="rounded-md bg-Button-gray opacity-60 mt-2 p-4">
              <Font type="body2" color="white">
                {route.params.kakaoEmail}
              </Font>
            </View>
          </View>

          <View>
            <Font type="body2" color="white">
              동의 항목
            </Font>
            <View className="flex rounded-md bg-Button-gray/60 mt-2 p-6 justify-start items-start flex-col ">
              <FlatList
                data={AGREE_LIST}
                renderItem={({ item }) => (
                  <AgreeElement
                    title={item.title}
                    selected={item.selected}
                    onCheck={item.onCheck}
                    onPress={item.onPress}
                  />
                )}
              />
            </View>
          </View>
          <View className="mt-6 flex flex-row gap-2.5 items-center justify-start">
            <View>
              <CheckBox
                selected={selectedAll}
                iconSize={20}
                onPress={toggleAll}
              />
            </View>
            <View>
              <Font color="white" type="body2">
                전체 동의
              </Font>
            </View>
          </View>
        </View>
        <TOSBottomSheet
          selectedAgree={selectedAgree}
          handleClose={() => setSelectedAgree(undefined)}
        />
        <Button disabled={isInValid} onPress={handlePressButton}>
          <Font.Bold color="white" type="title1">
            완료
          </Font.Bold>
        </Button>
      </View>
    </BackGroundGradient>
  );
}
