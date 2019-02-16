import React from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity
} from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  CheckBox,
  Body,
  Left,
  Right,
  Thumbnail
} from "native-base";
import axios from "axios";
import { Button } from "react-native-elements";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { withTheme } from "react-native-elements";

const { height, width } = Dimensions.get("window");

export default class ImageScreen extends React.Component {
  state = {
    Image: []
  };

  componentDidMount = () => {
    this._getImagesFromApi();
  };

  render() {
    return (
      <Container>
        <Content>
          <StatusBar barStyle="light-content" />
          <Header>
            <Body>
              <Text style={styles.header}>Favorites</Text>
            </Body>
          </Header>
          <ScrollView
            styles={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <List>
              {this.state.Image.map(item => {
                return (
                  <ListItem key={item._id}>
                    <Left>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ visible: true });
                        }}
                      >
                        <Thumbnail square large source={{ uri: item.image }} />
                      </TouchableOpacity>
                    </Left>
                    <Text styles={styles.CheckText}>{item.productName}</Text>
                    <Text>{item.comment}</Text>
                    <Button
                      title="Delete"
                      onPress={() => this._deleteProduct(item)}
                    />
                    {/* <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                          this.setState({ visible: false });
                        }}
                        style={{
                          height: 300,
                          width: 400,
                          flex: 1
                        }}
                      >
                        <DialogContent
                          style={{
                            height: 300,
                            width: 400,
                            flex: 1
                          }}
                        >
                          <Image
                            key={item._id}
                            source={{ uri: item.image }}
                            style={{
                              height: 300,
                              width: width,
                              flex: 1
                            }}
                          />
                        </DialogContent>
                          </Dialog> */}
                  </ListItem>
                );
              })}
            </List>
          </ScrollView>
        </Content>
      </Container>
    );
  }

  //function start-----------------------------------------------------------------------------------------------------------------------------------------------------

  _getImagesFromApi = async () => {
    try {
      let response = await fetch(
        "https://allergynode.herokuapp.com/product/1234",
        {
          headers: {
            "Content-Type": "appliction/json"
          }
        }
      );

      console.log(222, response);

      let responseJson = await response.json();
      console.log(111, responseJson);
      this.setState(
        {
          Image: responseJson
        },
        function() {}
      );
    } catch (error) {
      console.error(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("allergies");
      if (value !== null) {
        const parsedAllergies = JSON.parse(value);
        if (parsedAllergies.length <= sampleallergies.length) {
          this.setState({ allergies: parsedAllergies });
          console.log(parsedAllergies);
        } else {
          this.setState({
            allergies: sampleallergies
          });
        }
      } else {
        this.setState({
          allergies: sampleallergies
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  _saveAllergies = allergies => {
    const saveAllergies = AsyncStorage.setItem(
      "allergies",
      JSON.stringify(allergies)
    );
  };

  _deleteProduct = async item => {
    console.log("yoo", { item });
    const res = await axios.delete(
      `https://allergynode.herokuapp.com/product/${item._id}`,
      { userId: "1234" }
    );
  };
}

//styles start -----------------------------------------------------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    ...Platform.select({
      ios: {
        color: "black"
      },
      android: {
        color: "white"
      }
    })
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  BigContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  checkboxcontainer: {
    width: width / 5
  },
  CheckText: {
    paddingLeft: 30
  }
});
