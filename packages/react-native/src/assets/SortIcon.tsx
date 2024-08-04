import { Path, Svg, SvgProps } from 'react-native-svg';

export default function SortIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '18'}
      height={height || '12'}
      viewBox="0 0 18 12"
      fill="none"
    >
      <Path
        d="M7 12V10H11V12H7ZM3 7V5H15V7H3ZM0 2V0H18V2H0Z"
        fill={color || '#E8EAED'}
      />
    </Svg>
  );
}
