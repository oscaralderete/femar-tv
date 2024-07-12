import { StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function MenuItem({ children, backgroundColor, action }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Category", { action })}
      style={{ ...styles.block, backgroundColor }}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 30,
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 20,
  },
});
