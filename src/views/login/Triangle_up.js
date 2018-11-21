import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

import Triangle from 'react-native-triangle';

import { Dimensions } from "react-native";

let width = Dimensions.get('window').width; //full width

export default class Triangle_up extends Component<Props> {
  render() {
    return (
      <View>
        <Triangle width={width} height={90} color={'#F66358'} direction={'down'} />
      </View>
    );
  }
}

AppRegistry.registerComponent(Triangle_up, () => Triangle_up);
