import React, {Component} from 'react';
import {
	Text,
	View,
	Dimensions,
	ListView,
	TextInput,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
const Instructions = require('../../components/Instructions');
const Floor = require('../../components/Floor').default;
const FloorSection = require('../../components/FloorSection');
const AddSectionButton = require('../../components/AddSectionButton');
import { createStackNavigator } from 'react-navigation';
const styles = require('../../styles.js');

var rowsTemp = [];
var isMounted = false;

var floorKey;
var floorTitle;
var rows;
var floorRowsArray;

export default class Screen2 extends Component {
	static navigationOptions = {
		header: null,
  	};

  	constructor(props) {
		super(props);
	    this.state = {
	    	dataSource: new ListView.DataSource({
	        	rowHasChanged: (row1, row2) => row1 !== row2,
	    	}),
	    	sectionNumRows: 0,
	    	sectionWidth: 0,
	    	floorSections: [],
	    };
	    floorKey = this.props.floorKey;
		floorTitle = this.props.floorTitle;
		rows = this.props.rows;
		floorRowsArray = this.props.floorRowsArray;
	}

	setFloorKey = (floorKeyReceived) => {
		this.props.setFloorKey(floorKeyReceived);		
		floorKey = floorKeyReceived;
	}

	setFloorTitle = (floorTitleReceived) => {
		this.props.setFloorTitle(floorTitleReceived);		
		floorTitle = floorTitleReceived;
	}

	setSectionNumRows = (sectionNumRowsReceived) => {
		this.setState({
			sectionNumRows: sectionNumRowsReceived,
		});
	}

	setSectionWidth = (sectionWidthReceived) => {
		this.setState({
			sectionWidth: sectionWidthReceived,
		});
	}

	setRows = (rowsReceived) => {
		this.props.setRows(rowsReceived);
	}

	setFloorRowsArray = (floorRowsArrayReceived) => {
		this.props.setFloorRowsArray(floorRowsArrayReceived);
	}

	componentWillMount() {
		//console.log("Mounting ", floorTitle);
    	isMounted = true;
	}

    componentWillUnmount() {
		//console.log("Un-mounting ", floorTitle);
    	isMounted = false;
    }

	componentDidMount() {
 		// Initialize event listener for database
    	this.listenForItems(this.props.itemsRef);
    }

    listenForItems(itemsRef) {
 		// Call callback function on data snapshot whenever values in database change
	    itemsRef.on('value', (snap) => {
    	//console.log("1: ", floorTitle);
    	if (!isMounted)
	    	return;
    	//console.log("11: ", floorTitle);

	      	var items = []; // empty array in which we'll load all data

  			snap.child(floorKey).child(floorTitle).child('floorSections').forEach((kid) => {
  				items.push({
  					title: [kid.val().numRows, kid.val().width],
			        _key: kid.key
  				});
  			});
		    this.setState({
		        dataSource: this.state.dataSource.cloneWithRows(items)
		    });
	    });
	}

	// Push input data to DB

	saveNumRows = (numRows) => {
		this.setState({
			sectionNumRows: numRows,
		});
	}

	saveSectionWidth = (width) => {
		this.setState({
			sectionWidth: width,
		});
	}

	saveSectionData = () => {
		this.props.itemsRef.child(floorKey).child(floorTitle).child('floorSections').push({
			numRows: this.state.sectionNumRows,
			width: this.state.sectionWidth
		});
	}

	renderItem(item) {

		const swipeSettings = {
			autoClose: true,
			onClose: (secId, rowId, direction) => {
				this.props.itemsRef.child(floorKey).child(floorTitle).child('floorSections').child(item._key).remove();
			}
		}

		var swipeBtns = [{
			text: 'Delete',
			backgroundColor: 'red',
			underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
		}];

		return (
			<Swipeout {...swipeSettings} right={swipeBtns}>
		    	<FloorSection item={item} />
	    	</Swipeout>
	    );
	}

	render() {
	    this.props.itemsRef.on('value', (snap) => {
	    	//console.log("2: ", floorTitle);
	    	if (!isMounted)
		    	return;
	    	//console.log("22: ", floorTitle);


	      	var items = []; // empty array in which we'll load all data
	      	var floorRowsArrayTemp = [];
	      	rowsTemp = [];
	      	var max = 0;
	      	var rowCount = 0;
  			snap.child(floorKey).child(floorTitle).child('floorSections').forEach((kid) => {
				if (parseFloat(kid.val().width) > max)
					max = kid.val().width;
				rowCount += parseFloat(kid.val().numRows);
  			});
  			snap.child(floorKey).child(floorTitle).child('floorSections').forEach((kid) => { // push index so there's unique key
  				for (var i = 0; i < kid.val().numRows; i++) {
  					floorRowsArrayTemp.push(kid.val().width);
  				}
				rowsTemp.push(<View key={kid.key} style={{width: (kid.val().width/max)*350, height: (kid.val().numRows/rowCount)*200, backgroundColor: 'steelblue', borderColor: 'black', borderWidth: 1}} />);
  			});
  			this.setRows(rowsTemp.slice());
  			this.setFloorRowsArray(floorRowsArrayTemp.slice());
	      	// this.setState.bind({
		      // 	rows: rowsTemp,
		      // 	floorRowsArray: floorRowsArrayTemp
	      	// });
	    });

	    return (
	      	<View style={styles.container}>
	      		<View style={styles.navContainer}>
	      		<Text
		        	style={styles.navBack}
		          	onPress = { () => this.props.navigate('Screen1') }>Home
		        </Text>
		        <Text
		        	style={styles.navForward}
		          	onPress = { () => this.props.navigate('Screen3') }>Select Boards
		        </Text>
		        </View>

	    		<Instructions title="Please add floor sections by specifying the width and number of rows in the section, and clicking 'Add'"/>
		        <Floor rowCollection={rowsTemp}></Floor>
				<ListView dataSource={this.state.dataSource} renderRow={this.renderItem.bind(this)} style={styles.listview} enableEmptySections/>
				<AddSectionButton title="Add" onPress={this.saveSectionData} />
				<View style={{flexDirection: 'row'}}>
					<TextInput
						placeholder="Please enter number of rows"
						style={{height: 40, borderColor: 'gray', borderWidth: 1, width: Dimensions.get('window').width/2}}
						onChangeText={this.setSectionNumRows}/>
					<TextInput
						placeholder="Please enter width of rows"
						style={{height: 40, borderColor: 'gray', borderWidth: 1, width: Dimensions.get('window').width/2}}
						onChangeText={this.setSectionWidth}/>
				</View>
	      	</View>
	    );
  	}
	
}
