import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage
} from "react-native";

import { Header, CheckBox, Button } from "react-native-elements";
import { StackActions, NavigationActions } from "react-navigation";

allergies = [
  {
    id: "1",
    name: "Nut",
    IsChecked: true
  },
  {
    id: "2",
    name: "Cola",
    IsChecked: false
  },
  {
    id: "3",
    name: "NukaCola",
    IsChecked: false
  },
  {
    id: "4",
    name: "lol",
    IsChecked: false
  },
  {
    id: "5",
    name: "Sushi",
    IsChecked: false
  },
  {
    id: "6",
    name: "Water",
    IsChecked: false
  },
  {
    id: "7",
    name: "Rice",
    IsChecked: false
  },
  {
    id: "8",
    name: "Grenade",
    IsChecked: false
  },
  {
    id: "9",
    name: "Lemon",
    IsChecked: false
  }
];
// I want to make this allergy array to other file

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View styles={styles.container}>
        {/* <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        /> */}

        <ScrollView styles={styles.container2}>
          <FlatList
            data={allergies}
            renderItem={({ item }) => (
              <View styles={styles.container3}>
                <CheckBox
                  checked={item.IsChecked ? true : false}
                  // onPress={_allergyCheck()}
                />
                <Text styles={styles.CheckText}>{item.name}</Text>
              </View>
            )}
            keyExtractor={({ id }, index) => id}
          />
        </ScrollView>
        <Button
          title="Go to Cameras"
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Camera" })]
              })
            );
          }}
        />
      </View>
    );
  }

  //function start-----------------------------------------------------------------------------------------------------------------------------------------------------

  _allergyCheck = () => {
    checked ? (checked = false) : (checked = true);
  };

  _makeAllergylist = () => {
    if ((AllergyList = {})) {
      const AllergyList = {
        ...allergies
      };
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("allergies");
      if (value !== null) {
        const parsedAllergies = JSON.parse(allergies);
        this.setState({ allergies: parsedAllergies });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
}

//styles start -----------------------------------------------------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container3: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
  },
  checkTextContainer: {},
  CheckText: { marginTop: 5 },
  camerabutton: {
    width: 100,
    borderRadius: 50
  }
});
