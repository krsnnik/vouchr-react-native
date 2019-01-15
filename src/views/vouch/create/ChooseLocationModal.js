import React, { Component } from "react";
import { AppRegistry, StyleSheet } from "react-native";
import { View, Button } from "react-native";
import MapView from "react-native-maps";
import MapMarker from "react-native-maps/lib/components/MapMarker";
import { Text } from "react-native-elements";

export default class ChooseLocationModal extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      geolocation: null,
      geoerror: null
    };

    this.selectLocation = this.selectLocation.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.warn(position);
        this.setState({
          geolocation: position.coords,
          region: Object.assign(this.state.region, position.coords),
          geoError: null
        });
      },
      error => this.setState({ geoError: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  selectLocation() {}

  render() {
    const { region, geolocation } = this.state;
    if (geolocation === null || region === null) {
      return <Text>Nothing here</Text>;
    }
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <MapView
          style={styles.map}
          initialRegion={region}
          // region={region}
          onRegionChange={region => this.setState({ region })}
        >
          <MapMarker
            draggable
            coordinate={region}
            onDragEnd={e => this.setState({ region: e.nativeEvent.coordinate })}
          />
        </MapView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
              height: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Button
            onPress={this.selectLocation}
            title="Select Location"
            color="#303C48"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

AppRegistry.registerComponent(ChooseLocationModal, () => ChooseLocationModal);
