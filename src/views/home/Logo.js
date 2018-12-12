import React, { Component } from 'react';
import { View, Image, AppRegistry, StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width; //full width
let height = Dimensions.get('window').height / 4;

export default class Logo extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/diX9EkO.png' }}
          style={{ width: 94, height: 21 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

AppRegistry.registerComponent(Logo, () => Logo);
