import React, {Component} from 'react';
import {
	View
} from 'react-native';
const styles = require('../styles.js');

export default class Row extends Component {
	render() {
		return (
			<View style={styles.fullContainer2}>
				<View style={styles.floorContainer}>
					{this.props.rowCollection}
				</View>
			</View>
		);
	}
}