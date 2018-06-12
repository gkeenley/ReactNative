import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { Text, View} = ReactNative;

class Instructions extends Component {
  render() {
    return (
      <View>
        <View style={styles.instructionBar}/>
        <View style={styles.instructions}>
          <Text style={styles.instructionBarTitle}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

module.exports = Instructions;