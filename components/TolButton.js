import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const constants = styles.constants;
const { View, Button, TextInput} = ReactNative;

class TolButton extends Component {
  render() {
    return (
      <View style={{borderColor: 'black', borderWidth: 1, flexDireciton: 'row'}}>
        <View style={{width: 50, height: 40}}>
          <Button title="OK" style={{height: 40}}>
          </Button>
        </View>
        <View style={{width: 50, height: 40}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 50}}
            onChangeText={this.saveLength}/>
        </View>
      </View>
    );
  }
}
      // <View style={styles.action}>
      //   <TouchableHighlight
      //     underlayColor={constants.actionColor}
      //     onPress={this.props.onPress}>
      //     <Text style={styles.actionText}>{this.props.title}</Text>
      //   </TouchableHighlight>
      // </View>

module.exports = TolButton;