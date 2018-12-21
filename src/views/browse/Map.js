import React, { Component } from "react";
import { AppRegistry, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MapView from "react-native-maps";
import { Text } from "react-native-elements";
import MapMarker from "react-native-maps/lib/components/MapMarker";

import { geoGeoVouches } from "../../modules/vouch/geosearch/geosearch.service";
import PropTypes from "prop-types";

export class Map extends Component<Props> {
  static propTypes = { geoGeoVouches: PropTypes.func.isRequired };
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
      geoerror: null,
      imageUrl: "",
      markers: []
    };
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

        this.props
          .geoGeoVouches(position.coords.latitude, position.coords.longitude)
          .then(json => {
            console.warn(json);
            const { vouches } = json.payload;

            if (vouches && Array.isArray(vouches)) {
              let newMarkers = [];
              vouches.forEach(vouch => {
                newMarkers.push({
                  latitude: vouch.vouch.geolocation.latitude,
                  longitude: vouch.vouch.geolocation.longitude,
                  title: vouch.vouch.headline,
                  description: vouch.vouch.testimony
                });
              });
              this.setState({ markers: newMarkers });
            }
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

  render() {
    const { region, geolocation, imageUrl, markers } = this.state;
    if (geolocation === null || region === null) {
      return <Text> </Text>;
    }
    return (
      <MapView
        style={styles.map}
        initialRegion={region}
        // region={region}
        onRegionChange={region => this.setState({ region })}
      >
        {/*<MapMarker*/}
          {/*coordinate={{*/}
            {/*latitude: 34.0522,*/}
            {/*longitude: -118.2437*/}
          {/*}}*/}
          {/*image={imageUrl}*/}
          {/*title="First"*/}
          {/*description="Mike and 4 others vouched"*/}
        {/*/>*/}
        {markers
          ? markers.map(marker => {
              return (
                <MapMarker
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }}
                  image={imageUrl}
                  title={marker.title}
                  description={marker.description}
                />
              );
            })
          : null}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    top: 0
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      geoGeoVouches
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Map);

AppRegistry.registerComponent(Map, () => Map);
