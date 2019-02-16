import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions, MediaLibrary } from "expo";
import axios from "axios";
import { Button } from "react-native-elements";

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async takePhoto() {
    console.log("entered take photo");
    if (this.camera) {
      try {
        const photo = await this.camera.takePictureAsync();
        const URL = "https://allergynode.herokuapp.com/uploadPhoto";
        // console.log({ photo });
        // formData.append("test-photo.jpg", formData, "test-photo");
        // formData.append("test-photo", {
        //   uri: photo.uri,
        //   name: `test-photo.jpg`,
        //   type: `image/jpg`
        // });
        console.log("before fetch...");

        // const formData = new FormData();
        // formData.append("name", "avatar");
        // formData.append("fileData", {
        //   uri: photo.uri,
        //   type: "image/jpg",
        //   name: "test-photo.jpg"
        // });

        var data = new FormData();
        data.append("my_photo", {
          uri: photo.uri,
          name: "my_photo.jpg",
          type: "image/jpg"
        });

        fetch(URL, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          },
          method: "POST",
          body: data
        });

        console.log("after fetch...");
      } catch (err) {
        console.error(err);
      }
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
              <Button title="Snap" onPress={this.takePhoto.bind(this)} />
              {/* <Button
                title="Back"
                onPress={() => {
                  this.props.navigation.dispatch(
                    StackActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: "Home" })
                      ]
                    })
                  );
                }}
              /> */}
            </View>
          </Camera>
        </View>
      );
    }
  }
}
