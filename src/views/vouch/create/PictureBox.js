import React, { Component } from 'react';
import { View, Image, AppRegistry, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width - 20;
let height = Dimensions.get('window').height / 4.5;

export default class PictureBox extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Icon name="picture-o" size={90} color="gray" style={styles.icon} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8eaed',
        height,
        width,
        justifyContent: 'center',
    },
    icon: {
        alignSelf: 'center',
    }
});

AppRegistry.registerComponent(PictureBox, () => PictureBox);
