import { Path, Svg, SvgProps } from 'react-native-svg';

export default function EarthIcon({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '23'}
      height={height || '23'}
      viewBox="0 0 23 23"
      fill="none"
    >
      <Path
        d="M11.4998 23.0001C9.91278 23.0001 8.41778 22.701 7.01478 22.0915C5.61178 21.482 4.39278 20.6656 3.35778 19.6306C2.32278 18.5956 1.50628 17.3766 0.896781 15.9736C0.287281 14.5706 -0.0117188 13.0756 -0.0117188 11.4886C-0.0117188 9.90155 0.287281 8.40655 0.896781 7.00355C1.50628 5.60055 2.32278 4.38155 3.35778 3.34655C4.39278 2.31155 5.61178 1.49505 7.01478 0.885551C8.41778 0.276051 9.91278 -0.0229492 11.4998 -0.0229492C13.0868 -0.0229492 14.5818 0.276051 15.9848 0.885551C17.3878 1.49505 18.6068 2.31155 19.6418 3.34655C20.6768 4.38155 21.4933 5.60055 22.1028 7.00355C22.7123 8.40655 23.0113 9.90155 23.0113 11.4886C23.0113 13.0756 22.7123 14.5706 22.1028 15.9736C21.4933 17.3766 20.6768 18.5956 19.6418 19.6306C18.6068 20.6656 17.3878 21.482 15.9848 22.0915C14.5818 22.701 13.0868 23.0001 11.4998 23.0001ZM10.3498 20.6426V18.4001C9.71728 18.4001 9.17678 18.1701 8.72828 17.7215C8.27978 17.2731 8.04978 16.7326 8.04978 16.1001V14.9501L2.52978 9.43005C2.47228 9.77505 2.41478 10.1201 2.36878 10.4651C2.32278 10.8101 2.29978 11.1551 2.29978 11.5001C2.29978 13.8231 3.05878 15.8471 4.58828 17.5951C6.11778 19.3431 8.03828 20.3551 10.3498 20.6426ZM18.2848 17.7101C18.6643 17.2845 19.0093 16.8361 19.3198 16.3416C19.6303 15.8471 19.8833 15.3411 20.0788 14.8121C20.2743 14.2831 20.4353 13.7426 20.5388 13.1906C20.6423 12.6386 20.6998 12.0636 20.6998 11.4886C20.6998 9.61405 20.1823 7.88905 19.1358 6.33655C18.0893 4.78405 16.6978 3.65705 14.9498 2.96705V3.42705C14.9498 4.05955 14.7198 4.60005 14.2713 5.04855C13.8228 5.49705 13.2823 5.72705 12.6498 5.72705H10.3498V8.02705C10.3498 8.34905 10.2348 8.62505 10.0163 8.84355C9.79778 9.06205 9.52178 9.17705 9.19978 9.17705H6.89978V11.4771H13.7998C14.1218 11.4771 14.3978 11.5921 14.6163 11.8106C14.8348 12.0291 14.9498 12.3051 14.9498 12.6271V16.0771H16.0998C16.5943 16.0771 17.0543 16.2266 17.4568 16.5256C17.8593 16.8246 18.1353 17.2156 18.2963 17.6871L18.2848 17.7101Z"
        fill={color || '#E8EAED'}
      />
    </Svg>
  );
}
