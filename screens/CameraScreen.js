import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions } from "expo";
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
    console.log("taking photo...");
    if (this.camera) {
      try {
        const photo = await this.camera.takePictureAsync();

        const URL = "https://allergynode.herokuapp.com/image/upload";

        const data = new FormData();
        data.append("test-photo.jpg", {
          uri: photo.uri,
          name: "test-photo.jpg",
          type: "image/jpg"
        });
        console.log("awaiting response...");
        axios.post(URL, data).then(data => {
          axios
            .post("https://allergypy.herokuapp.com/translate", {
              url_link:
                "https://allergynode.herokuapp.com/photos/test-photo.jpg"
            })
            .then(data2 => {
              console.log("received response...");
              this.setState({
                data2: data2
              });
            })
            .catch(err => console.log(err));
        });
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
            pictureSize="1600x1200"
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
              <Text>
                {this.state.data2 ? JSON.stringify(this.state.data2.data) : "0"}
              </Text>
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
