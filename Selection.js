import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class SelectAlergy extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    IsChecked: PropTypes.bool.isRequired
  };
  render() {
    const { text, IsChecked } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                IsChecked ? styles.completedCircle : styles.uncompletedCircle
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              IsChecked ? styles.completedText : styles.uncompletedText
            ]}
          >
            {text}
          </Text>
        </View>
      </View>
    );
  }

  //function-------------------------------------------------------------------------------------------------------------------------------------------------

  _toggleComplete = () => {
    const { IsChecked, uncompltedSelectAlergy, compltedSelectAlergy, id } = this.props;
    if (IsChecked) {
      uncompltedSelectAlergy(id);
    } else {
      compltedSelectAlergy(id);
    }
  };
  _startEditing = () => {
    this.setState({
      isEditing: true
    });
  };
  _finishEditing = () => {
    const { SelectAlergyValue } = this.state;
    const { id, updateSelectAlergy } = this.props;
    updateSelectAlergy(id, SelectAlergyValue);
    this.setState({
      isEditing: false
    });
  };
  _controlInput = text => {
    this.setState({ SelectAlergyValue: text });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "red"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5
  }
});
