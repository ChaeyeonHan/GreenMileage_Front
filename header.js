// Header.js (예시)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigate  } from 'react-router-dom';
import loginImage from './images/userLogin.png';
import signupImage from './images/register_login_signup_icon_219991.png';

const Header = () => {

  const [showSubMenu, setShowSubMenu] = useState(true);
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState('HOME');
  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
    if (menuName === 'HOME') {
      navigate('/');
    }
    if (menuName === 'MAP') {
      navigate('/map'); // 'MAP'을 누르면 /map 경로로 이동합니다.
    }
    if (menuName === 'SHOP') {
      navigate('/shop');
    }
    if (menuName === 'CAMPAIGN') {
      navigate('/campaign');
    }
    if (menuName === 'PRODUCTS') {
      navigate('/products');
    }
    if (menuName === 'MY PAGE') {
      navigate('/mypage');
    }
  };

  return (
    <nav style={styles.container}>
      {/* <li><Link to='/login' style={styles.menuItem}>Login</Link></li>
        <li><Link to='/signup' style={styles.menuItem}>Signup</Link></li> */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
           {/* 로그인 버튼 */}
          <TouchableOpacity onPress={() => navigate('/login')}>
            <Image source={loginImage} style={styles.buttonImage} />
          </TouchableOpacity>
          {/* 회원가입 버튼 */}
          <TouchableOpacity onPress={() => navigate('/signup')}>
            <Image source={signupImage} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>GreenMileage</Text>
        <View style={styles.rightSection}>
          <View style={styles.searchSection}>
            <Icon name="search-outline" size={20} color="#000" style={styles.searchIcon}/>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#000" // 플레이스홀더 텍스트 색상을 검정으로 설정
            />
          </View>
        </View>
      </View>
      <View style={styles.menu}>
        {['HOME', 'MAP', 'CAMPAIGN', 'PRODUCTS', 'MY PAGE'].map((menuName) => (
          <TouchableOpacity
            key={menuName}
            onPress={() => handleMenuClick(menuName)}
            style={[
              styles.menuItem,
              selectedMenu === menuName && styles.menuItemSelected,
              {fontSize: 30},
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
    paddingTop: 40,
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10, // 여백을 줄여 텍스트가 흰색 영역 밖으로 나가지 않도록 조정
    height: 40,
    width: 220, // 너비를 조정하여 아이콘과 텍스트 필드를 모두 포함할 수 있도록 합니다.
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 1, // 텍스트 입력 부분의 내부 좌우 패딩을 조정합니다.
    borderWidth: 0, // 텍스트 필드의 테두리를 제거합니다.
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginRight: 10,
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