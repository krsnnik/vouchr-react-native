import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TextInput } from 'react-native';

import Logo from './Logo';
import { name as appName } from '../../../app';
import App from '../../../App';
import Triangle_up from './Triangle_up';

export default class Login extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Triangle_up />
          <TextInput
              style={{height: 50, alignSelf: 'center', width: 280 , borderColor: '#F66358', borderWidth: 1, borderRadius: 5}}
              placeholder={'     username'}
              placeholderTextColor={'gray'}
          />
          <TextInput
              style={{height: 50, alignSelf: 'center', width: 280 , borderColor: '#F66358', borderWidth: 1, borderRadius: 5}}
              placeholder={'     password'}
              placeholderTextColor={'gray'}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

AppRegistry.registerComponent(Login, () => Login);
