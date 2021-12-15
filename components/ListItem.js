import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FE7D00',
        marginBottom: 15,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: '700'
    }
})

export default ({name, onPress}) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

