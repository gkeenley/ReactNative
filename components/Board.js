import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text, ImageBackground } = ReactNative;

export default class Board extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.board}>
        	<ImageBackground source={require('../images/wood2.jpg')} style={{width: this.props.length, flexDirection: 'row', justifyContent: 'center',}}>
            	<Text style={styles.liText}>{this.props.item}</Text>
    		</ImageBackground>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = Board;