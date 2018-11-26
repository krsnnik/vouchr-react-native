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
    clickRegister: PropTypes.func,
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
  }

  clickLogin() {
    const { username, password } = this.state;
    this.login(username, password).then(json => {
      if (json.error) {
        this.setState({
          error: {
            is: true,
            header: 'Bad Credentials',
            message: 'Cannot login try again',
          },
        });
      } else {
        Alert.alert('SUCCESS');
        if (this.props.onSuccess) {
          this.props.onSuccess();
        }
      }
    });
  }

  async login(username, password) {
    try {
      let response = await fetch(
        'https://api.vouchr.co/accounts/verify_login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        },
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
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
          />
          <TextInput
            style={styles.loginInputs}
            placeholder={'     password'}
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity onPress={this.clickLogin()}>
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
