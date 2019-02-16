import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";

import {
  Container,
  Title,
  Header,
  Content,
  List,
  ListItem,
  CheckBox,
  Body,
  Left,
  Right
} from "native-base";
import { StackActions, NavigationActions } from "react-navigation";

const { height, width } = Dimensions.get("window");

sampleallergies = [
  {
    id: "1",
    name: "shrimp/prawn",
    IsChecked: true
  },
  {
    id: "2",
    name: "crab",
    IsChecked: false
  },
  {
    id: "3",
    name: "wheat",
    IsChecked: false
  },
  {
    id: "4",
    name: "buckwheat",
    IsChecked: false
  },
  {
    id: "5",
    name: "egg",
    IsChecked: false
  },
  {
    id: "6",
    name: "milk",
    IsChecked: false
  },
  {
    id: "7",
    name: "peanuts",
    IsChecked: false
  },
  {
    id: "8",
    name: "abalone",
    IsChecked: false
  },
  {
    id: "9",
    name: "squid",
    IsChecked: false
  },
  {
    id: "10",
    name: "salmon roe",
    IsChecked: false
  },
  {
    id: "11",
    name: "oranges",
    IsChecked: false
  },
  {
    id: "12",
    name: "cashew nut",
    IsChecked: false
  },
  {
    id: "13",
    name: "kiwifruit",
    IsChecked: false
  },
  {
    id: "14",
    name: "beef",
    IsChecked: false
  },
  {
    id: "15",
    name: "walnuts",
    IsChecked: false
  },
  {
    id: "16",
    name: "sesame",
    IsChecked: false
  },
  {
    id: "17",
    name: "salmon",
    IsChecked: false
  },
  {
    id: "18",
    name: "mackerel",
    IsChecked: false
  },
  {
    id: "19",
    name: "soybeans",
    IsChecked: false
  },
  {
    id: "20",
    name: "chicken",
    IsChecked: false
  },
  {
    id: "21",
    name: "bananas",
    IsChecked: false
  },
  {
    id: "22",
    name: "pork",
    IsChecked: false
  },
  {
    id: "23",
    name: "matsutake mushrooms",
    IsChecked: false
  },
  {
    id: "24",
    name: "peaches",
    IsChecked: false
  },
  {
    id: "25",
    name: "yams",
    IsChecked: false
  },
  {
    id: "26",
    name: "apples",
    IsChecked: false
  },
  {
    id: "27",
    name: "gelatin",
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
      <Container>
        <Content>
          <StatusBar barStyle="light-content" />
          <ScrollView
            styles={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <List>
              {this.state.allergies.map(item => {
                return (
                  <ListItem key={item.id}>
                    <Left>
                      <CheckBox
                        checked={item.IsChecked}
                        onPress={() => this._checkForAllergies(item)}
                      />
                    </Left>
                    <Body>
                      <Text styles={styles.CheckText}>{this._Capitalize(item.name)}</Text>
                    </Body>
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

  _Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
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
}

//styles start -----------------------------------------------------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
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
