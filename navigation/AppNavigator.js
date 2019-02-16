import React from "react";

import { createAppContainer, createStackNavigator } from "react-navigation"; // Version can be specified in package.json

import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";

const AppContainer = createStackNavigator(
  {
    Home: HomeScreen,
    Cameras: CameraScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppContainer);
