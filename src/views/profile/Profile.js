import React, { Component } from 'react';
import { View, AppRegistry, StyleSheet } from 'react-native';

export default class Profile extends Component<Props> {
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F66358',
  },
});

AppRegistry.registerComponent(Profile, () => Profile);
