import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";

import { store } from "./store";

import Login from "./src/views/login/Login";
import Home from "./src/views/home/Home";
import Logo from "./src/views/home/Logo";
import Map from "./src/views/browse/Map";
import CreateVouch from "./src/views/vouch/create/CreateVouch";

const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
    CreateVouch: {
      screen: CreateVouch
    },
    Map: {
      screen: Map
    }
  },
  {
    initialRouteName: "Login",
    animationEnabled: false,
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: "#000000"
      }
    }),
    defaultNavigationOptions: {
      headerTitle: <Logo />,
      headerTitleContainerStyle: {
        justifyContent: "center",
        alignSelf: "center"
      },
      headerStyle: {
        backgroundColor: "#303C48"
      },
      headerMode: "none"
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  static navigationOptions = { title: "Welcome", header: null };
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
