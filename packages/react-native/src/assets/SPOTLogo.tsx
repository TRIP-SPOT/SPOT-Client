import { Path, Svg, SvgProps } from 'react-native-svg';

export default function SPOTLogo({ width, height, color }: SvgProps) {
  return (
    <Svg
      width={width || '180'}
      height={height || '76'}
      viewBox="0 0 180 76"
      fill="none"
    >
      <Path
        d="M26.62 24.7031H33.9396C35.9127 24.7031 37.5122 23.1036 37.5122 21.1306V10.1388C37.5122 9.49135 37.3362 8.85602 37.0031 8.30079L33.0634 1.73453C32.4178 0.658435 31.2548 0 29.9999 0H10.0945C8.92871 0 7.83625 0.568792 7.16772 1.52384L2.47568 8.22673C2.05533 8.82722 1.82987 9.54248 1.82987 10.2755V23.4097C1.82987 24.2454 2.12288 25.0548 2.65791 25.6968L19.348 45.7249C19.854 46.3321 20.1451 47.0848 20.1696 47.8748C20.4342 56.4078 20.3913 71.3646 18.2986 71.3646C16.3384 71.3646 14.7186 56.2979 13.9596 46.3384C13.8164 44.46 12.2583 43.0018 10.3745 43.0018H3.57259C1.5995 43.0018 0 44.6013 0 46.5744V55.3105C0 55.6424 0.046265 55.9727 0.13746 56.2919L4.74928 72.4333C5.18749 73.967 6.58932 75.0244 8.18441 75.0244H29.8147C31.1679 75.0244 32.405 74.2598 33.0101 73.0495L37.135 64.7995C37.3831 64.3035 37.5122 63.7565 37.5122 63.2018V44.5329C37.5122 43.5552 37.1115 42.6201 36.4035 41.9458L19.2768 25.6348C18.6464 25.0344 18.255 24.2256 18.1898 23.3575C17.642 16.0642 17.378 3.88705 20.1284 4.57465C22.5588 5.18223 23.0558 14.2376 22.98 20.9605C22.9571 23.0002 24.5802 24.7031 26.62 24.7031Z"
        fill={color || '#FF1919'}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M44.6577 0H51.3724C53.4931 0 55.1441 1.83591 55.0106 3.95239C54.7109 8.70749 54.7117 14.2904 56.09 14.2904C57.4684 14.2904 57.4692 8.70749 57.1694 3.95239C57.036 1.83591 58.6869 0 60.8076 0H69.8734C71.1007 0 72.242 0.62991 72.8962 1.66826L78.0475 9.84499C78.4067 10.4152 78.5973 11.0754 78.5973 11.7493V43.6258C78.5973 44.2998 78.4067 44.9599 78.0475 45.5301L72.8962 53.7069C72.242 54.7452 71.1007 55.3751 69.8734 55.3751H61.9133C59.9403 55.3751 58.3469 53.7755 58.2494 51.8048C58.0448 47.6689 57.4561 42.8711 56.09 42.8711C54.4844 42.8711 55.1457 59.9156 55.8398 71.2064C55.9668 73.2738 54.3299 75.0244 52.2586 75.0244H44.6577C42.6847 75.0244 41.0852 73.4249 41.0852 71.4518V3.57258C41.0852 1.5995 42.6847 0 44.6577 0ZM65.1406 11.2546C64.2169 15.277 63.4137 21.3863 63.4137 28.5808C63.4137 36.0893 64.2885 41.1933 65.2622 44.0678C65.669 45.2688 66.9916 45.1799 67.3074 43.9518C68.1659 40.6123 68.7726 35.0747 68.7726 28.5808C68.7726 22.398 68.2226 15.8436 67.4289 11.3289C67.1535 9.76183 65.4967 9.70388 65.1406 11.2546Z"
        fill={color || '#FF1919'}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M90.8019 0H111.05C112.227 0 113.328 0.579368 113.995 1.54907L119.054 8.91041C119.463 9.50586 119.682 10.2114 119.682 10.9339V55.6156C119.682 56.0471 119.604 56.4751 119.451 56.8788L113.803 71.8218C113.278 73.2116 111.947 74.1312 110.461 74.1312H91.3911C89.9053 74.1312 88.5747 73.2116 88.0493 71.8218L82.4008 56.8788C82.2483 56.4751 82.1701 56.0471 82.1701 55.6156V10.9339C82.1701 10.2114 82.3891 9.50586 82.7984 8.91041L87.8576 1.54907C88.5241 0.579369 89.6253 0 90.8019 0ZM99.7004 10.5425C98.4353 14.6344 97.1752 22.8052 97.1752 37.5123C97.1752 53.6049 98.6838 61.243 100.057 64.3313C100.63 65.6209 101.943 65.3143 102.345 63.9613C103.416 60.349 104.678 52.3123 104.678 37.5123C104.678 23.8767 103.607 15.3871 102.6 10.8452C102.148 8.80397 100.318 8.545 99.7004 10.5425Z"
        fill={color || '#FF1919'}
      />
      <Path
        d="M155.161 0H123.901C122.915 0 122.115 0.799751 122.115 1.78629V13.3972C122.115 14.3838 122.915 15.1835 123.901 15.1835H130.098C131.106 15.1835 131.914 16.0166 131.884 17.0239L130.209 72.2908C130.179 73.2981 130.987 74.1312 131.995 74.1312H147.961C148.969 74.1312 149.777 73.2981 149.747 72.2908L148.072 17.0239C148.042 16.0166 148.85 15.1835 149.858 15.1835H155.161C156.148 15.1835 156.948 14.3838 156.948 13.3972V1.78629C156.948 0.799751 156.148 0 155.161 0Z"
        fill={color || '#FF1919'}
      />
      <Path
        d="M162.197 1.84389L163.868 53.6464C163.899 54.61 164.689 55.3751 165.653 55.3751H167.131C167.885 55.3751 168.559 54.9006 168.813 54.1896L177.244 30.5827C177.295 30.4395 177.328 30.2903 177.341 30.1389L179.829 1.9433C179.921 0.898845 179.098 0 178.049 0H163.982C162.973 0 162.164 0.835296 162.197 1.84389Z"
        fill={color || '#FF1919'}
      />
      <Path
        d="M167.65 59.1774L162.472 59.6481C161.165 59.7669 160.029 60.5925 159.512 61.7987L158.415 64.3591C157.95 65.444 158.051 66.6886 158.684 67.6844L161.964 72.8387C163.04 74.5284 165.294 75.0042 166.96 73.8932L172.114 70.4576C173.571 69.486 174.109 67.6012 173.384 66.0066L171.225 61.257C170.597 59.8741 169.162 59.0399 167.65 59.1774Z"
        fill={color || '#FF1919'}
      />
    </Svg>
  );
}
