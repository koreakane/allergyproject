import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Header, CheckBox, Button } from "react-native-elements";

allergies = [
  {
    id: "1",
    name: "Nut",
    IsChecked: false
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
  },

];

export default class HomeScreen extends React.Component {

  // componentDidMount = async () => {
  //   return fetch(
  //     "http://www.json-generator.com/api/json/get/bUDnpbvyJK?indent=2"
  //   )
  //     .then(response => response.json())
  //     .then(responseJson => {3
  //       this.setState({
  //         dataSource: responseJson.allergies,
  //         isLoading: false
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // componentDidMount = () => {
  //   this._retrieveData();
  // };

  render() {
    return (
      <View styles={styles.container}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <ScrollView styles={styles.container2}>
        <FlatList
          data={allergies}
          renderItem={({ item }) => (
            <View styles={styles.container3}>
              <CheckBox
                value={item.IsChecked ? true : false}
                onValueChange={() =>
                  this.setState({ checked: !this.state.checked })
                }
                // onChange={this._allergyCheck()}
              />
              <Text styles={styles.CheckText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
        </ScrollView>
      </View>
    );
  }

  //function start-----------------------------------------------------------------------------------------------------------------------------------------------------

  _allergyCheck = () => {
    this.setState({ checked: !this.state.checked });
    // try {
    //   await AsyncStorage.setItem("allergies", JSON.stringify(allergies));
    // } catch (error) {
    //   // Error saving data
    // }
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
    flex: 1
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container3: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  checkTextContainer: {},
  CheckText: { marginTop: 5 },
  camerabutton: {
    width: 100,
    borderRadius: 50
  }
});
