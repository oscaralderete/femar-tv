import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import LoggedScreen from "./screens/LoggedScreen";

import LoginScreen from "./screens/LoginScreen";

import LoaderScreen from "./screens/LoaderScreen";

import { localStorage } from "./theme/Constants";

export default function App() {
  const [currentView, setCurrentView] = useState(<LoaderScreen />);

  const checkUser = async () => {
    const str = await AsyncStorage.getItem(localStorage.key);
    const user = JSON.parse(str);

    if (user && user.hasOwnProperty("username")) {
      setCurrentView(
        <LoggedScreen
          user={user}
          setCurrentView={setCurrentView}
          createUser={createUser}
          logoutUser={logoutUser}
        />
      );
    } else {
      setCurrentView(<LoginScreen createUser={createUser} />);
    }
  };

  const createUser = async (user) => {
    const str = await AsyncStorage.setItem(
      localStorage.key,
      JSON.stringify(user)
    );

    setCurrentView(
      <LoggedScreen
        user={user}
        setCurrentView={setCurrentView}
        createUser={createUser}
        logoutUser={logoutUser}
      />
    );
  };

  const logoutUser = async () => {
    const str = await AsyncStorage.removeItem(localStorage.key);

    setCurrentView(<LoginScreen createUser={createUser} />);
  };

  useEffect(() => {
    // useEffect clean up, the variable isLogged doesn't mean anything
    let isLogged = false;
    checkUser();
    return () => {
      isLogged = true;
    };
  }, []);

  return <>{currentView}</>;
}
