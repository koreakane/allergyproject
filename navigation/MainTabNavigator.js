import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";

import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";

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
          ? `ios-card${focused ? "" : "-outline"}`
          : "md-card"
      }
    />
  )
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen
});

CameraStack.navigationOptions = {
  tabBarLabel: "Q&A",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  CameraStack
});
