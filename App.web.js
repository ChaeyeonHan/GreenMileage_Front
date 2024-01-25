import React, { Component } from 'react'
import {View, Text, Switch} from 'react-native-web'
import Header from './header'
import Map from './Map.web'
import Main from './Main.web'
import Campaign from './campaign'
import Products from './products'
import Login from './Login'
import Signup from './Signup'
import Page from './page'
import Chat from './chatting'
import Ex from './ex'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const App = () => {
  return (
    <div className='App' style={styles.container}>
			<BrowserRouter>
        <Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/campaign" element={<Campaign />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/mypage" element={<Page />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/ex" element={<Ex />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F0E2',
    height: `${Dimensions.get('window').height}px`
  }
});


export default App;
