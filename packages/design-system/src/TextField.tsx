import { Platform, StyleProp, TextInput, TextStyle } from 'react-native';

interface TextField {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder: string;
  multiline?: boolean;
  isCorrect?: boolean;
  numberOfLines?: number;
  bgColor?: string;
  withoutBorder?: boolean;
  isTitle?: boolean;
  style?: StyleProp<TextStyle>;
}

export function TextField({
  value,
  onChange,
  placeholder,
  onSubmit,
  isCorrect,
  multiline,
  numberOfLines,
  bgColor = '#4c4c4c',
  withoutBorder = false,
  isTitle = false,
  style,
}: TextField) {
  const defaultClassName = 'text-SPOT-white text-body2 rounded-md p-4';
  const incorrectClassName = 'border-SPOT-red border-[2px]';
  const correctClassName = 'border-Permission-green border-[2px]';
  const border = withoutBorder ? '' : 'border-[2px] border-bg-Button-gray';

  const getBorderClassName = () => {
    if (typeof isCorrect === 'boolean' && value !== '') {
      return isCorrect ? correctClassName : incorrectClassName;
    }

    return 'border-none';
  };

  return (
    <TextInput
      multiline={multiline}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor='#ffffff'
      className={`${defaultClassName} ${border} ${getBorderClassName()}`}
      onSubmitEditing={onSubmit}
      numberOfLines={Platform.OS === 'ios' ? undefined : numberOfLines}
      style={[
        {
          minHeight: Platform.OS === 'ios' && numberOfLines && numberOfLines ? 30 * numberOfLines : undefined,
          backgroundColor: bgColor,
          fontSize: isTitle ? 22 : undefined,
          lineHeight: isTitle ? 30 : undefined,
          fontWeight: isTitle ? '600' : undefined,
        },
        style,
      ]}
    />
  );
}
