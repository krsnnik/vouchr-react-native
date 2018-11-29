import React, { Component } from 'react';
import { View, Image, AppRegistry, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

let width = Dimensions.get('window').width - 20;
let height = Dimensions.get('window').height / 4.5;

export default class PictureBox extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="picture-o" size={90} color="gray" style={styles.icon} />
        <View style={styles.buttonContainer}>
          <Button
            title={'Choose Photo'}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
          <Button
            title={'Take Photo'}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8eaed',
    height,
    width,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  button: {
    width: 120,
    borderRadius: 100,
    backgroundColor: '#303C48',
    elevation: 0,
  },
  buttonTitle: {
    fontSize: 11,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 50,
  },
});

AppRegistry.registerComponent(PictureBox, () => PictureBox);
