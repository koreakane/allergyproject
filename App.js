import React from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { AppLoading, Font, Icon } from "expo";
import AppContainer from "./navigation/AppNavigator";
import uuidv4 from "uuid/v4";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    userID : ""
  };

  componentDidMount = () => {
    this._retrieveID();
  }

  _retrieveID = async () => {
    try {
      const value = await AsyncStorage.getItem("ID");
      if (value !== null) {
          this.setState({ userID: "ID" });
          console.log(userID)
      } else {
        const newID = uuidv4();
        AsyncStorage.setItem("ID", newID);
        this.setState({
          userID : newID
        });

      }
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <AppContainer />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
