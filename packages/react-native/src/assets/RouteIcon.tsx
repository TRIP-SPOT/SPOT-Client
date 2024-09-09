import { Path, Svg, SvgProps } from 'react-native-svg';

export default function RouteIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '21'}
      height={height || '21'}
      viewBox="0 0 21 21"
      fill="none"
    >
      <Path
        d="M6.99995 20.9999C5.71661 20.9999 4.61995 20.5449 3.69828 19.6233C2.78828 18.7133 2.32161 17.6049 2.32161 16.3216V6.80161C1.64495 6.54495 1.08495 6.12495 0.641615 5.52995C0.198281 4.93495 -0.0117188 4.25828 -0.0117188 3.49995C-0.0117188 2.53161 0.326615 1.70328 1.01495 1.01495C1.70328 0.326615 2.51995 -0.0117188 3.49995 -0.0117188C4.47995 -0.0117188 5.29661 0.326615 5.98495 1.01495C6.67328 1.70328 7.01161 2.51995 7.01161 3.49995C7.01161 4.25828 6.78995 4.93495 6.35828 5.52995C5.92661 6.12495 5.36661 6.54495 4.67828 6.80161V16.3449C4.67828 16.9866 4.91161 17.5349 5.36661 17.9899C5.82161 18.4449 6.36995 18.6783 7.01161 18.6783C7.65328 18.6783 8.20161 18.4449 8.65661 17.9899C9.11161 17.5349 9.34495 16.9866 9.34495 16.3449V4.66661C9.34495 3.38328 9.79995 2.28661 10.7216 1.36495C11.6316 0.454948 12.7399 -0.0117188 14.0233 -0.0117188C15.3066 -0.0117188 16.4033 0.443281 17.3249 1.36495C18.2466 2.28661 18.7016 3.38328 18.7016 4.66661V14.2099C19.3783 14.4666 19.9383 14.8866 20.3816 15.4816C20.8249 16.0766 21.0349 16.7533 21.0349 17.5116C21.0349 18.4799 20.6966 19.3083 20.0083 19.9966C19.3199 20.6849 18.5033 21.0233 17.5233 21.0233C16.5433 21.0233 15.7266 20.6849 15.0383 19.9966C14.3499 19.3083 14.0116 18.4916 14.0116 17.5116C14.0116 16.7533 14.2333 16.0766 14.6649 15.4699C15.0966 14.8633 15.6566 14.4433 16.3449 14.2099V4.66661C16.3449 4.02495 16.1116 3.47661 15.6566 3.02161C15.2016 2.56661 14.6533 2.33328 14.0116 2.33328C13.3699 2.33328 12.8216 2.56661 12.3666 3.02161C11.9116 3.47661 11.6783 4.02495 11.6783 4.66661V16.3333C11.6783 17.6166 11.2233 18.7133 10.3016 19.6349C9.37995 20.5566 8.28328 21.0116 6.99995 21.0116V20.9999ZM3.49995 4.66661C3.82661 4.66661 4.10661 4.54995 4.32828 4.32828C4.54995 4.10661 4.66661 3.82661 4.66661 3.49995C4.66661 3.17328 4.54995 2.89328 4.32828 2.67161C4.10661 2.44995 3.82661 2.33328 3.49995 2.33328C3.17328 2.33328 2.89328 2.44995 2.67161 2.67161C2.44995 2.89328 2.33328 3.17328 2.33328 3.49995C2.33328 3.82661 2.44995 4.10661 2.67161 4.32828C2.89328 4.54995 3.17328 4.66661 3.49995 4.66661ZM17.4999 18.6666C17.8266 18.6666 18.1066 18.5499 18.3283 18.3283C18.5499 18.1066 18.6666 17.8266 18.6666 17.4999C18.6666 17.1733 18.5499 16.8933 18.3283 16.6716C18.1066 16.4499 17.8266 16.3333 17.4999 16.3333C17.1733 16.3333 16.8933 16.4499 16.6716 16.6716C16.4499 16.8933 16.3333 17.1733 16.3333 17.4999C16.3333 17.8266 16.4499 18.1066 16.6716 18.3283C16.8933 18.5499 17.1733 18.6666 17.4999 18.6666Z"
        fill={color || '#E8EAED'}
      />
    </Svg>
  );
}