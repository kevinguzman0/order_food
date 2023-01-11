import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ButtonTransparent = ({ handleSubmit, text, stylesText }) => {
  return (
    <TouchableOpacity onPress={handleSubmit} style={{ marginTop: 20 }}>
      <Text style={{ ...styles.text, ...stylesText }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "#ff4e00",
    fontSize: 18,
    fontWeight: "800",
  },
});
