import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Dimensions } from 'react-native';
import Login from './src/views/login/Login';
import Profile from './src/views/profile/Profile';

let height = Dimensions.get('window').height;

const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303C48',
    height: height,
  },
});

export default class App extends React.Component {
  static navigationOptions = { title: 'Welcome', header: null };
  render() {
    return <AppContainer />;
  }
}
