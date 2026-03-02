import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

import HomeScreen from './screens/HomeScreen';
import SongsScreen from './screens/SongsScreen';
import AdminPanel from './screens/AdminPanel';
import ChoirDashboard from './screens/ChoirDashboard';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isOffline, setOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Songs" component={SongsScreen} />
        <Drawer.Screen name="Choir Members" component={ChoirDashboard} />
        <Drawer.Screen name="Admin Login" component={AdminPanel} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}