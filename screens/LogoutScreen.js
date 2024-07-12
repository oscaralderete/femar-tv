import { useEffect, useContext } from "react";

import {View, StyleSheet} from 'react-native'

import { SvgXml } from "react-native-svg";

import AppContext from "../context/AppContext";

import {
  dimensions,
  CenteredFullView,
  IconButton,
  Texto,
  Br,
  Container,
  Center,
  Fab,
} from "../theme/Components";

import Credits from "../components/Credits";

import { power_off } from "../svg/Images";

export default function LogoutScreen({ navigation }) {
  const value = useContext(AppContext);

  useEffect(() => {
    navigation.setOptions({
      title: "Cerrar sesión",
      headerStyle: {
        backgroundColor: dimensions.themeColor,
      },
    });
  }, []);

  return (
    <CenteredFullView>
      <Container width={dimensions.loginFormWidth}>
        <Center>
          <Texto type='small' center>Si cierras la sesión la próxima vez que quieras usar nuestra app deberás volver a ingresar tu nombre de usuario y contraseña.</Texto>
        </Center>

        <Br />
        <IconButton
          label='Confirmar cerrar sesión'
          rounded
          onPress={() => value.logoutUser()}>
          <SvgXml xml={power_off} height={20} width={20} />
        </IconButton>
      </Container>

      <View style={styles.credits}>
        <Credits />
      </View>
    </CenteredFullView>
  );
}

const styles = StyleSheet.create({
  credits: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
})