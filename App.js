import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Dimensions } from 'react-native';
import Login from './src/views/login/Login';
/*import Profile from '/src/views/profile/Profile'*/

let height = Dimensions.get('window').height;

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Login
          onSuccess={() => {
            return true;
          }}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    App: {
      screen: App,
    },
    /*    Profile: {
      screen: Profile,
    },*/
  },
  {
    initialRouteName: 'App',
  },
  {
    headerMode: 'none',
    header: {
      visibility: false,
    },
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303C48',
    height: height,
  },
});

export default createAppContainer(AppNavigator);
