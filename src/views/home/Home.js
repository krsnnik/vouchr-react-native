import React, { Component } from "react";
import { View, AppRegistry, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Button } from "react-native-elements";

let height = Dimensions.get("window").height;

export default class Home extends Component<Props> {
  static navigationOptions = {
    headerLeft: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={"Vouch for something +"}
          buttonStyle={styles.button}
          onPress={() => this.props.navigation.navigate("CreateVouch")}
        />
        <Button
          title={"Search for something"}
          buttonStyle={styles.button}
          onPress={() => this.props.navigation.navigate("Map")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height,
    margin: 10
  },
  button: {
    backgroundColor: "#F66358",
    borderRadius: 0
  }
});

AppRegistry.registerComponent(Home, () => Home);
