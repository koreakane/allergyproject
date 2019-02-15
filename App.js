import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage
} from "react-native";

import SelectAlergy from "./Selection";

const { height, width } = Dimensions.get("window");

const allergies = [
  {
    Name: "Nut",
    IsChecked: false
  },
  {
    Name: "Cola",
    IsChecked: false
  },
  {
    Name: "NukaCola",
    IsChecked: false
  },
  {
    Name: "lol",
    IsChecked: false
  },
  {
    Name: "Sushi",
    IsChecked: false
  },
  {
    Name: "Water",
    IsChecked: false
  }
]  

export default class App extends React.Component {

  state = {
    newallergy: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () => {
    // this._loadSelectAlergys();
  };

  render() {
    // const { SelectAlergys } = this.state;
    // console.log(SelectAlergys);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Select Alergy</Text>
        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.SelectAlergys}>
            {allergies.map(allergy => (
              <SelectAlergy
                text={allergy.Name}
                IsChecked={allergy.IsChecked}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  //function start-----------------------------------------------------------------------------------------------------------------------------------------------------

  _controlNewSelectAlergy = text => {
    this.setState({
      newSelectAlergy: text
    });
  };

  _addallergy = () => {

    const { newallergy } = this.state; //state인 newallergy를 불러옴
    if (newallergy !== "") {
      this.setState(() => {
        {allergies.map(allergy => {
          const ID = uuidv1(); //변수인 ID는 자동 생성 함수를 사용해 초기화시킨다.
          const newallergyObject = {
            //Object인 newallergyObject는 다음과 같다.
            [ID]: {
              //
              id: ID, //id는 자동 생성 함수로 생성된 ID를 부여한다.
              isChecked: false, //완료되었는가는 false로 설정된다.
              text: allergy.name, //text는 newallergy에서 받아온다.
            }
          };
          this._saveallergys(newState.allergys);
          return { ...newState }; //
        })}

      });
    }
  };

  _uncompltedSelectAlergy = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        SelectAlergys: {
          ...prevState.SelectAlergys,
          [id]: {
            ...prevState.SelectAlergys[id]
          }
        }
      };
      this._saveSelectAlergys(newState.SelectAlergys);
      return { ...newState };
    });
  };

  _compltedSelectAlergy = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        SelectAlergys: {
          ...prevState.SelectAlergys,
          [id]: {
            ...prevState.SelectAlergys[id]
          }
        }
      };
      this._saveSelectAlergys(newState.SelectAlergys);
      return { ...newState };
    });
  };

  _loadSelectAlergys = async () => {
    try {
      const SelectAlergys = await AsyncStorage.getItem("SelectAlergys");
      const parsedSelectAlergys = Json.parse(SelectAlergys);
      this.setState({ SelectAlergys: parsedSelectAlergys });
    } catch (err) {
      console.log(err);
    }
  };

  _saveSelectAlergys = newSelectAlergys => {
    const saveSelectAlergys = AsyncStorage.setItem(
      "SelectAlergys",
      JSON.stringify(newSelectAlergys)
    );
  };
}

//styles start ---------------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
    fontWeight: "200"
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  SelectAlergys: {
    alignItems: "center"
  }
});
