import React, { Component } from 'react'
import {View, Text, Switch} from 'react-native-web'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import {GOOGLE_MAPS_API_KEY} from '@env'
import Header from './header'
import Map from './Map.web'
import Main from './Main.web'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='App'>
			<BrowserRouter>
        <Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
          <Route path="/map" element={<Map />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
  );
};

export default App;
