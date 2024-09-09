import { Circle, ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

export default function MapSaveButtonIcon() {
  return (
    <Svg width="70" height="70" viewBox="0 0 70 70" fill="none">
      <Circle opacity="0.2" cx="35" cy="35" r="35" fill="#FF1919" />
      <G opacity="0.7" clip-path="url(#clip0_335_1661)">
        <Path
          d="M42.137 37.3259L32.9741 28.163L42.137 19L51.3 28.163L42.137 37.3259ZM20 34.0824V21.1083H32.9741V34.0824H20ZM36.2176 50.3V37.3259H49.1917V50.3H36.2176ZM20 50.3V37.3259H32.9741V50.3H20ZM23.2435 30.8389H29.7306V24.3518H23.2435V30.8389ZM42.1857 32.785L46.7753 28.1954L42.1857 23.6058L37.5961 28.1954L42.1857 32.785ZM39.4611 47.0565H45.9482V40.5694H39.4611V47.0565ZM23.2435 47.0565H29.7306V40.5694H23.2435V47.0565Z"
          fill="#FF1919"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_335_1661">
          <Rect
            width="31.3"
            height="31.3"
            fill="white"
            transform="translate(20 19)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
