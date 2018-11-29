import React, { Component } from 'react';
import { View, Image, AppRegistry, StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width; //full width
let height = Dimensions.get('window').height / 4;

export default class Logo extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./vouchr-logo-color.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

AppRegistry.registerComponent(Logo, () => Logo);
