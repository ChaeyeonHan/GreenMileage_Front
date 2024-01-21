import React from 'react'
import {View, Text} from 'react-native-web'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function App() {
    const mapContainerStyle = {
        width: '100%',
        height: '85vh',
      };
    
      const center = {
        lat: 0,
        lng: 0,
      };
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBhio9NzCj7mhwf8kgljAIPsYBhV3GjEmQ" // 위에서 생성한 API 키를 여기에 입력
        >
        <View>
            <Text> 드디어 완성 </Text>
        </View>
        <View>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
        >
          {/* 추가적인 구글 맵 요소들을 이곳에 추가할 수 있습니다. */}
        </GoogleMap>
      </View>
    </LoadScript>
    )
}

export default App