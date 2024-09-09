import { Dimensions, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { KAKAO_APP_KEY } from '@env';

interface DetailMapProps {
  latitude?: number;
  longitude?: number;
  width?: number;
}

const { width: screenWidth } = Dimensions.get('window');

const createHTML = ({ latitude, longitude }: DetailMapProps) => `<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script
      type="text/javascript"
      src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}"
    ></script>
  </head>
  <body style="padding:0; margin:0;">
    <div id="map" style="width:100%; height:100%; border-radius:10px;"></div>

    <script type="text/javascript">
      window.onload = () => {
        kakao.maps.load(() => {
          const container = document.getElementById('map'); 

          const options = {
            center: new kakao.maps.LatLng(${latitude || 33.450701}, ${longitude || 126.570667}), 
            level: 3, 
          };

          const map = new kakao.maps.Map(container, options); 
          const markerPosition = new kakao.maps.LatLng(${latitude || 33.450701}, ${longitude || 126.570667});
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        });
      };
    </script>
  </body>
</html>
`;

export default function DetailMap({
  latitude,
  longitude,
  width,
}: DetailMapProps) {
  return (
    <SafeAreaView
      style={{ width: width || screenWidth, height: 200, borderRadius: 10 }}
    >
      <WebView
        javaScriptEnabled
        style={{}}
        source={{ html: createHTML({ latitude, longitude }) }}
      />
    </SafeAreaView>
  );
}
