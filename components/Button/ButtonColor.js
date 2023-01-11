import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ButtonColor = ({
  handleSubmit,
  text,
  disabled,
  stylesButton,
  stylesText,
}) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      disabled={disabled}
      style={{ ...styles.button, ...stylesButton }}
    >
      <Text style={{ ...styles.text, ...stylesText }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff4e00",
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
