import React from "react";
import { AsyncStorage, Button, Dimensions, StyleSheet, Text, View } from "react-native";
import useFetch from "../hooks/useFetch";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff4e00',
        borderRadius: 5,
        height: 200,
        margin: 10,
        marginTop: 30,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        textTransform: 'capitalize',
    },
    bold: {
      fontWeight: 'bold',
    },
    space: {
        marginBottom: 20,
    }
})

export default ({ navigation }) => {
    const id = navigation.getParam('_id')
    const { loading, data } = useFetch(`https://serverless-kevinguzman0.vercel.app/api/meals/${id}`)

    return (
        <View style={styles.container}>
            {loading ? <Text style={styles.text}>Cargando...</Text> :
                <>
                    <Text style={[styles.text, styles.bold]}>{data.name}</Text>
                    <Text style={[styles.text, styles.space]}>{data.desc}</Text>
                    <Button title="Accept Order" color="#fff" onPress={() => {
                        AsyncStorage.getItem('token')
                            .then(x => {
                                if (x) {
                                    fetch('https://serverless-kevinguzman0.vercel.app/api/orders/', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            authorization: x
                                        },
                                        body: JSON.stringify({
                                            meal_id: id,
                                        })
                                    }).then(x => {
                                        if (x.status !== 200) {
                                            return alert('Order rejected')
                                        }
                                        alert('Successfully generated order')
                                        navigation.navigate('Meals')
                                    })
                                }
                            })
                    }} />
                    <Button title="Close Order" color="#fff" onPress={() => navigation.navigate('Meals')} />
                </>
            }
        </View>
    )
}