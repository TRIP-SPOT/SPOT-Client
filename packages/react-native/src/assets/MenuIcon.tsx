import { Path, Svg, SvgProps } from 'react-native-svg';

export default function MenuIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '18'}
      height={height || '16'}
      viewBox="0 0 18 16"
      fill="none"
    >
      <Path
        opacity="0.5"
        d="M0 0H18V2H0V0ZM0 7H18V9H0V7ZM0 14H18V16H0V14Z"
        fill={color || 'white'}
      />
    </Svg>
  );
}
