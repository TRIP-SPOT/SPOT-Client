import { Dimensions, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { KAKAO_APP_KEY } from '@env';

const { width } = Dimensions.get('window');

const html = `<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script
      type="text/javascript"
      src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}"
    ></script>
  </head>
  <body>
    <div id="map" style="width:${width}; height:${200}"></div>

    <script type="text/javascript">
      window.onload = () => {
        kakao.maps.load(() => {
          const container = document.getElementById('map'); 

          const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), 
            level: 3, 
          };

          const map = new kakao.maps.Map(container, options); 
          const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
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

export default function DetailMap() {
  return (
    <SafeAreaView style={{ width, height: 200 }}>
      <WebView javaScriptEnabled source={{ html }} />
    </SafeAreaView>
  );
}
