import React, { Component } from 'react';
import ReactNative, {
  View,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Dimensions } from 'react-native';
import PictureBox from './PictureBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let width = Dimensions.get('window').width - 20;
let height = Dimensions.get('window').height / 6;

export default class CreateVouch extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: '',
      dishName: '',
      endorsement: '',
      tags: '',
      imageMime: '',
      imageData: '',
    };
    this.handlePreview = this.handlePreview.bind(this);
    this.handleCreateVouch = this.handleCreateVouch.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  static navigationOptions = {
    headerLeft: null,
  };

  getImage(data, mime) {
    this.setState({ imageData: data, imageMime: mime });
  }

  handlePreview() {
    console.log(this.state);
  }

  handleCreateVouch() {
    console.log(this.state);
  }

  render() {
    let currentDate = new Date();
    const {
      restaurantName,
      dishName,
      endorsement,
      tags,
      imageMime,
      imageData,
    } = this.state;
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'white' }}
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
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputTextStyle}
          inputContainerStyle={styles.loginInputs}
          placeholder="Name of Dish..."
          placeholderTextColor="#a8a8a8"
          rightIcon={<Icon name="cutlery" size={24} color="#a8a8a8" />}
          rightIconContainerStyle={styles.iconContainer}
          onChangeText={text => this.setState({ dishName: text })}
          selectTextOnFocus={true}
        />
        <PictureBox sendImage={this.getImage} />
        <View style={styles.postedDateContainer}>
          <Text style={styles.posted}>Posted / </Text>
          <Text style={styles.dateString}>{currentDate.toDateString()}</Text>
        </View>

        <View style={styles.vouchLabel}>
          <Text style={styles.label}>Your Vouch</Text>
        </View>
        <TextInput
          style={styles.vouch}
          placeholder="Write your endorsement here..."
          placeholderTextColor="#a8a8a8"
          multiline={true}
          scrollEnabled={true}
          onChangeText={text => this.setState({ endorsement: text })}
          selectTextOnFocus={true}
        />
        <View style={styles.boxContainer}>
          <View style={styles.vouchLabel}>
            <Text style={styles.label}>Tags</Text>
          </View>
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputTextStyle}
            inputContainerStyle={styles.loginInputs}
            placeholder="Start typing some tags..."
            placeholderTextColor="#a8a8a8"
            rightIcon={<Icon name="tags" size={24} color="#a8a8a8" />}
            rightIconContainerStyle={styles.iconContainer}
            onChangeText={text => this.setState({ tags: text })}
            selectTextOnFocus={true}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={'Preview'}
              buttonStyle={styles.altButton}
              titleStyle={styles.altButtonTitle}
              onPress={this.handlePreview}
            />
            <Button
              title={'Vouch'}
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
    justifyContent: 'space-around',
  },
  inputContainer: {
    alignSelf: 'center',
    paddingBottom: 7,
  },
  loginInputs: {
    height: 40,
    width,
    alignSelf: 'center',
    borderColor: '#d9eaf4',
    borderWidth: 1,
  },
  posted: {
    color: 'gray',
    fontWeight: 'bold',
  },
  dateString: {
    color: '#303C48',
    fontWeight: 'bold',
  },
  postedDateContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  vouch: {
    borderColor: '#d9eaf4',
    borderWidth: 1,
    width,
    height: 140,
    textAlignVertical: 'top',
    paddingLeft: 10,
    color: '#303C48',
  },
  vouchLabel: {
    paddingLeft: 10,
    backgroundColor: '#dee7f4',
    height: 30,
    width,
    color: '#303C48',
    justifyContent: 'center',
    paddingTop: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  boxContainer: {
    paddingTop: 7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 50,
    alignContent: 'center',
    height,
    paddingTop: 40,
  },
  button: {
    width: 120,
    borderRadius: 100,
    backgroundColor: '#F66358',
    elevation: 0,
  },
  buttonTitle: {
    fontSize: 11,
  },
  altButton: {
    width: 120,
    borderRadius: 100,
    backgroundColor: 'white',
    elevation: 0,
    borderColor: '#F66358',
    borderWidth: 2,
  },
  altButtonTitle: {
    fontSize: 11,
    color: '#F66358',
  },
  iconContainer: {
    paddingRight: 10,
  },
  inputTextStyle: {
    color: '#303C48',
  },
});

AppRegistry.registerComponent(CreateVouch, () => CreateVouch);
