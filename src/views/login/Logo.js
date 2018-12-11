import React, { Component } from 'react';
import { View, Image, AppRegistry, StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width; //full width
let height = Dimensions.get('window').height / 4;

export default class Logo extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://i.imgur.com/yjU26K4.png'}}
        style={{width: 178, height: 40}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F66358',
  },
});

AppRegistry.registerComponent(Logo, () => Logo);
