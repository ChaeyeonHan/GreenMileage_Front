import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [campaigns, setCampaign] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:3000/campaign/info');
        const data = await response.json();

        const dataPoints = data.map(item => ({...item}));
        setCampaign(dataPoints);
        const uniqueImages = dataPoints;
        setImages(uniqueImages);
        setLoading(false);
        resolve(uniqueImages);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        reject(error);
      }
    });
  };

  useEffect(() => {
    const fetchDataAndReturn = async () => {
      await fetchData();
      // fetchData가 완료된 후에 다시 반환
      console.log("Data fetching completed!");
    };

    fetchDataAndReturn();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevCurrentSlide) => 
        prevCurrentSlide === images.length - 1 ? 0 : prevCurrentSlide + 1
      );
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ display: index === currentSlide ? 'flex' : 'none' }}>
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
                <div>{item.title}</div>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
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
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0E2',
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
  // ... (나머지 스타일 정의)
});

export default Main;
