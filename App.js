import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import { store, persistor } from "./store";

import Index from "./src/views/index";
import Login from "./src/views/login/Login";
import Home from "./src/views/home/Home";
import Logo from "./src/views/home/Logo";
import Map from "./src/views/browse/Map";
import ChooseLocationModal from "./src/views/vouch/create/ChooseLocationModal";
import CreateVouch from "./src/views/vouch/create/CreateVouch";

const MainStack = createStackNavigator(
  {
    Index: {
      screen: Index
    },
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
    initialRouteName: "Index",
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

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    ChooseLocationModal: {
      screen: ChooseLocationModal
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  static navigationOptions = { title: "Welcome", header: null };
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
