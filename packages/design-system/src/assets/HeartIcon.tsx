import { G, Mask, Path, Svg, SvgProps } from 'react-native-svg';

export default function HeartIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || 14}
      height={height || 13}
      viewBox="0 0 14 13"
      fill="none"
    >
      <Mask
        id="mask0_470_923"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="14"
        height="13"
      >
        <Path
          d="M4.40755 1.46802C2.63568 1.46802 1.19922 2.90448 1.19922 4.67635C1.19922 7.88468 4.99089 10.8014 7.03255 11.4798C9.07422 10.8014 12.8659 7.88468 12.8659 4.67635C12.8659 2.90448 11.4294 1.46802 9.65755 1.46802C8.57255 1.46802 7.61297 2.00673 7.03255 2.83127C6.73666 2.40992 6.34362 2.06605 5.8867 1.82876C5.42978 1.59146 4.92242 1.46773 4.40755 1.46802Z"
          fill="#555555"
          stroke="white"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Mask>
      <G mask="url(#mask0_470_923)">
        <Path
          d="M0.0322266 -0.865234H14.0322V13.1348H0.0322266V-0.865234Z"
          fill={color || '#FF1919'}
        />
      </G>
    </Svg>
  );
}
