import { Circle, Path, Svg, SvgProps } from 'react-native-svg';

export default function CheckSelectedIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '28'}
      height={height || '28'}
      viewBox="0 0 28 28"
      fill="none"
    >
      <Circle
        cx="14"
        cy="14"
        r="13"
        fill="white"
        fillOpacity="0.5"
        stroke={color || '#FF1919'}
        strokeWidth="2"
      />
      <Path
        d="M7 13.5L11.9677 19L21 9"
        stroke={color || '#FF1919'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
