import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { Camera, Permissions } from "expo";
import axios from "axios";
import { Text, Icon, List, ListItem, Container, Content } from "native-base";
import { Button } from "react-native-elements";
import Dialog, {
  SlideAnimation,
  DialogContent
} from "react-native-popup-dialog";

import HomeScreen from "../screens/HomeScreen";

const { height, width } = Dimensions.get("window");

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    loading: true,
    visible: false,
    allergies: [],
    exist_1: [],
    exist_2: [],
    exist_3: []
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("allergies");
      if (value !== null) {
        const parsedAllergies = JSON.parse(value);
        this.setState({ allergies: parsedAllergies });
        console.log(parsedAllergies);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async takePhoto() {
    this.setState({
      visible: true
    });
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
                "https://allergynode.herokuapp.com/photos/test-photo.jpg",
              allergies: this.state.allergies
            })
            .then(data2 => {
              console.log("received response...");

              this.setState({
                loading: false,
                data2: data2,
                exist_1: data2.data.result.exist_1,
                exist_2: data2.data.result.exist_2,
                exist_3: data2.data.result.exist_3
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
            pictureSize="800x600"
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                width: width,
                backgroundColor: "transparent",
                flexDirection: "column"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-start",
                  alignItems: "flex-start"
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
              <View style={{ flex: 6 }}>
                <Dialog
                  visible={this.state.visible}
                  onTouchOutside={() => {
                    this.setState({
                      visible: false,
                      loading: true,
                      data2: "0"
                    });
                  }}
                  dialogAnimation={
                    new SlideAnimation({
                      slideFrom: "bottom"
                    })
                  }
                >
                  <DialogContent style={{ width: 200, height: 300 }}>
                    {this.state.loading ? (
                      <View style={{ paddingTop: 20 }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                      </View>
                    ) : (
                      <Container style={{ paddingTop: 20, height: 500 }}>
                        <Content style={{ paddingTop: 10, height: 500 }}>
                          {this.state.data2 ? (
                            <List style={{ height: 500 }}>
                              <ListItem itemDivider>
                                <Text style={styles.itemDividerText}>
                                  confidece upper 50%
                                </Text>
                              </ListItem>
                              {this.state.exist_1 === [] ? (
                                <ListItem />
                              ) : (
                                <ListItem>
                                  {this.state.exist_1.map(item => {
                                    return (
                                      <Text
                                        style={styles.listitemText}
                                        key={item}
                                      >
                                        {item}{" "}
                                      </Text>
                                    );
                                  })}
                                  <Text>detected.</Text>
                                </ListItem>
                              )}
                              <ListItem itemDivider>
                                <Text style={styles.itemDividerText}>
                                  confidece upper 70%
                                </Text>
                              </ListItem>
                              {this.state.exist_2 === [] ? (
                                <ListItem />
                              ) : (
                                <ListItem>
                                  {this.state.exist_2.map(item => {
                                    return (
                                      <Text
                                        style={styles.listitemText}
                                        key={item}
                                      >
                                        {item}{" "}
                                      </Text>
                                    );
                                  })}
                                  <Text>detected.</Text>
                                </ListItem>
                              )}
                              <ListItem itemDivider>
                                <Text style={styles.itemDividerText}>
                                  confidece upper 99%!
                                </Text>
                              </ListItem>
                              {this.state.exist_3 === [] ? (
                                <ListItem />
                              ) : (
                                <ListItem>
                                  {this.state.exist_3.map(item => {
                                    return (
                                      <Text
                                        style={styles.listitemText}
                                        key={item}
                                      >
                                        {item}{" "}
                                      </Text>
                                    );
                                  })}
                                  <Text>detected.</Text>
                                </ListItem>
                              )}
                            </List>
                          ) : (
                            "0"
                          )}
                        </Content>
                      </Container>
                    )}
                  </DialogContent>
                </Dialog>
              </View>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Button
                  type="outline"
                  icon={<Icon name="ios-camera" size={50} color="blue" />}
                  onPress={this.takePhoto.bind(this)}
                  buttonStyle={styles.photoButton}
                  containerStyle={{ flex: 1, alignItems: "center" }}
                />
              </View>
              <View style={{ flex: 1 }} />
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

const styles = StyleSheet.create({
  photoButton: {
    width: 200,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8
  },
  itemDividerText: {
    fontSize: 12,
    color: "black",
    fontWeight: "400"
  },
  listitemText: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold"
  }
});
