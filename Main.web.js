import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Icon from 'react-native-vector-icons/Ionicons';
import Cookies from 'js-cookie';

const images = [
  require('./images/image1.jpeg'),
  require('./images/image2.jpeg'),
  require('./images/image3.jpeg'),
  require('./images/image4.jpeg'),
  require('./images/image5.jpeg'),
];

const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSubMenu, setShowSubMenu] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevCurrentSlide) => 
        prevCurrentSlide === images.length - 1 ? 0 : prevCurrentSlide + 1
      );
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };



  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GreenMileage</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
          />
          {/* <Icon name="ios-search" size={30} color="white" style={{paddingRight:20, paddingLeft:20}}/> */}
          <Icon name="search-outline" size={30} color="#000" style={styles.searchIcon}/>

          <ion-icon name="search-outline"></ion-icon>
        </View>
      </View>
      <View style={styles.menu}>
        <li><Link to='/' style={styles.menuItem}>HOME</Link></li>
        <li><Link to='/map' style={styles.menuItem}>MAP</Link></li>
        <View style={styles.shopContainer}>
          <Text style={styles.menuItem} onPress={() => setShowSubMenu(!showSubMenu)}>
            SHOP
            {showSubMenu ? '▲' : '▼'} {/* 토글 아이콘 추가 */}
          </Text>
          {showSubMenu && (
            <View style={styles.dropdownMenu}>
              <Text style={styles.dropdownItem}>Products</Text>
              <Text style={styles.dropdownItem}>Campaign</Text>
            </View>
        )}
        </View>
        <li><Link to='/' style={styles.menuItem}>My PAGE</Link></li>
      </View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ display: index === currentSlide ? 'flex' : 'none' }}>
          <img src={item.default } alt="slide" style={styles.featuredImage} />
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const scrollTo = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
          if (scrollTo !== currentSlide) {
            setCurrentSlide(scrollTo);
          }
        }}
      />
      <View style={styles.paginationDots}>
        {images.map((_, index) => (
          <TouchableOpacity key={index} style={[styles.dot, currentSlide === index && styles.activeDot]} onPress={() => goToSlide(index)} />
        ))}
      </View>
      {/* ... Rest of your components ... */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 40, // Adjust this value for your header height
  },
  title: {
    marginLeft: 35,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    marginRight: 10,
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    position: 'relative'
  },
  menuItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shopContainer: {
    position: 'relative', // 드롭다운을 포함할 컨테이너에 상대적 위치 지정
  },
  subMenu: {
    paddingVertical: 10,
    paddingHorizontal: 20, // 필요에 따라 조정
    backgroundColor: '#f5f5f5', // 배경색 설정
  },
  subMenuItem: {
    fontSize: 16,
    paddingVertical: 5, // 상하 패딩
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: '100%',
    left: 0,
    transform: [{ translateX: -50 }], // 드롭다운 메뉴를 중앙 정렬하기 위한 설정
    borderColor: '#e7e7e7', // 테두리색
    borderWidth: 1, // 테두리 두께
    zIndex: 1000,
    backgroundColor: 'white'
  },
  dropdownItem: {
    padding: 10, // 패딩
    width: '400%',
    borderBottomWidth: 1, // 항목 사이의 구분선
    borderBottomColor: '#e7e7e7', // 구분선 색상
    fontSize: 16, // 글씨 크기
    alignSelf: 'flex-start', // 각 항목의 너비를 내용에 맞게 조절

  },
  featuredImage: {
    marginLeft: 100,
    width: '100%',
    height: 300,
    alignItems: 'center',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
  },
  // ... Rest of your styles ...
});

export default Main;