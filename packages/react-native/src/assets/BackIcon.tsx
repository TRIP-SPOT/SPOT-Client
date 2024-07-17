import { ClipPath, Defs, G, Path, Rect, Svg, SvgProps } from 'react-native-svg';

export default function BackIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '12'}
      height={height || '21'}
      viewBox="0 0 12 21"
      fill="none"
    >
      <G clip-path="url(#clip0_189_922)">
        <Path
          d="M10.1868 20.3735L0 10.1868L10.1868 0L12 1.81324L3.6163 10.1868L12 18.5705L10.1868 20.3837V20.3735Z"
          fill={color || 'white'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_189_922">
          <Rect
            width={width || '12'}
            height="20.3735"
            fill={color || 'white'}
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
