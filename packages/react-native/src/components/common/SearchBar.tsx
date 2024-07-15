import { useState } from 'react';
import { TextInput } from 'react-native';

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <TextInput
      value={searchKeyword}
      onChangeText={(newKeyword) => setSearchKeyword(newKeyword)}
      placeholder={placeholder}
      placeholderTextColor="#0F0F0F"
      // FIXME: 공통 폰트 디자인 적용: text-body1 text-spot-black
      className="rounded-md p-4 opacity-60 bg-white border text-base text-[#0F0F0F]"
    />
  );
}
