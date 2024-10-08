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
  title1: 'text-[22px] leading-[30px]',
  mainTitle: 'text-[26px] leading-[30px]',
  body1: 'text-[16px] leading-[24px]',
  body2: 'text-[14px] leading-[18px]',
  body3: 'text-[12px] leading-[16px]',
  'ui-text': 'text-[10px] leading-[10px]',
};

export type Color = keyof typeof COLOR_PREFIX;
export type FontType = keyof typeof FONT_TYPE_PREFIX;

interface FontProps {
  children: ReactNode;
  type: FontType;
  color: Color;
  underline?: boolean;
  opacity?: number;
  ellipsis?: boolean;
}

const FontRegular = ({
  type,
  color,
  children,
  underline,
  opacity = 1,
  ellipsis,
}: FontProps) => {
  const fontType = FONT_TYPE_PREFIX[type];
  const colorStyle = COLOR_PREFIX[color];
  const underLineStyle = underline ? 'underline underline-offset-1' : '';
  const fontStyle = FONT_PREFIX.MEDIUM;
  return (
    <Text
      className={`${fontStyle} ${fontType} ${colorStyle} ${underLineStyle}`}
      style={{ opacity }}
      numberOfLines={ellipsis ? 1 : undefined}
    >
      {children}
    </Text>
  );
};

const FontBold = ({
  type,
  color,
  children,
  underline,
  opacity = 1,
  ellipsis,
}: FontProps) => {
  const fontType = FONT_TYPE_PREFIX[type];
  const colorStyle = COLOR_PREFIX[color];
  const underLineStyle = underline ? 'underline underline-offset-1' : '';
  const fontStyle = FONT_PREFIX.BOLD;
  return (
    <Text
      className={`${fontStyle} ${fontType} ${colorStyle} ${underLineStyle} truncate `}
      style={{ opacity }}
      numberOfLines={ellipsis ? 1 : undefined}
    >
      {children}
    </Text>
  );
};

const FontLight = ({
  type,
  color,
  children,
  underline,
  opacity = 10,
  ellipsis,
}: FontProps) => {
  const fontType = FONT_TYPE_PREFIX[type];
  const colorStyle = COLOR_PREFIX[color];
  const underLineStyle = underline ? 'underline underline-offset-1' : '';
  const fontStyle = FONT_PREFIX.LIGHT;

  return (
    <Text
      className={`${fontType} ${fontStyle} ${colorStyle} ${underLineStyle}`}
      style={{ opacity }}
      numberOfLines={ellipsis ? 1 : undefined}
    >
      {children}
    </Text>
  );
};

export const Font = Object.assign(FontRegular, {
  Bold: FontBold,
  Light: FontLight,
});
