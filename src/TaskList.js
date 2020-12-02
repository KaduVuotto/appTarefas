import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

export default function TaskList({ data, deleteItem, editItem }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => deleteItem(data.key)}>
                <Icon name='trash' color='#5ca8e0' size={20} />
            </TouchableOpacity>
            <View style={{ paddingRight: 15 }}>
                <TouchableWithoutFeedback onPress={() => editItem(data)}>
                    <Text style={{ paddingRight: 10, color: '#64686b' }}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
        paddingLeft: 16,
        margin: 3,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 25,
        height: 45,
        flexDirection: 'row'
    },
})