import { Path, Svg, SvgProps } from 'react-native-svg';

export default function HomeIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || 24}
      height={height || 27}
      viewBox="0 0 24 27"
      fill="none"
    >
      <Path
        d="M3 24H7.5V15H16.5V24H21V10.5L12 3.75L3 10.5V24ZM0 27V9L12 0L24 9V27H13.5V18H10.5V27H0Z"
        fill={color || '#333333'}
      />
    </Svg>
  );
}
