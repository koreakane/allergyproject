import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import ImageScreen from "../screens/ImageScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? "ios-home"
          : "md-home"
      }
    />
  )
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen
});

CameraStack.navigationOptions = {
  tabBarLabel: "Camera",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
    />
  )
};

const ImageStack = createStackNavigator({
  Image: ImageScreen
});

ImageStack.navigationOptions = {
  tabBarLabel: "Favorites",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? "ios-heart"
          : "md-heart"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  CameraStack,
  ImageStack
});
