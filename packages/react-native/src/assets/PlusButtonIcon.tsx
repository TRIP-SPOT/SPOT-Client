import { Circle, Path, Svg, SvgProps } from 'react-native-svg';

export default function PlusButtonIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '56'}
      height={height || '56'}
      viewBox="0 0 56 56"
      fill="none"
    >
      <Circle opacity="0.2" cx="28" cy="28" r="28" fill={color || '#FF1919'} />
      <Path
        opacity="0.7"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.5 18C29.5 17.1716 28.8284 16.5 28 16.5C27.1716 16.5 26.5 17.1716 26.5 18V26.3965H18C17.1716 26.3965 16.5 27.0681 16.5 27.8965C16.5 28.725 17.1716 29.3965 18 29.3965H26.5V38C26.5 38.8284 27.1716 39.5 28 39.5C28.8284 39.5 29.5 38.8284 29.5 38V29.3965H38C38.8284 29.3965 39.5 28.725 39.5 27.8965C39.5 27.0681 38.8284 26.3965 38 26.3965H29.5V18Z"
        fill={color || '#FF1919'}
      />
    </Svg>
  );
}
