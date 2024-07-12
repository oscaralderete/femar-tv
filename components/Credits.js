import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";

import { SvgXml } from "react-native-svg";

import { oa_logo } from "../svg/Images";

export default function Credits() {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL("https://oscaralderete.com")}>
      <View style={styles.credits}>
        <Text style={styles.text}>Programación y desarrollo: </Text>
        <SvgXml xml={oa_logo} width={36} height={20} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  credits: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    opacity: 0.5,
    paddingBottom: 10,
  },
});
