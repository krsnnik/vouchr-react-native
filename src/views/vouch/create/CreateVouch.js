import React, { Component } from "react";
import ReactNative, {
  View,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import { Button, Input } from "react-native-elements";
import { Dimensions } from "react-native";
import PictureBox from "./PictureBox";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
import { createMobileVouch } from "../../../modules/vouch/vouch.service";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
let width = Dimensions.get("window").width - 20;
let height = Dimensions.get("window").height / 6;

export class CreateVouch extends Component<Props> {
  static propTypes = { createMobileVouch: PropTypes.func.isRequired };
  constructor(props) {
    super(props);
    this.state = { restaurantName: "", order: "", imageMime: "", imageData: "", geolocation: null, geoError: null };
    this.handlePreview = this.handlePreview.bind(this);
    this.handleCreateVouch = this.handleCreateVouch.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  static navigationOptions = { headerLeft: null };

  getImage(data, mime) {
    this.setState({ imageData: data, imageMime: mime });
  }

  handlePreview() {
    console.log(this.state);
  }

  handleCreateVouch() {
    console.log(this.state);
    this.props.createMobileVouch(this.state);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.warn(position);
        this.setState({
            geolocation: position.coords,
            geoError: null,
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
    if (this.state.geoError) {
      console.warn(this.state.geoError);
    }
    let currentDate = new Date();
    const { restaurantName, order, imageMime, imageData } = this.state;
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "white" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
      >
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputTextStyle}
          inputContainerStyle={styles.loginInputs}
          placeholder="Restaurant Name..."
          placeholderTextColor="#a8a8a8"
          rightIcon={<Icon name="building" size={24} color="#a8a8a8" />}
          rightIconContainerStyle={styles.iconContainer}
          onChangeText={text => this.setState({ restaurantName: text })}
          autoCapitalize="words"
          selectTextOnFocus={true}
        />
        <PictureBox sendImage={this.getImage} />
        <View style={styles.postedDateContainer}>
          <Text style={styles.posted}>Posted / </Text>
          <Text style={styles.dateString}>{currentDate.toDateString()}</Text>
        </View>

        <View style={styles.vouchLabel}>
          <Text style={styles.label}>What did you eat?</Text>
        </View>
        <TextInput
          style={styles.vouch}
          placeholder="Tell us what you ordered!"
          placeholderTextColor="#a8a8a8"
          multiline={true}
          scrollEnabled={true}
          onChangeText={text => this.setState({ order: text })}
          selectTextOnFocus={true}
        />
        <View style={styles.boxContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title={"Preview"}
              buttonStyle={styles.altButton}
              titleStyle={styles.altButtonTitle}
              onPress={this.handlePreview}
            />
            <Button
              title={"Vouch"}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={this.handleCreateVouch}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "space-around"
  },
  inputContainer: {
    alignSelf: "center",
    paddingBottom: 7
  },
  loginInputs: {
    height: 40,
    width,
    alignSelf: "center",
    borderColor: "#d9eaf4",
    borderWidth: 1
  },
  posted: {
    color: "gray",
    fontWeight: "bold"
  },
  dateString: {
    color: "#303C48",
    fontWeight: "bold"
  },
  postedDateContainer: {
    flexDirection: "row",
    paddingVertical: 10
  },
  vouch: {
    borderColor: "#d9eaf4",
    borderWidth: 1,
    width,
    height: 140,
    textAlignVertical: "top",
    paddingLeft: 10,
    color: "#303C48"
  },
  vouchLabel: {
    paddingLeft: 10,
    backgroundColor: "#dee7f4",
    height: 30,
    width,
    color: "#303C48",
    justifyContent: "center",
    paddingTop: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  label: {
    fontWeight: "bold"
  },
  boxContainer: {
    paddingTop: 7
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 50,
    alignContent: "center",
    height,
    paddingTop: 40
  },
  button: {
    width: 120,
    borderRadius: 100,
    backgroundColor: "#F66358",
    elevation: 0
  },
  buttonTitle: {
    fontSize: 11
  },
  altButton: {
    width: 120,
    borderRadius: 100,
    backgroundColor: "white",
    elevation: 0,
    borderColor: "#F66358",
    borderWidth: 2
  },
  altButtonTitle: {
    fontSize: 11,
    color: "#F66358"
  },
  iconContainer: {
    paddingRight: 10
  },
  inputTextStyle: {
    color: "#303C48"
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createMobileVouch
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(CreateVouch);

AppRegistry.registerComponent(CreateVouch, () => CreateVouch);
