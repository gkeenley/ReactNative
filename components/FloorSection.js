import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class FloorSection extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.floorSection}>
          <Text style={styles.liText}>{this.props.item.title[0]} x {this.props.item.title[1]}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = FloorSection;