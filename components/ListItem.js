import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import {MaterialIcons} from '@expo/vector-icons';

import { dimensions } from "../theme/Components";

export default function ListItem({ item, showVideo, addToFavs }) {
  let image = (
    <Image
      style={styles.image}
      source={require("../assets/img/no_image.jpg")}
    />
  );

  if (item.cover && item.cover !== "") {
    image = <Image source={{ uri: item.cover }} style={styles.image} />;
  }
  if (item.stream_icon && item.stream_icon !== "") {
    image = <Image source={{ uri: item.stream_icon }} style={styles.image} />;
  }

  return (
    <View style={styles.listItem}>
      <TouchableOpacity style={styles.bgImage} onPress={() => showVideo(item)}>
        {image}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showVideo(item)}>
        <Text
          numberOfLines={1}
          style={{ fontSize: dimensions.small, color: dimensions.color }}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addToFavs(item)}>
        <View style={styles.fav}>
          <Text
            style={{ fontSize: dimensions.small, color: favColor }}>
            Favorito
          </Text>
          <MaterialIcons name="favorite" size={dimensions.small} color={favColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const favColor = dimensions.backgroundColor;

const styles = StyleSheet.create({
  listItem: {
    width: "50%",
    alignItems: "center",
    marginBottom: dimensions.padding * 2,
  },
  bgImage: {
    backgroundColor: "#ccc",
    width: dimensions.channelImageSize,
    height: dimensions.channelImageSize * 1.5,
    borderRadius: dimensions.borderRadius,
  },
  image: {
    width: dimensions.channelImageSize,
    height: null,
    flex: 1,
    resizeMode: "contain",
    borderRadius: dimensions.borderRadius,
  },
  fav: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: dimensions.padding,
    backgroundColor: dimensions.colorYellow,
    height: dimensions.padding * 2,
    borderRadius: dimensions.padding,
    paddingHorizontal: dimensions.padding
  }
});
