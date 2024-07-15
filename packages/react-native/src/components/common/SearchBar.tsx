import { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import Search from '../../assets/Search';

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const [searchKeyword, setSearchKeyword] = useState('');

  const search = () => {
    if (!searchKeyword) return;

    Alert.alert(searchKeyword);
  };

  return (
    <View className="relative items-center justify-center">
      <TextInput
        value={searchKeyword}
        onChangeText={(newKeyword) => setSearchKeyword(newKeyword)}
        placeholder={placeholder}
        placeholderTextColor="#0F0F0F"
        // FIXME: 공통 폰트 디자인 적용: text-body1 text-spot-black
        className="w-full rounded-md p-4 opacity-60 bg-white border text-base text-spot-black"
        onSubmitEditing={search}
      />
      <TouchableOpacity
        className="absolute right-2.5 w-10 h-10 items-center justify-center rounded-full"
        style={{ backgroundColor: 'rgba(15,15,15,0.15)' }}
        onPress={search}
        disabled={!searchKeyword}
      >
        <Search color="#0F0F0F" />
      </TouchableOpacity>
    </View>
  );
}
