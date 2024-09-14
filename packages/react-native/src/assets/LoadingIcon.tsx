import { Path, Svg, SvgProps } from 'react-native-svg';

export default function LoadingIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '72'}
      height={height || '72'}
      viewBox="0 0 72 72"
      fill="none"
    >
      <Path
        d="M36 6V12M51 10.02L48 15.216M61.98 21L56.784 24M66 36H60M61.98 51L56.784 48M51 61.98L48 56.784M36 66V60M21 61.98L24 56.784M10.02 51L15.216 48M6 36H12M10.02 21L15.216 24M21 10.02L24 15.216"
        stroke={color || '#FF1919'}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
