import { Circle, Path, Svg, SvgProps } from 'react-native-svg';

export default function SelectProfileIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '140'}
      height={height || '140'}
      viewBox="0 0 140 140"
      fill="none"
    >
      <Circle opacity="0.6" cx="70" cy="70" r="70" fill={color || 'white'} />
      <Path
        opacity="0.7"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M71.5 60C71.5 59.1716 70.8284 58.5 70 58.5C69.1716 58.5 68.5 59.1716 68.5 60V68.3965H60C59.1716 68.3965 58.5 69.0681 58.5 69.8965C58.5 70.725 59.1716 71.3965 60 71.3965H68.5V80C68.5 80.8284 69.1716 81.5 70 81.5C70.8284 81.5 71.5 80.8284 71.5 80V71.3965H80C80.8284 71.3965 81.5 70.725 81.5 69.8965C81.5 69.0681 80.8284 68.3965 80 68.3965H71.5V60Z"
        fill={color || 'white'}
      />
    </Svg>
  );
}
