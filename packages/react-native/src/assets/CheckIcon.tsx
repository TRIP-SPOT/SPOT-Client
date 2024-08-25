import { Path, Svg, SvgProps } from 'react-native-svg';

export default function CheckIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '14'}
      height={height || '12'}
      viewBox="0 0 14 13"
      fill="none"
    >
      <Path
        d="M1.16699 5.58325L5.30678 10.1666L12.8337 1.83325"
        stroke={color || 'white'}
        stroke-opacity="0.5"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
