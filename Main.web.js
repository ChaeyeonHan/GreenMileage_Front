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
    backgroundColor: '#F8F0E2',
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
  featuredImage: {
    marginTop: 80,
    marginLeft: 300,
    width: '100%',
    height: 300,
    alignItems: 'center',
    zIndex: 1
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