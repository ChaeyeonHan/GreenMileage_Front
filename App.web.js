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
      
      const [bicylocations, setbicyLocations] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/bicycle');
            const data = await response.json();
            setbicyLocations(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행


      const [eleclocations, setelecLocations] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/electric_car');
            const data = await response.json();
            setelecLocations(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행


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

      const [showBicyLocations, setShowBicyLocations] = useState(true);

      const handleToggleBicyLocations = () => {
        setShowBicyLocations(!showBicyLocations);
      };

      const [showElecLocations, setShowElecLocations] = useState(true);

      const handleToggleElecLocations = () => {
        setShowElecLocations(!showElecLocations);
      };
      
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
            <Marker
              position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }}
            />
          )}

          {/* JSON 데이터의 위치를 마커로 표시 */}
          {showBicyLocations && bicylocations.map((location) => (
            <Marker
              key={location.kioskNo}
              position={{ lat: parseFloat(location.laCrdnt), lng: parseFloat(location.loCrdnt) }}
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png' }}
            />
          ))}
          {showElecLocations && eleclocations.map((location) => (
            <Marker
              key={location.cpId}
              position={{ lat: parseFloat(location.lat), lng: parseFloat(location.longi) }}
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png' }}
            />
          ))}
        </GoogleMap>
      </View>
      <View>
        <div onClick={handleToggleBicyLocations} style={{ cursor: 'pointer', color: 'blue' }}>
          Toggle Bicy Locations
        </div>
        <div onClick={handleToggleElecLocations} style={{ cursor: 'pointer', color: 'blue' }}>
          Toggle Elec Locations
        </div>
      </View>
    </LoadScript>
    )
}

export default App
