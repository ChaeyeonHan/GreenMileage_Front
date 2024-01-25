import React, { useState, useEffect } from 'react'
import {View, Text, Switch} from 'react-native-web'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {GOOGLE_MAPS_API_KEY} from '@env';

function Map() {
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
            const response = await fetch('http://localhost:3000/bicycle/info');
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
            const response = await fetch('http://localhost:3000/electric_car/info');
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
            console.log("Fsef");
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

      const handleButtonClick = () => {
        // 페이지를 새로고침
        window.location.reload();
      };

      const buttonStyle = {
        backgroundColor: 'rgba(255,255,255,0.8)', // 버튼의 배경색을 약간 투명하게 설정
        padding: '10px',
        margin: '0 20px', // 좌우 마진
        cursor: 'pointer',
        color: 'blue',
        borderRadius: '5px',
    };

    const buttonContainerStyle = {
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'row',
        top:580 // 추가된 부분
    };
      
    return (
        <LoadScript

            googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <div className="text-container">자전거, 전기차 등을 통해 이동하며 탄소 발자국을 줄여보아요</div>
          <View style={{ position: 'relative', width: '100%', height: '100%' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentPosition || defaultCenter}
          zoom={16}
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
      <View style={buttonContainerStyle}>
          <Text onClick={handleToggleBicyLocations} style={buttonStyle}>
              자전거 위치
          </Text>
          <Text onClick={handleToggleElecLocations} style={buttonStyle}>
              전기 자동차 충전소 위치
          </Text>
          <Text onClick={handleButtonClick} style={buttonStyle}>
              현재 위치
          </Text>
      </View>
    </View>  
  </LoadScript>
  )
}

export default Map
