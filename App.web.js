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
      
      const [bicylocations, setbicyLocations] = useState([
        {
          kioskNo: '202',
          year: '2015',
          signgu: '서구',
          lcNm: '도안초교',
          lcDc: '',
          adres: '서구 도안동 1364',
          dfrCo: '11',
          rm: '`15.12.1 개설',
          kioskId: '9D1086000000CA',
          commWire: '',
          wireNo: '',
          loCrdnt: '127.344013',
          laCrdnt: '36.320531',
        },
        {
          kioskNo: '201',
          year: '2015',
          signgu: '유성구',
          lcNm: '노은3주민센터',
          lcDc: '',
          adres: '유성구 지족동 1024-2',
          dfrCo: '13',
          rm: '`15.12.1 개설',
          kioskId: '9D2086000000C9',
          commWire: '',
          wireNo: '',
          loCrdnt: '127.308372',
          laCrdnt: '36.386848'
        },
        // ... 나머지 위치 정보들
      ]);

      const [currentPosition, setCurrentPosition] = useState(null);

      const [eleclocations, setelecLocations] = useState([
        {
          addr: '대전광역시 유성구 가정동 161 지상 주차장',
          chargeTp: '2',
          cpId: 10753,
          cpNm: '급속01',
          cpStat: '1',
          cpTp: '7',
          csId: 4546,
          csNm: '한국전자통신연구원',
          lat: '36.3830490557167',
          longi: '127.366523563737',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 가정동 161 지상 주차장',
          chargeTp: '2',
          cpId: 10754,
          cpNm: '급속02',
          cpStat: '1',
          cpTp: '7',
          csId: 4546,
          csNm: '한국전자통신연구원',
          lat: '36.3830490557167',
          longi: '127.366523563737',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 어은동 44 교양분관 뒤 주차장',
          chargeTp: '2',
          cpId: 11493,
          cpNm: '급속02',
          cpStat: '1',
          cpTp: '7',
          csId: 5037,
          csNm: '카이스트',
          lat: '36.374542582285265',
          longi: '127.36033360854752',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 어은동 45 한국항공우주연구원 정문 앞 주차장',
          chargeTp: '2',
          cpId: 11497,
          cpNm: '급속04',
          cpStat: '1',
          cpTp: '7',
          csId: 5038,
          csNm: '한국항공우주연구원',
          lat: '36.37535975985901',
          longi: '127.35603721616891',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 어은동 45 한국항공우주연구원 정문 앞 주차장',
          chargeTp: '2',
          cpId: 11496,
          cpNm: '급속03',
          cpStat: '1',
          cpTp: '7',
          csId: 5038,
          csNm: '한국항공우주연구원',
          lat: '36.37535975985901',
          longi: '127.35603721616891',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 어은동 45 한국항공우주연구원 정문 앞 주차장',
          chargeTp: '2',
          cpId: 11495,
          cpNm: '급속02',
          cpStat: '1',
          cpTp: '7',
          csId: 5038,
          csNm: '한국항공우주연구원',
          lat: '36.37535975985901',
          longi: '127.35603721616891',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 어은동 45 한국항공우주연구원 정문 앞 주차장',
          chargeTp: '2',
          cpId: 11494,
          cpNm: '급속01',
          cpStat: '1',
          cpTp: '7',
          csId: 5038,
          csNm: '한국항공우주연구원',
          lat: '36.37535975985901',
          longi: '127.35603721616891',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 원신흥동 560 원신흥도서관 주차장',
          chargeTp: '2',
          cpId: 11490,
          cpNm: '급속01',
          cpStat: '1',
          cpTp: '7',
          csId: 5035,
          csNm: '원신흥도서관',
          lat: '36.337570421153195',
          longi: '127.3372930295452',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 구암동 621-7 구암도서관 주차장',
          chargeTp: '2',
          cpId: 11491,
          cpNm: '급속01',
          cpStat: '1',
          cpTp: '7',
          csId: 5036,
          csNm: '구암평생학습센터',
          lat: '36.34939169302464',
          longi: '127.3300025999592',
          statUpdatetime: '2022-06-08'
        },
        {
          addr: '대전광역시 유성구 문지동 103-6 학부동 뒤편 지상주차장',
          chargeTp: '2',
          cpId: 11499,
          cpNm: '급속01',
          cpStat: '1',
          cpTp: '7',
          csId: 5072,
          csNm: '카이스트 문지캠퍼스',
          lat: '36.39350047321369',
          longi: '127.40045375756141',
          statUpdatetime: '2022-06-08'
        }
      ]);

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
            <Marker
              position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }}
            />
          )}

          {/* JSON 데이터의 위치를 마커로 표시 */}
          {bicylocations.map((location) => (
            <Marker
              key={location.kioskNo}
              position={{ lat: parseFloat(location.laCrdnt), lng: parseFloat(location.loCrdnt) }}
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
            />
          ))}
          {eleclocations.map((location) => (
            <Marker
              key={location.addr}
              position={{ lat: parseFloat(location.lat), lng: parseFloat(location.longi) }}
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png' }}
            />
          ))}
        </GoogleMap>
      </View>
    </LoadScript>
    )
}

export default App