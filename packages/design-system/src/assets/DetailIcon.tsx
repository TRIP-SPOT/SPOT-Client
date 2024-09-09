import { Path, Svg, SvgProps } from 'react-native-svg';

export default function DetailIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || 25}
      height={height || 25}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M11.2 18.2501V18.4001H11.35H13.65H13.8V18.2501V11.3501V11.2001H13.65H11.35H11.2V11.3501V18.2501ZM12.5 9.20005C12.8611 9.20005 13.1754 9.06973 13.4226 8.82262C13.6697 8.57551 13.8 8.26115 13.8 7.90005C13.8 7.53895 13.6697 7.2246 13.4226 6.97748C13.1754 6.73037 12.8611 6.60005 12.5 6.60005C12.1389 6.60005 11.8245 6.73037 11.5774 6.97748C11.3303 7.2246 11.2 7.53895 11.2 7.90005C11.2 8.26115 11.3303 8.57551 11.5774 8.82262C11.8245 9.06973 12.1389 9.20005 12.5 9.20005ZM7.95522 23.2291C9.37813 23.8473 10.8936 24.1501 12.5 24.1501C14.1064 24.1501 15.6218 23.8473 17.0448 23.2291C18.4639 22.6126 19.6989 21.7858 20.7481 20.7366C21.7972 19.6875 22.624 18.4525 23.2406 17.0333C23.8587 15.6104 24.1615 14.0949 24.1615 12.4886C24.1615 10.8822 23.8587 9.36669 23.2406 7.94378C22.624 6.52461 21.7972 5.28963 20.7481 4.24048C19.6989 3.19134 18.4639 2.3645 17.0448 1.74797C15.6218 1.12982 14.1064 0.827051 12.5 0.827051C10.8936 0.827051 9.37813 1.12982 7.95522 1.74797C6.53605 2.3645 5.30106 3.19134 4.25192 4.24048C3.20278 5.28963 2.37594 6.52461 1.75941 7.94378C1.14126 9.36669 0.838489 10.8822 0.838489 12.4886C0.838489 14.0949 1.14126 15.6104 1.75941 17.0333C2.37594 18.4525 3.20278 19.6875 4.25192 20.7366C5.30106 21.7858 6.53605 22.6126 7.95522 23.2291ZM18.9259 18.9145C17.1721 20.6683 15.0254 21.5501 12.5 21.5501C9.96314 21.5501 7.82798 20.6684 6.07406 18.9145C4.32013 17.1606 3.43849 15.0254 3.43849 12.4886C3.43849 9.95171 4.32013 7.81655 6.07406 6.06262C7.82798 4.30869 9.96314 3.42705 12.5 3.42705C15.0368 3.42705 17.172 4.30869 18.9259 6.06262C20.6799 7.81655 21.5615 9.95171 21.5615 12.4886C21.5615 15.0254 20.6799 17.1606 18.9259 18.9145Z"
        fill={color || 'white'}
        stroke={color || 'white'}
        stroke-width="0.3"
      />
    </Svg>
  );
}
