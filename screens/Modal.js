import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ButtonColor } from "../components/Button/ButtonColor";
import { ButtonTransparent } from "../components/Button/ButtonTransparent";
import useFetch from "../hooks/useFetch";

export default ({ navigation }) => {
  const id = navigation.getParam("_id");
  const { loading, data } = useFetch(
    `https://serverless-kevinguzman0.vercel.app/api/meals/${id}`
  );

  const handleSubmit = () => {
    AsyncStorage.getItem("token").then((x) => {
      if (x) {
        fetch("https://serverless-kevinguzman0.vercel.app/api/orders/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: x,
          },
          body: JSON.stringify({
            meal_id: id,
          }),
        }).then((x) => {
          if (x.status !== 200) {
            return alert("Order rejected");
          }
          alert("Successfully generated order");
          navigation.navigate("Meals");
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Cargando...</Text>
      ) : (
        <>
          <Text style={[styles.text, styles.bold]}>{data.name}</Text>
          <Text style={[styles.text, styles.space]}>{data.desc}</Text>

          <ButtonColor
            text="Accept Order"
            handleSubmit={handleSubmit}
            stylesButton={{ backgroundColor: "#fff", width: 150, height: 50 }}
            stylesText={{ color: "#ff4e00" }}
          />
          <ButtonTransparent
            text="Close"
            handleSubmit={() => navigation.navigate("Meals")}
            stylesText={{ color: "#fff" }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4e00",
    borderRadius: 5,
    margin: 10,
    marginTop: 50,
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textTransform: "capitalize",
  },
  bold: {
    fontWeight: "bold",
  },
  space: {
    marginBottom: 20,
  },
});
