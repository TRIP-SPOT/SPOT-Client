import { Path, Svg, SvgProps } from 'react-native-svg';

export default function HeartIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || 20}
      height={height || 19}
      viewBox="0 0 20 19"
      fill="none"
    >
      <Path
        d="M10 18.9999L8.55 17.6999C6.86667 16.1832 5.475 14.8749 4.375 13.7749C3.275 12.6749 2.4 11.6874 1.75 10.8124C1.1 9.9374 0.645833 9.13324 0.3875 8.3999C0.129167 7.66657 0 6.91657 0 6.1499C0 4.58324 0.525 3.2749 1.575 2.2249C2.625 1.1749 3.93333 0.649902 5.5 0.649902C6.36667 0.649902 7.19167 0.833236 7.975 1.1999C8.75833 1.56657 9.43333 2.08324 10 2.7499C10.5667 2.08324 11.2417 1.56657 12.025 1.1999C12.8083 0.833236 13.6333 0.649902 14.5 0.649902C16.0667 0.649902 17.375 1.1749 18.425 2.2249C19.475 3.2749 20 4.58324 20 6.1499C20 6.91657 19.8708 7.66657 19.6125 8.3999C19.3542 9.13324 18.9 9.9374 18.25 10.8124C17.6 11.6874 16.725 12.6749 15.625 13.7749C14.525 14.8749 13.1333 16.1832 11.45 17.6999L10 18.9999ZM10 16.2999C11.6 14.8666 12.9167 13.6374 13.95 12.6124C14.9833 11.5874 15.8 10.6957 16.4 9.9374C17 9.17907 17.4167 8.50407 17.65 7.9124C17.8833 7.32074 18 6.73324 18 6.1499C18 5.1499 17.6667 4.31657 17 3.6499C16.3333 2.98324 15.5 2.6499 14.5 2.6499C13.7167 2.6499 12.9917 2.87074 12.325 3.3124C11.6583 3.75407 11.2 4.31657 10.95 4.9999H9.05C8.8 4.31657 8.34167 3.75407 7.675 3.3124C7.00833 2.87074 6.28333 2.6499 5.5 2.6499C4.5 2.6499 3.66667 2.98324 3 3.6499C2.33333 4.31657 2 5.1499 2 6.1499C2 6.73324 2.11667 7.32074 2.35 7.9124C2.58333 8.50407 3 9.17907 3.6 9.9374C4.2 10.6957 5.01667 11.5874 6.05 12.6124C7.08333 13.6374 8.4 14.8666 10 16.2999Z"
        fill={color || '#E8EAED'}
      />
    </Svg>
  );
}