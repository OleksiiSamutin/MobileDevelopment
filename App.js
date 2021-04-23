import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './Views/Home';
import DrawingView from './Views/DrawingView'
import MoviesView from './Views/MoviesView';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"

      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
      barStyle={{ backgroundColor: 'black' }}
      activeColor="#ffff00"
      inactiveColor="#b0b01c"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Plots"
        component={DrawingView}
        options={{
          tabBarLabel: 'Plots',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-scatter-plot" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesView}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="filmstrip" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}