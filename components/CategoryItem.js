import { useEffect, useState } from "react";

import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { dimensions } from "../theme/Components";

export default function CategoryItem({ item, action, onPress, switchFav }) {
  //const xml =
  //  action === "live" ? ico_live : action === "series" ? ico_series : ico_vod;

  const [imgUri, setImgUri] = useState(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let isLoaded = false;

    if (action === "live") {
      setImgUri(require(`../assets/img/ico_live.jpg`));
      setWidth(26);
    } else if (action === "series") {
      setImgUri(require(`../assets/img/ico_series.jpg`));
      setWidth(20);
    } else {
      setImgUri(require(`../assets/img/ico_vod.jpg`));
      setWidth(21);
    }

    return () => {
      isLoaded = !isLoaded;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={imgUri} style={{ ...styles.ico, width }} />
      <TouchableOpacity style={styles.touchable} onPress={() => onPress(item)}>
        <Text numberOfLines={1} style={styles.text}>
          {item.category_name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: dimensions.padding,
    flexDirection: "row",
    alignItems: "center",
  },
  touchable: {
    flex: 1,
  },
  text: {
    color: dimensions.color,
    fontSize: dimensions.fontSize,
    marginLeft: dimensions.padding,
  },
  ico: {
    height: dimensions.fontSize,
  },
});
