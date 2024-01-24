import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Ex = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % 5); // 5개의 이미지를 순환
    }, 3000); // 3초마다 실행
    return () => clearInterval(interval);
  }, []);

  const Dot = ({ index }) => (
    <View style={[styles.dot, activeIndex === index && styles.activeDot]} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          {/* 여기에 로고 컴포넌트를 추가하세요 */}
        </View>
        <View style={styles.menu}>
          <TouchableOpacity><Text style={styles.menuText}>Home</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.menuText}>Plant</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.menuText}>Plant</Text></TouchableOpacity>
          <TextInput style={styles.search} placeholder="Search" />
        </View>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <View style={styles.slide}>
          <Text style={styles.slideText}>A Plant</Text>
          <Text style={styles.slideText}>Our Future Life</Text>
          <Image source={{ uri: 'your-image-url' }} style={styles.slideImage} />
        </View>
        {/* 여기에 추가 슬라이드를 반복하세요 */}
      </ScrollView>
      <View style={styles.dots}>
        {[...Array(5).keys()].map(i => (
          <Dot key={i} index={i} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0E2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    // 로고 스타일
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%', // 메뉴 버튼들의 전체 너비
  },
  menuText: {
    // 메뉴 텍스트 스타일
  },
  search: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
  slide: {
    // 슬라이드 스타일
  },
  slideText: {
    // 슬라이드 내 텍스트 스타일
  },
  slideImage: {
    // 이미지 스타일
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'grey',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});

export default Ex;
