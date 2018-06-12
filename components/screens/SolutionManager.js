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

var floorRowsArray;
var filledRows;

var maxBoardLength;
var boardsArray;
var endsArray;
var boards;
var ends;

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
		floorRowsArray = this.props.floorRowsArray;
		rows = this.props.rows;
		filledRows = this.props.filledRows;
    	maxBoardLength = this.props.maxBoardLength;
    	boardsArray = this.props.boardsArray;
    	endsArray = this.props.endsArray;
    	boards = this.props.boards;
    	ends = this.props.ends;
	}
	


	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

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

	updateTolerance(text) {
		this.setState({
			tolerance: parseInt(text)
		});
	}

	setFloorRowsArray = (floorRowsArrayReceived) => {
		floorRowsArray = floorRowsArrayReceived;
		this.props.setFloorRowsArray(floorRowsArrayReceived);
	}

	setFilledRows = (filledRowsReceived) => {
		filledRows = filledRowsReceived.slice()
		this.props.setFilledRows(filledRowsReceived);
	}

	attemptToSolve() {
		var solution;
		this.setFloorRowsArray(floorRowsArray.map((item) => parseFloat(item)));
		if (endsArray.length > 0) {
			if (f.func(boardsArray, [endsArray[0]], [], 0, 0, endsArray, floorRowsArray, this.state.tolerance)) {
				this.setState({solved: true});
				solution = f.func(boardsArray, [endsArray[0]], [], 0, 0, endsArray, floorRowsArray, this.state.tolerance);
			} else{
				this.setModalVisible(true);
				return;
			}
		}
		else {
			if (f.func(boardsArray, [], [], 0, 0, endsArray, floorRowsArray, this.state.tolerance)) {
				this.setState({solved: true});
				solution = f.func(boardsArray, [], [], 0, 0, endsArray, floorRowsArray, this.state.tolerance);
			} else {
				this.setModalVisible(true);
				return;
			}
		}
		this.setFilledRows([]);
		var tempFilledRows;
		solution.forEach((row, index) => {
			var filledRow = [];
			row.forEach((board, subIndex) => {
				filledRow.push(
		    		<ArrangedBoard key={subIndex} item={board} length={board*350/Math.max.apply(null, floorRowsArray)} style={{borderColor: 'black', borderBottomWidth: 1}}/>
				);
			});
			tempFilledRows = filledRows.slice();
			tempFilledRows.push(
				<View key={index} style={{flex: 1, flexDirection: 'row', height: 200/solution.length}}>
			        {filledRow}
		      	</View>
			);
			this.setFilledRows(tempFilledRows);
		});
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
			        <Floor rowCollection={rows}></Floor>
			        {!!this.state.solved && <FilledFloor rowCollection={filledRows}></FilledFloor>}
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