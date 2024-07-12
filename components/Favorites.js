import { StyleSheet, Text, View, FlatList } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import FavoriteItem from '../components/FavoriteItem';

import { dimensions } from '../theme/Components';

export default function Favorites({type, favorites, removeFromFavs}) {

  const navigation = useNavigation();

  function showVideo(item) {
    const screen = type === 'live' ? 'LiveVideo' : type === 'vod' ? 'VodVideo' : 'SeriesSeasons';
    navigation.navigate(screen, item);
  }

  return (
    <View>
      <Text style={styles.title}>Favoritos:</Text>
      <FlatList
        data={favorites}
        horizontal
        keyExtractor={(item) => {
          // switch between series_id / stream_id
          return type === 'series' ? item.series_id : item.stream_id;
        }}
        renderItem={({item}) => <FavoriteItem type={type} item={item} showVideo={showVideo} removeFromFavs={removeFromFavs} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: dimensions.color,
    paddingHorizontal: dimensions.padding,
  }
});