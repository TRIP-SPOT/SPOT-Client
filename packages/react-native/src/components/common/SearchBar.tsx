import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import SearchIcon from '@assets/SearchIcon';

interface SearchBarProps {
  placeholder: string;
  handleSearch: (title: string) => void;
}

export default function SearchBar({
  placeholder,
  handleSearch,
}: SearchBarProps) {
  const [searchKeyword, setSearchKeyword] = useState('');

  const search = () => {
    if (!searchKeyword) return;

    handleSearch(searchKeyword);
    setSearchKeyword('');
  };

  return (
    <View className="relative items-center justify-center">
      <TextInput
        value={searchKeyword}
        onChangeText={(newKeyword) => setSearchKeyword(newKeyword)}
        placeholder={placeholder}
        placeholderTextColor="#0F0F0F"
        className="w-full rounded-md p-4 opacity-60 bg-white border text-SPOT-black text-body1 leading-5 font-Pretendard-Medium"
        onSubmitEditing={search}
      />
      <TouchableOpacity
        className="absolute right-2.5 w-10 h-10 items-center justify-center rounded-full bg-SPOT-black/[0.15]"
        onPress={search}
        disabled={!searchKeyword}
      >
        <SearchIcon color="#0F0F0F" />
      </TouchableOpacity>
    </View>
  );
}
