import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TextInput } from 'react-native';

import Logo from './Logo';
import { name as appName } from '../../../app';
import App from '../../../App';
import Triangle_up from './Triangle_up';

import { Dimensions } from 'react-native';

let height = Dimensions.get('window').height / 3; //full height

export default class Login extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Triangle_up />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.loginInputs}
            placeholder={'     username'}
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.loginInputs}
            placeholder={'     password'}
            placeholderTextColor={'gray'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  loginInputs: {
    height: 50,
    alignSelf: 'center',
    width: 280,
    borderColor: '#F66358',
    borderWidth: 1,
    borderRadius: 5,
  },
  formContainer: {
    height: height,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
});

AppRegistry.registerComponent(Login, () => Login);
