import { useEffect, useState, useContext, useRef } from "react";

import { useKeepAwake } from "expo-keep-awake";

import { Dimensions, StyleSheet } from "react-native";

import { ResizeMode } from "expo-av";

import * as ScreenOrientation from "expo-screen-orientation";

import { setStatusBarHidden } from "expo-status-bar";

import VideoPlayer from "expo-video-player";

import AppContext from "../context/AppContext";

import {
  CenteredFullView,
  dimensions,
  Loader,
  UnavailableStream,
} from "../theme/Components";

export default function VodVideoScreen({ navigation, route }) {

  useKeepAwake();
  
  const user = useContext(AppContext).user;

  const item = route.params;

  const [inFullscreen, setInFullsreen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const refVideo = useRef(null);

  const setOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  const movieurl = `${user.apiUrl}movie/${user.username}/${user.password}/${item.stream_id}.${item.container_extension}`

  useEffect(() => {
    let cleanUp = false;

    return () => {
      setOrientation();
      cleanUp = !cleanUp;
    };
  }, []);

  return (
    <>
      <CenteredFullView>
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: movieurl
            },
            ref: refVideo,
            debug: true,
            onLoad: () => {
              setLoading(false);
            },
            onError: (error) => {
              setError(true);
            },
          }}
          fullscreen={{
            inFullscreen: inFullscreen,
            enterFullscreen: async () => {
              setStatusBarHidden(true, "fade");
              setInFullsreen(!inFullscreen);
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
              );
              refVideo.current.setStatusAsync({
                shouldPlay: true,
              });
            },
            exitFullscreen: async () => {
              setStatusBarHidden(false, "fade");
              setInFullsreen(!inFullscreen);
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
              );
            },
          }}
          style={{
            videoBackgroundColor: "#000",
            height: inFullscreen ? Dimensions.get("window").width : 300,
            width: inFullscreen
              ? Dimensions.get("window").height
              : Dimensions.get("window").width,
          }}
        />
      </CenteredFullView>
      {loading && <Loader />}
      {error && (
        <UnavailableStream
          navigation={navigation}
          label='Esta película no está disponible por ahora'
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: dimensions.backgroundColor,
    opacity: 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
});
