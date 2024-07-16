import { ClipPath, Defs, G, Path, Rect, Svg, SvgProps } from 'react-native-svg';

export default function KakaoIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '27'}
      height={height || '24'}
      viewBox="0 0 27 24"
      fill="none"
    >
      <G clip-path="url(#clip0_189_905)">
        <Path
          d="M13.0628 0C5.84714 0 0 4.62159 0 10.3258C0 14.0368 2.47756 17.2926 6.19654 19.1111C5.9239 20.1301 5.20657 22.8062 5.06364 23.378C4.88629 24.0873 5.32304 24.0794 5.60891 23.8888C5.8339 23.738 9.1876 21.4563 10.6355 20.4742C11.4216 20.5907 12.2316 20.6516 13.0601 20.6516C20.2731 20.6516 26.1229 16.03 26.1229 10.3258C26.1229 4.62159 20.2757 0 13.0628 0Z"
          fill={color || '#191600'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_189_905">
          <Rect width="26.1229" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
