// Header.js (예시)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {

  const [showSubMenu, setShowSubMenu] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('HOME');
  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  return (
    <nav style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GreenMileage</Text>
        <View style={styles.searchSection}>
          <TextInput
          style={styles.searchInput}
          placeholder="Search"/>
          <Icon name="search-outline" size={30} color="#000" style={styles.searchIcon}/>
          <ion-icon name="search-outline"></ion-icon>
        </View>
      </View>
      <View style={styles.menu}>
        {['HOME', 'ex', 'MAP', 'SHOP', 'My PAGE'].map((menuName) => (
          <TouchableOpacity
            key={menuName}
            onPress={() => handleMenuClick(menuName)}
            style={[
              styles.menuItem,
              selectedMenu === menuName && styles.menuItemSelected,
            ]}
          >
          <Text style={[
            styles.menuText,
            selectedMenu === menuName && styles.menuTextSelected
          ]}>
          {menuName}
          </Text>
          </TouchableOpacity>
          ))}
      </View>
    </nav>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  menuItemSelected: {
    backgroundColor: '#89B998', // 버튼 선택시 배경색상
    color: '#FFFFFF', // 버튼 선택시 글자색상
  },
  menuTextSelected: {
    color: '#FFFFFF', // 버튼 선택시 글자색상
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
    zIndex: 2000,
    backgroundColor: 'white'
  },
  dropdownItem: {
    padding: 10, // 패딩
    width: '400%',
    borderBottomWidth: 1, // 항목 사이의 구분선
    borderBottomColor: '#e7e7e7', // 구분선 색상
    fontSize: 16, // 글씨 크기
    alignSelf: 'flex-start', // 각 항목의 너비를 내용에 맞게 조절

  },shopContainer: {
    position: 'relative', // 드롭다운을 포함할 컨테이너에 상대적 위치 지정
  },
});

export default Header;