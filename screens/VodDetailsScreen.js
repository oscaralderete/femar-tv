import { useEffect, useState, useContext } from "react";

import { ImageBackground, StyleSheet, ScrollView } from "react-native";

import { SvgXml } from "react-native-svg";

import AppContext from "../context/AppContext";

import {
  dimensions,
  FullView,
  Texto,
  Row,
  Column,
  Br,
  theme,
  IconButton,
} from "../theme/Components";

import {getFormattedDate} from '../theme/Constants'

import { ico_vod } from "../svg/Images";

export default function VodDetailsScreen({ navigation, route }) {
  const { item, category_name } = route.params;

  const user = useContext(AppContext).user;

  const [info, setInfo] = useState({});

  function showVideo() {
    navigation.navigate("VodVideo", item);
  }

  useEffect(() => {
    let cleanUp = false;

    navigation.setOptions({
      title: `${theme.labelVod}: ${item.name}`,
      headerStyle: {
        backgroundColor: theme.icoVodColor,
      },
    });

    fetch(
      `${user.apiUrl}player_api.php?username=${user.username}&password=${user.password}&action=get_vod_info&vod_id=${item.stream_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setInfo({
          ...data.info,
          releasedate: getFormattedDate(data.info.releasedate),
        });
      })
      .catch((err) => console.error(err));

    return () => {
      cleanUp = !cleanUp;
    };
  }, []);

  return (
    <FullView>
      <ImageBackground
        source={{ uri: item.stream_icon }}
        style={styles.bgImage}>
        <ScrollView style={styles.container}>
          <Row>
            <Column>
              <Texto type='small' bold>
                Director:
              </Texto>
              <Texto type='small'>{info.director}</Texto>
            </Column>
            <Column>
              <Texto type='small' bold>
                Fecha:
              </Texto>
              <Texto type='small'>{info.releasedate}</Texto>
            </Column>
          </Row>

          <Row>
            <Column>
              <Texto type='small' bold>
                Rating:
              </Texto>
              <Texto type='small'>{info.rating}</Texto>
            </Column>
            <Column>
              <Texto type='small' bold>
                Duración:
              </Texto>
              <Texto type='small'>{info.duration}</Texto>
            </Column>
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
          <Texto type='small'>{info.actors}</Texto>
          <Br />

          <IconButton
            rounded
            backgroundColor={dimensions.colorGreen}
            onPress={showVideo}>
            <SvgXml
              xml={ico_vod}
              height={dimensions.fontSize * 0.8}
              width={dimensions.fontSize * 0.8}
            />
            <Texto> Ver película</Texto>
          </IconButton>
          <Br />

          <Texto type='h2' bold>
            {info.name}
          </Texto>
          <Br />

          <Row>
            <Texto>{info.plot}</Texto>
          </Row>

          <Row>
            <Texto type='small' bold>
              País:
            </Texto>
            <Texto type='small'> {info.country}</Texto>
          </Row>

          <Row>
            <Texto type='small' bold>
              Categoría:
            </Texto>
            <Texto type='small'> {category_name}</Texto>
          </Row>
          <Br />
        </ScrollView>
      </ImageBackground>
    </FullView>
  );
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
