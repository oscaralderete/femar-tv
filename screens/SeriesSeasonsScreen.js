import {useState, useEffect, useContext, useRef} from 'react'

import { ImageBackground, StyleSheet, ScrollView, FlatList, View } from "react-native";

import AppContext from '../context/AppContext';

import {
  dimensions,
  FullView,
  Texto,
  Row,
  Column,
  Br,
  theme,
  Select,
  Loader,
  Separator
} from "../theme/Components";

import SerieSeasonItem from '../components/SerieSeasonItem';

import {getFormattedDate} from '../theme/Constants'

export default function SeriesSeasonsScreen({navigation, route}) {

  const item = route.params;

  const user = useContext(AppContext).user

  const [info, setInfo] = useState({})

  const [episodes, setEpisodes] = useState({})

  const [seasons, setSeasons] = useState([])

  const [availableSeasons, setAvailableSeasons] = useState(0)

  const [currentSeason, setCurrentSeason] = useState(1)

  const [loading, setLoading] = useState(true)

  function handleSelect(int){
    setCurrentSeason(int)
  }

  function showEpisode(item){
    navigation.navigate('SeriesVideo', item)
  }

  useEffect(() => {
    let cleanUp = false;

    navigation.setOptions({
      title: `${theme.labelSeries}: ${item.name}`,
      headerStyle: {
        backgroundColor: theme.icoSeriesColor,
      },
    })

    // series info: player_api.php?username=X&password=X&action=get_series_info&series_id=X
    fetch(`${user.apiUrl}player_api.php?username=${user.username}&password=${user.password}&action=get_series_info&series_id=${item.series_id}`)
      .then(res => res.json())
      .then(data => {
        setInfo({
          ...data.info,
          releaseDate: getFormattedDate(data.info.releaseDate)
        })
        setEpisodes(data.episodes)
        setSeasons(data.seasons)
        setAvailableSeasons(Object.keys(data.episodes).length)
        setLoading(false)
      })
      .catch(err => console.error(err))

    return () => {
      cleanUp = !cleanUp
    }
  }, [])

  return (
    <FullView>
      <ImageBackground
        source={{ uri: item.cover }}
        style={styles.bgImage}>
        <View style={styles.container}>
            <FlatList
              ListHeaderComponent={
                <ScrollView>
                  <Row>
                    <Column>
                      <Texto type='small' bold>
                        Rating:
                      </Texto>
                      <Texto type='small'>{info.rating}</Texto>
                    </Column>
                    <Column>
                      <Texto type='small' bold>
                        Temporadas:
                      </Texto>
                      <Texto type='small'>{Object.keys(episodes).length}</Texto>
                    </Column>
                  </Row>
    
                  <Row>
                    <Texto type='small' bold>
                      Lanzamiento:
                    </Texto>
                    <Texto> </Texto>
                    <Texto type='small'>{info.releaseDate}</Texto>
                  </Row>
    
                  <Row>
                    <Texto type='small' bold>
                      Género:
                    </Texto>
                    <Texto> </Texto>
                    <Texto type='small'>{info.genre}</Texto>
                  </Row>
    
                  <Texto type='small' bold>
                    Elenco:
                  </Texto>
                  <Texto type='small'>{info.cast}</Texto>
                  <Br />
    
                  <Texto type='h2' bold>
                    {info.name}
                  </Texto>
                  <Br />
      
                  <Row>
                    <Texto>{info.plot}</Texto>
                  </Row>

                  {seasons.length > 0 && <Select
                    season={currentSeason}
                    seasons={availableSeasons}
                    onPress={handleSelect}
                  />}
                  <Br />
                </ScrollView>
              }
              data={episodes[currentSeason]}
              ItemSeparatorComponent={Separator}
              renderItem={({item}) => <SerieSeasonItem showEpisode={showEpisode} navigation={navigation} item={item}/>}
            />

        </View>
      </ImageBackground>
      {loading && <Loader />}
    </FullView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    display: "flex",
    height: "100%",
    flex: 1,
    backgroundColor: "red",
  },
  bgImage: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    alignSelf: "stretch",
  },
  container: {
    backgroundColor: dimensions.backgroundColorAlpha,
    flex: 1,
    padding: dimensions.padding,
  },
});