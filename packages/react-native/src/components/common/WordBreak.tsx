import { Color, Font, FontType } from 'design-system';
import { View } from 'react-native';

interface WordBreakProps {
  content: string;
  width: number;
  type: FontType;
  color: Color;
}

/**
 * @description content의 단어 단위로 줄바꿈 적용
 */
export default function WordBreak({
  content,
  width,
  type,
  color,
}: WordBreakProps) {
  return (
    <View
      style={{
        width,
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {content.split(' ').map((word, index) => (
        <Font key={`${word}-${index}`} type={type} color={color}>
          {word}{' '}
        </Font>
      ))}
    </View>
  );
}
