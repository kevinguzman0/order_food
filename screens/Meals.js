import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";

import ListItem from '../components/ListItem'
import useFetch from '../hooks/useFetch'

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        alignSelf: 'stretch',
        padding: 15,
    }
})

const Meals = ({ navigation }) => {
    const { loading, data: meals } = useFetch('https://serverless-kevinguzman0.vercel.app/api/meals')

    return (
        <View>
            {loading ? <Text>Cargando...</Text> :
                <FlatList
                    style={styles.list}
                    data={Object.keys(meals)}
                    keyExtractor={x => x}
                    renderItem={({ item }) =>
                        <ListItem
                            onPress={() => navigation.navigate('Modal', { _id: item })}
                            name={meals[item].name}
                        />
                    }
                />
            }
        </View>
    )
}
Meals.navigationOptions = ({
    title: 'FOOD',
    headerStyle: {
        backgroundColor: '#ff4e00',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
})

export default Meals