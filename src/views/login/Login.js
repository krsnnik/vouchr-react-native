import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Logo from './Logo';
import { name as appName } from '../../../app';
import App from '../../../App';
import Triangle_up from './Triangle_up';

import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

let height = Dimensions.get('window').height / 2.5;

export default class Login extends Component<Props> {
  static propTypes = {
    onSuccess: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: {
        is: false,
        header: 'Bad Credentials',
        message: 'Cannot login try again',
      },
    };
    this.clickLogin = this.clickLogin.bind(this);
    this.login = this.login.bind(this);
  }

  clickLogin() {
    const { username, password } = this.state;
    this.login(username, password)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          this.setState({
            error: {
              is: true,
              header: 'Bad Credentials',
              message: 'Cannot login try again',
            },
          });
          console.warn(responseJson.error);
        } else {
          console.warn(responseJson);
        }
      });
  }

  login(username, password) {
    return fetch('https://api.vouchr.co/accounts/verify_login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  }

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
            onChangeText={text => this.setState({ username: text })}
          />
          <TextInput
            style={styles.loginInputs}
            placeholder={'     password'}
            placeholderTextColor={'gray'}
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity onPress={this.clickLogin}>
            <Image
              style={{ alignSelf: 'center' }}
              source={require('./go-button.png')}
            />
          </TouchableOpacity>
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
