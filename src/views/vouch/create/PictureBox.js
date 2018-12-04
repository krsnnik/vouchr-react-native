import React, { Component } from 'react';
import { View, Image, AppRegistry, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Button, Tile } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

let width = Dimensions.get('window').width - 20;
let height = Dimensions.get('window').height / 4.5;

export default class PictureBox extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      imageDisplayMode: 'none',
      showIconAndButtons: 'flex',
      imageMime: '',
      imageBase64: '',
    };
  }

  render() {
    const {
      imageDisplayMode,
      showIconAndButtons,
      imageMime,
      imageBase64,
    } = this.state;
    return (
      <View style={styles.container}>
        {/*This is the image tile, when the form first loads it is hidden, once
        the user picks an image it will show and replace the background and hide everything else.*/}
        <Tile
          containerStyle={{
            display: imageDisplayMode,
            height,
            width,
          }}
          imageContainerStyle={{
            height,
            width,
          }}
          imageSrc={{ uri: `data:${imageMime};base64,${imageBase64}` }}
          iconContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            paddingTop: 55,
          }}
          icon={{
            name: 'times-circle',
            type: 'font-awesome',
            onPress: () =>
              this.setState({
                imageDisplayMode: 'none',
                showIconAndButtons: 'flex',
                imageMime: '',
                imageBase64: '',
              }),
          }}
        />
        {/*This is the "image" icon when there's no image selected*/}
        <Icon
          name="picture-o"
          size={90}
          color="gray"
          style={{ display: showIconAndButtons, alignSelf: 'center' }}
        />
        {/*This view contains the 2 buttons*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: 50,
            display: showIconAndButtons,
          }}
        >
          <Button
            title={'Choose Photo'}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() =>
              ImagePicker.openPicker({
                width,
                height,
                cropping: true,
                includeBase64: true,
              }).then(image => {
                this.setState({
                  imageDisplayMode: 'flex',
                  showIconAndButtons: 'none',
                  imageBase64: image.valueOf().data,
                  imageMime: image.valueOf().mime,
                });
                this.props.sendImage(image.valueOf().data, image.valueOf().mime );
              })
            }
          />
          <Button
            title={'Take Photo'}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() =>
              ImagePicker.openCamera({
                width,
                height,
                cropping: true,
                includeBase64: true,
              }).then(image => {
                this.setState({
                  imageDisplayMode: 'flex',
                  showIconAndButtons: 'none',
                  imageBase64: image.valueOf().data,
                  imageMime: image.valueOf().mime,
                });
              })
            }
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
  button: {
    width: 120,
    borderRadius: 100,
    backgroundColor: '#303C48',
    elevation: 0,
  },
  buttonTitle: {
    fontSize: 11,
  },
});

AppRegistry.registerComponent(PictureBox, () => PictureBox);
