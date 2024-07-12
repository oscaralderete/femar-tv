import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'

import { dimensions } from '../theme/Components'

export default function SerieSeasonItem({navigation, item, showEpisode}) {

  //const item = route.params

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => showEpisode(item)}>
        <ImageBackground
          source={require('../assets/img/no_image.jpg')}
          style={[styles.poster, styles.posterBg]}
        >
          <Image
            source={{ uri: item.info.movie_image }}
            style={styles.poster}
          />
          <Image
            source={require('../assets/img/play.png')}
            style={[styles.poster, styles.play]}
          />
        </ImageBackground>
      </TouchableOpacity>
      
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.plot, styles.yellow]}>Rating: {item.info.rating}</Text>
        <Text style={[styles.plot, styles.yellow]}>Duración: {item.info.duration}</Text>
        <Text style={styles.plot}>{item.info.plot}</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  posterBg:{
    position: 'relative',
  },
  poster:{
    width: dimensions.channelImageSize,
    height: dimensions.channelImageSize * 1.5,
    resizeMode: 'cover',
  },
  play: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  details:{
    marginLeft: dimensions.padding,
    flex: 1
  },
  title:{
    color: dimensions.color,
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1
  },
  plot:{
    color: dimensions.color,
  },
  yellow: {
    color: dimensions.colorYellow,
    fontWeight: 'bold'
  }
})