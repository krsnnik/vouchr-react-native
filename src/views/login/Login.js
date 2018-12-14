import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from "react-native";

import Logo from "./Logo";
import Triangle_up from "./Triangle_up";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { login } from "../../modules/auth/auth.service";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

let height = Dimensions.get("window").height / 2.5;
let fullHeight = Dimensions.get("window").height;

export class Login extends Component<Props> {
  static navigationOptions = { title: "Welcome", header: null };
  static propTypes = {
    onSuccess: PropTypes.func,
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: {
        is: false,
        header: "Bad Credentials",
        message: "Cannot login try again"
      }
    };
    this.clickLogin = this.clickLogin.bind(this);
  }

  clickLogin() {
    const { username, password } = this.state;

    this.props
      .login(username, password)
      .then(json => {
        if (json.error) {
          this.setState({
            error: {
              is: true,
              header: "Bad Credentials",
              message: "Cannot login try again"
            }
          });
        } else {
          if (this.props.onSuccess) {
            this.props.onSuccess();
          }
          this.props.navigation.navigate("Home");
          console.warn(json);
        }
      })
      .catch(error => {
        console.warn(error);
      });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#303C48" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
      >
        <View style={styles.container}>
          <Logo />
          <Triangle_up />
          <View style={styles.formContainer}>
            <Input
              inputStyle={{ color: "#a8a8a8" }}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.loginInputs}
              placeholder="username"
              placeholderTextColor="#a8a8a8"
              rightIcon={<Icon name="user-o" size={24} color="#F66358" />}
              rightIconContainerStyle={styles.iconContainer}
              onChangeText={text => this.setState({ username: text })}
              selectTextOnFocus={true}
            />
            <Input
              inputStyle={{ color: "#a8a8a8" }}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.loginInputs}
              placeholder="password"
              placeholderTextColor="#a8a8a8"
              rightIcon={
                <Icon2 name="lock-outline" size={24} color="#F66358" />
              }
              rightIconContainerStyle={styles.iconContainer}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={true}
              selectTextOnFocus={true}
            />
            <TouchableOpacity onPress={this.clickLogin}>
              <Image
                style={{ alignSelf: "center", width: 85, height: 90 }}
                source={{ uri: "https://i.imgur.com/ZD6bD8P.png" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#303C48",
    height: fullHeight
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  loginInputs: {
    height: 50,
    alignSelf: "center",
    width: 280,
    borderColor: "#F66358",
    borderWidth: 1,
    borderRadius: 5
  },
  formContainer: {
    height: height,
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center"
  },
  inputContainer: {
    alignSelf: "center"
  },
  iconContainer: {
    paddingRight: 10
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);

AppRegistry.registerComponent(Login, () => Login);
