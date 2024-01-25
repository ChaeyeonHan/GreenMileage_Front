import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [campaigns, setCampaign] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/campaign/info');
      const data = await response.json();

      const dataPoints = data.map(item => ({ ...item }));
      setCampaign(dataPoints);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataAndReturn = async () => {
      await fetchData();
      console.log("Data fetching completed!");
    };

    fetchDataAndReturn();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevCurrentSlide) =>
        prevCurrentSlide === campaigns.length - 1 ? 0 : prevCurrentSlide + 1
      );
    }, 3000); // Change campaign every 3 seconds
    return () => clearInterval(interval);
  }, [campaigns]);

  return (
    <ScrollView style={styles.container}>
      <div style={{fontSize: '30px'}}>친환경적인 활동을 통해 포인트를 적립하세요</div>
      <div> 현재 진행중인 캠페인 </div>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.card}>
            <Image source={{ uri: campaigns[currentSlide].image }} style={styles.featuredImage} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{campaigns[currentSlide].title}</Text>
              <Text
                style={styles.readMoreText}
                onPress={() => {
                  window.open(campaigns[currentSlide].link, '_blank');
                }}
              >
                Read More
              </Text>
            </View>
          </View>
          <View style={styles.paginationDots}>
            {campaigns.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, currentSlide === index && styles.activeDot]}
                onPress={() => setCurrentSlide(index)}
              />
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
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', // 이미지와 텍스트를 수직 중앙 정렬
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  readMoreText: {
    color: '#1d71cb',
    marginTop: 10,
    textDecorationLine: 'underline', // 밑줄 추가
    cursor: 'pointer', // 마우스 hover 시 포인터로 변경
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featuredImage: {
    borderRadius: 8,
    marginLeft: 20,
    marginTop: 20,
    width: '40%', // 이미지 크기 조절
    height: 400, // 이미지 높이 조절
    resizeMode: 'cover', // 이미지 크기 조절 시 유용한 옵션
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
});

export default Main;