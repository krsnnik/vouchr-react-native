import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Login from './src/views/login/Login';

type Props = {};
export default class App extends Component<Props> {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303C48',
  },
});
