import React, { Component } from 'react';
import { View, AppRegistry, StyleSheet, Text } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import {Input} from "react-native-elements";
import { Dimensions } from 'react-native';
import PictureBox from "./PictureBox";

let width = Dimensions.get('window').width - 20;


export default class CreateVouch extends Component<Props> {
    static navigationOptions = {
        headerLeft: null,
    };
    render() {
        return (
            <View style={styles.container}>
                <Input
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.loginInputs}
                    placeholder="Restaurant Name..."
                    placeholderTextColor="#a8a8a8"
                />
                <Input
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.loginInputs}
                    placeholder="Name of Dish..."
                    placeholderTextColor="#a8a8a8"
                />
                <PictureBox />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        justifyContent: 'space-around',
    },
    inputContainer: {
        alignSelf: 'center',
        paddingBottom: 7,
    },
    loginInputs: {
        height: 40,
        width,
        alignSelf: 'center',
        borderColor: '#d9eaf4',
        borderWidth: 1,
    },
});

AppRegistry.registerComponent(CreateVouch, () => CreateVouch);
