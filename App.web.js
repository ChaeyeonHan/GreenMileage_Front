import React, { useState, useEffect } from 'react'
import {View, Text} from 'react-native-web'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {GOOGLE_MAPS_API_KEY} from '@env';

function App() {
    const mapContainerStyle = {
        width: '100%',
        height: '85vh',
      };
    
      const defaultCenter = {
        lat: 0,
        lng: 0,
      };

      const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행
      
    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_MAPS_API_KEY} // 위에서 생성한 API 키를 여기에 입력
        >
        <View>
            <Text> 드디어 완성 </Text>
        </View>
        <View>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentPosition || defaultCenter}
          zoom={20}
        >
          {/* 현재 위치를 마커로 표시 */}
          {currentPosition && (
            <Marker position={{ lat: currentPosition.lat, lng: currentPosition.lng }} />
          )}
        </GoogleMap>
      </View>
    </LoadScript>
    )
}

export default App