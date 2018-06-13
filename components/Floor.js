import React, {Component} from 'react';
import {
	View
} from 'react-native';
const styles = require('../styles.js');

export default class Row extends Component {
	render() {
		console.log("HERE ", this.props.rowCollection);
		return (
			<View style={styles.fullContainer}>
				<View style={styles.floorContainer}>
					{this.props.rowCollection}
				</View>
			</View>
		);
	}
}