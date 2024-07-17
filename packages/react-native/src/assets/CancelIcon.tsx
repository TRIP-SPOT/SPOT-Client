import { Svg, Path, SvgProps } from 'react-native-svg';

export default function CancelIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '18'}
      height={height || '18'}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M1.8 18L0 16.2L7.2 9L0 1.8L1.8 0L9 7.2L16.2 0L18 1.8L10.8 9L18 16.2L16.2 18L9 10.8L1.8 18Z"
        fill={color || '#E8EAED'}
      />
    </Svg>
  );
}
