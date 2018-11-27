import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Logo from './Logo';
import Triangle_up from './Triangle_up';

import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';

import { createStackNavigator, createAppContainer } from 'react-navigation';

let height = Dimensions.get('window').height / 2.5;
let fullHeight = Dimensions.get('window').height;

export default class Login extends Component<Props> {
  static navigationOptions = { title: 'Welcome', header: null };
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
        console.warn(responseJson);
        if (responseJson.error) {
          console.warn(responseJson.error);
          this.setState({
            error: {
              is: true,
              header: 'Bad Credentials',
              message: 'Cannot login try again',
            },
          });
        } else {
          this.props.navigation.navigate('Profile');
          console.warn(responseJson);
        }
      })
      .catch(error => {
        console.warn(error);
      });
  }

  login(username, password) {
    return fetch('https://api.vouchr.co/accounts/verify_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Logo />
          <Triangle_up />
          <View style={styles.formContainer}>
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.loginInputs}
              placeholder="username"
              placeholderTextColor="#a8a8a8"
              rightIcon={<Icon name="user-o" size={24} color="#F66358" />}
              rightIconContainerStyle={styles.iconContainer}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.loginInputs}
              placeholder="password"
              placeholderTextColor="#a8a8a8"
              rightIcon={
                <Icon2 name="lock-outline" size={24} color="#F66358" />
              }
              rightIconContainerStyle={styles.iconContainer}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={this.clickLogin}>
              <Image
                style={{ alignSelf: 'center' }}
                source={require('./go-button.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#303C48',
    height: fullHeight,
  },
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
  inputContainer: {
    alignSelf: 'center',
  },
  iconContainer: {
    paddingRight: 10,
  },
});

AppRegistry.registerComponent(Login, () => Login);
