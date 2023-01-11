import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { ButtonColor } from "../components/Button/ButtonColor";
import { ButtonTransparent } from "../components/Button/ButtonTransparent";
import useForm from "../hooks/useForm";

export default ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    fetch("https://serverless-kevinguzman0.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(values),
    })
      .then((x) => x.text())
      .then((x) => {
        try {
          return JSON.parse(x);
        } catch {
          throw x;
        }
      })
      .then((x) => {
        AsyncStorage.setItem("token", x.token);
        navigation.navigate("Meals");
      })
      .catch((e) => Alert.alert("Error", "User and/or Password incorrect"));
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          autoCapitalize="none"
          value={inputs.email}
          onChangeText={subscribe("email")}
          style={styles.input}
          placeholder="Email"
        />

        <TextInput
          autoCapitalize="none"
          value={inputs.password}
          onChangeText={subscribe("password")}
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
        />

        <ButtonColor
          handleSubmit={handleSubmit}
          text={"Entry"}
          disable={
            initialState.email === "" || initialState.password === ""
              ? true
              : false
          }
        />
        <ButtonTransparent
          handleSubmit={() => navigation.navigate("Register")}
          text={"Register"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight: "900",
    color: "#ff4e00",
  },
  container: {
    flex: 1,
    backgroundColor: "#ff4e00",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  input: {
    height: 40,
    alignSelf: "stretch",
    borderBottomColor: "#ff4e00",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  box: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
