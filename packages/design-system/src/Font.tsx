import { ReactNode } from 'react';
import { Text } from 'react-native';

const FONT_PREFIX = {
  MEDIUM: 'font-Pretendard-Medium',
  BOLD: 'font-Pretendard-Bold',
  LIGHT: 'font-Pretendard-Light',
} as const;

const COLOR_PREFIX = {
  red: 'text-SPOT-red',
  black: 'text-SPOT-black',
  white: 'text-SPOT-white',
} as const;

const FONT_TYPE_PREFIX = {
  body1: 'text-base leading-6',
  title1: 'text-[1.375rem] leading-[1.875rem]',
};

type Color = keyof typeof COLOR_PREFIX;
type FontType = keyof typeof FONT_TYPE_PREFIX;

interface FontProps {
  children: ReactNode;
  type: FontType;
  color: Color;
}

const FontBase = ({ type, color, children }: FontProps) => {
  const fontType = FONT_TYPE_PREFIX[type];
  const colorStyle = COLOR_PREFIX[color];
  const fontStyle = FONT_PREFIX.MEDIUM;
  return (
    <Text className={`${fontStyle} ${fontType} ${colorStyle}`}>{children}</Text>
  );
};

const FontBold = ({ type, color, children }: FontProps) => {
  const fontType = FONT_TYPE_PREFIX[type];
  const colorStyle = COLOR_PREFIX[color];
  const fontStyle = FONT_PREFIX.BOLD;
  return (
    <Text className={`${fontStyle} ${fontType} ${colorStyle}`}>{children}</Text>
  );
};

const FontLight = ({ type, color, children }: FontProps) => {
  const fontType = FONT_TYPE_PREFIX[type];
  const colorStyle = COLOR_PREFIX[color];
  const fontStyle = FONT_PREFIX.LIGHT;

  return (
    <Text className={`${fontType} ${fontStyle} ${colorStyle}`}>{children}</Text>
  );
};

const Font = Object.assign(FontBase, {
  Bold: FontBold,
  Light: FontLight,
});

export default Font;
