import React, {Component} from 'react';
import Swipeout from 'react-native-swipeout';
const Instructions = require('../../components/Instructions');
const AddSectionButton = require('../../components/AddSectionButton');
const ActionButton = require('../../components/ActionButton');
const Board = require('../../components/Board');
const Floor = require('../../components/Floor').default;
const FilledFloor = require('../../components/FilledFloor').default;
const styles = require('../../styles.js');
const ArrangedBoard = require('../../components/ArrangedBoard');
var f = require('../../scripts/solve');

import {
	Text,
	View,
	TouchableHighlight,
	Dimensions,
	ListView,
	TextInput,
	Modal,
} from 'react-native';

var floorSectionsArray; // Array containing all floor row lengths
var filledFloorSections; // Array containing all floor row lengths when filled
var maxBoardLength; // Length of longest board
var boardsArray; // Array that will hold lengths of all boards
var endsArray; // Array that will hold lengths of all ends
var boards; // Array of boards in ListView-friendly format
var ends; // Array of ends in ListView-friendly format

export default class Screen5 extends Component {
	static navigationOptions = {
    	title: 'Screen5',
		header: null
  	};

  	constructor(props) {
		super(props);
	    this.state = {
	    	dataSource: new ListView.DataSource({
	        	rowHasChanged: (row1, row2) => row1 !== row2,
	    	}),
	    	solved: false,
	    	tolerance: 0,
	    	modalVisible: false,
	    };
		floorSectionsArray = this.props.floorSectionsArray;
		floorSections = this.props.floorSections;
		filledFloorSections = this.props.filledFloorSections;
    	maxBoardLength = this.props.maxBoardLength;
    	boardsArray = this.props.boardsArray;
    	endsArray = this.props.endsArray;
    	boards = this.props.boards;
    	ends = this.props.ends;
	}
	




	// DATA SAVING METHODS

	// Call modal that indicates to user that solution could not be found within chosen tolerance
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	
	// Update the tolerance within which the solution must be found
	updateTolerance(text) {
		this.setState({
			tolerance: parseInt(text)
		});
	}

	setFloorSectionsArray = (floorSectionsArrayReceived) => {
		floorSectionsArray = floorSectionsArrayReceived;
		this.props.setFloorSectionsArray(floorSectionsArrayReceived);
	}

	setFilledFloorSections = (filledFloorSectionsReceived) => {
		filledFloorSections = filledFloorSectionsReceived.slice()
		this.props.setFilledFloorSections(filledFloorSectionsReceived);
	}

	// Call 'solve' algorithm and attempt to find solution within chosen tolerance
	attemptToSolve() {
		var solution;
		// Map array of string to floats
		this.setFloorSectionsArray(floorSectionsArray.map((item) => parseFloat(item)));
		// If user has provided ends, compute solution including these ends
		if (endsArray.length > 0) {
			// If solution is found, save it. Otherwise signal modal.
			if (f.func(boardsArray, [endsArray[0]], [], 0, 0, endsArray, floorSectionsArray, this.state.tolerance)) {
				this.setState({solved: true});
				solution = f.func(boardsArray, [endsArray[0]], [], 0, 0, endsArray, floorSectionsArray, this.state.tolerance);
			} else{
				this.setModalVisible(true);
				return;
			}
		}
		// If user has not provided ends, compute solution without ends
		else {
			// If solution is found, save it. Otherwise signal modal.
			if (f.func(boardsArray, [], [], 0, 0, endsArray, floorSectionsArray, this.state.tolerance)) {
				this.setState({solved: true});
				solution = f.func(boardsArray, [], [], 0, 0, endsArray, floorSectionsArray, this.state.tolerance);
			} else {
				this.setModalVisible(true);
				return;
			}
		}
		this.setFilledFloorSections([]);
		var tempfilledFloorSections;
		// Display all rows of solution
		solution.forEach((row, index) => {
			var filledRow = [];
			// For each board in row, push corresponding ArrangedBoard components to filledRow array
			row.forEach((board, subIndex) => {
				filledRow.push(
		    		<ArrangedBoard key={subIndex} item={board} length={board*350/Math.max.apply(null, floorSectionsArray)} style={{borderColor: 'black', borderBottomWidth: 1}}/>
				);
			});
			// For each floor section, overlay solution on top
			tempfilledFloorSections = filledFloorSections.slice();
			tempfilledFloorSections.push(
				<View key={index} style={{flex: 1, flexDirection: 'row', height: 200/solution.length}}>
			        {filledRow}
		      	</View>
			);
			this.setFilledFloorSections(tempfilledFloorSections);
		});
	}
	
	// RENDER METHODS

	// Render each board in boards list
	renderBoards(item) {
		return (
    		<View>
    			<View style={{width: (item.title/parseFloat(maxBoardLength))*350, borderColor: 'black', borderBottomWidth: 1}}>
			    	<Swipeout style={styles.board}>
			    		<Board item={item.title} length={(item.title/parseFloat(maxBoardLength))*(Dimensions.get('window').width-4)}/>
			    	</Swipeout>
	    		</View>
	    	</View>
	    );
	}

	// Render each end in ends list
	renderEnds(item) {
		return (
	    	<View>
    			<View style={{width: (item.title/parseFloat(maxEndLength))*350, borderColor: 'black', borderBottomWidth: 1}}>
			    	<Swipeout style={styles.board}>
			    		<Board item={item.title} length={(item.title/parseFloat(maxEndLength))*(Dimensions.get('window').width-4)}/>
			    	</Swipeout>
	    		</View>
	    	</View>
	    );
	}

	render() {
		return (
		  	<View style={styles.container}>
			    <View style={styles.navContainer}>
			        <Text
			        	style={styles.navBack}
			          	onPress = { () => this.props.navigate('Screen4') }>Select ends
			        </Text>
			        <View>
			        	<Text>Tolerance</Text>
				        <TextInput
				        	style={styles.textInput}
				        	defaultValue={"0"}
				        	onChangeText={this.updateTolerance.bind(this)}/>
		        	</View>
		        </View>
	    		<Instructions title="Please specify tolerance and click 'Compute Solution'" />
	    		<View>
			        <Floor rowCollection={floorSections}></Floor>
			        {!!this.state.solved && <FilledFloor rowCollection={filledFloorSections}></FilledFloor>}
		        </View>
				<ListView dataSource={boards} renderRow={this.renderBoards.bind(this)} style={styles.listviewFinal} enableEmptySections/>
				<ListView dataSource={ends} renderRow={this.renderEnds.bind(this)} style={styles.listviewFinal} enableEmptySections/>
	    		<ActionButton title="Compute Solution" onPress={this.attemptToSolve.bind(this)} />
	    		<Modal
		          animationType="slide"
		          transparent={true}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {}}>
		          <View style={styles.modalView}>
		              <Text style={{color: '#f2f2f2'}}>Sorry, we could not find a solution within the desired tolerance.</Text>

		              <TouchableHighlight
		                onPress={() => {
		                  this.setModalVisible(!this.state.modalVisible);
		                }}>
		                <Text style={styles.modalClose}>Try again</Text>
		              </TouchableHighlight>
		          </View>
		        </Modal>
		  	</View>
		);
	}
}