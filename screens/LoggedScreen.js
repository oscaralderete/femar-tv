import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// context
import AppContext from "../context/AppContext";

// screens
import MenuScreen from "./MenuScreen";

import LiveSeriesVodScreen from "./LiveSeriesVodScreen";

import LiveListScreen from "./LiveListScreen";

import LiveVideoScreen from "./LiveVideoScreen";

import SeriesListScreen from "./SeriesListScreen";

import SeriesSeasonsScreen from "./SeriesSeasonsScreen";

import SeriesVideoScreen from './SeriesVideoScreen';

import VodListScreen from "./VodListScreen";

import VodDetailsScreen from "./VodDetailsScreen";

import VodVideoScreen from "./VodVideoScreen";

import LogoutScreen from "./LogoutScreen";

const Stack = createNativeStackNavigator();

export default function LoggedScreen({ user, logoutUser }) {
  const commonOptions = {
    headerTintColor: "#fff",
  };

  return (
    <AppContext.Provider value={{ user, logoutUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Menu'>
          <Stack.Screen
            name='Menu'
            component={MenuScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Category'
            component={LiveSeriesVodScreen}
            options={commonOptions}
          />
          <Stack.Screen
            name='Logout'
            component={LogoutScreen}
            options={commonOptions}
          />
          <Stack.Screen
            name='Live'
            component={LiveListScreen}
            options={commonOptions}
          />
          <Stack.Screen
            name='LiveVideo'
            component={LiveVideoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Series'
            component={SeriesListScreen}
            options={commonOptions}
          />
          <Stack.Screen
            name='SeriesSeasons'
            component={SeriesSeasonsScreen}
            options={commonOptions}
          />
          <Stack.Screen
            name='SeriesVideo'
            component={SeriesVideoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Vod'
            component={VodListScreen}
            options={commonOptions}
          />
          <Stack.Screen
            name='VodDetails'
            component={VodDetailsScreen}
            options={commonOptions}
          />
          <Stack.Screen
            name='VodVideo'
            component={VodVideoScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
