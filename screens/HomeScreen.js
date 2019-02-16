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

sampleallergies = [
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
  state = {
    allergies: []
  };

  componentDidMount = () => {
    // this._makeAllergylist();
    this._retrieveData();
  };

  render() {
    return (
      <View styles={styles.container}>
        {/* <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        /> */}

        <ScrollView styles={styles.container2}>
          {this.state.allergies.map(item => {
            return (
              <View styles={styles.container3} key={item.id}>
                <CheckBox
                  checked={item.IsChecked}
                  onPress={() => this._checkForAllergies(item)}
                />
                <Text styles={styles.CheckText}>{item.name}</Text>
              </View>
            );
          })}
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

  _checkForAllergies(item) {
    const newState = this.state.allergies.map(allergy => {
      if (allergy.id === item.id) {
        return {
          ...allergy,
          IsChecked: !allergy.IsChecked
        };
      }
      return allergy;
    });

    this.setState({
      allergies: newState
    });
    this._saveAllergies(this.state.allergies);
    console.log(this.state.allergies);
  }

  // _makeAllergylist = () => {
  //   console.log(this.state)
  //   const allergies = this.state;
  //   console.log(sampleallergies)
  //   if (allergies == []) {
  //     const newState = sampleallergies.map(allergy => {
  //       return allergy
  //     });

  //     this.setState({
  //       allergies: newState
  //     });
  //   }
  // };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("allergies");
      if (value !== null) {
        const parsedAllergies = JSON.parse(value);
        this.setState({ allergies: parsedAllergies });
        console.log(parsedAllergies);
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
