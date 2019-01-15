import React, { Component } from "react";
import { View, AppRegistry, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Index extends Component<Props> {
  static propTypes = { isLoggedIn: PropTypes.bool.isRequired };

  componentWillMount() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      this.props.navigation.navigate("Home");
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return (
      <View>
        <Text>Loading User Information</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, null)(Index);

AppRegistry.registerComponent(Index, () => Index);
