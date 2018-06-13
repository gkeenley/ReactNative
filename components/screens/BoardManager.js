import React, {Component} from 'react';
import Swipeout from 'react-native-swipeout';
const Instructions = require('../../components/Instructions');
const AddSectionButton = require('../../components/AddSectionButton');
const Board = require('../../components/Board');
const styles = require('../../styles.js');

import {
	Text,
	View,
	Dimensions,
	ListView,
	TextInput,
} from 'react-native';

var maxBoardLength = 0;
var isMounted;

var boardsArray; // Array that will hold lengths of all boards
var selectedProjectKey;
var selectedProjectTitle;
var rows;
var boards;

export default class Screen3 extends Component {
	static navigationOptions = {
    	title: 'Screen3',
		header: null
  	};

  	constructor(props) {
		super(props);
	    this.state = {
	    	dataSource: new ListView.DataSource({
	        	rowHasChanged: (row1, row2) => row1 !== row2,
	    	}),
	    	boardLength: 0,
	    };
	    maxBoardLength = 0;

	    boardsArray = this.props.boardsArray;
		selectedProjectKey = this.props.selectedProjectKey;
		selectedProjectTitle = this.props.selectedProjectTitle;
		rows = this.props.rows;
		boards = this.props.boards;
	}

	// COMPONENT LIFECYCLE METHODS

	componentDidMount() {
 		// Initialize event listener for database
    	this.listenForItems(this.props.itemsRef);
    }

    componentWillMount() {
    	isMounted = true;
    }

    componentWillUnmount() {
    	isMounted = false;
    }

    // DATA SAVING METHODS

	saveLength = (length) => {
		this.setState({
			boardLength: length,
		});
	}
	
	setBoardsArray = (boardsArrayReceived) => {
		this.props.setBoardsArray(boardsArrayReceived);
		boardsArray = boardsArrayReceived;
	}

	setMaxBoardLength = (maxBoardLengthReceived) => {
		this.props.setMaxBoardLength(maxBoardLengthReceived);
		maxBoardLength = maxBoardLengthReceived;
	}

	saveData = () => {
		this.props.itemsRef.child(selectedProjectKey).child(selectedProjectTitle).child('boards').push(this.state.boardLength);
	}
    // Update state whenever a board is added or removed from DB
 	listenForItems(itemsRef) {
 		// Call callback function on data snapshot whenever values in database change
	    itemsRef.on('value', (snap) => {
		    // If component has unmounted, stop listening
	    	if (!isMounted)
	    		return;
	      	var items = []; // empty array in which we'll load all boards
	      	this.setBoardsArray([]);
	      	// Save each board from Firebase into 'items' and 'boardsArray' arrays
  			snap.child(selectedProjectKey).child(selectedProjectTitle).child('boards').forEach((board) => {
  				// If current board is longer than max so far, update max so far
  				if (parseFloat(board.val()) > maxBoardLength) {
  					this.setMaxBoardLength(board.val());
  				}
  				if (board.key != 'default') {
  					boardsArray.push(parseFloat(board.val())); // Save board in boardsArray
	  				items.push({ // save board in items
	  					title: board.val(),
				        _key: board.key
	  				});
  				}
  			});
		    this.setState({
		        dataSource: this.state.dataSource.cloneWithRows(items)
		    }, () => {
		    	this.props.setBoards(this.state.dataSource);
		    });
	    });
	}


	renderItem(item) {
		const swipeSettings = {
			autoClose: true,
			onClose: (secId, rowId, direction) => {
				this.props.itemsRef.child(selectedProjectKey).child(selectedProjectTitle).child('boards').child(item._key).remove();
			}
		}

		var swipeBtns = [{
			text: 'Delete',
			backgroundColor: 'red',
			underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
		}];
		return (
    		<View>
    			<View style={{width: (item.title/parseFloat(maxBoardLength))*(Dimensions.get('window').width-4), borderColor: 'black', borderBottomWidth: 1}}>
			    	<Swipeout {...swipeSettings} style={styles.board} right={swipeBtns}>
			    		<Board item={item.title} length={(item.title/parseFloat(maxBoardLength))*(Dimensions.get('window').width-4)}/>
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
			          	onPress = { () => this.props.navigate('Screen2') }>Select floor
			        </Text>
			        <Text
			        	style={styles.navForward}
			          	onPress = { () => this.props.navigate('Screen4') }>Select ends
			        </Text>
		        </View>
	    		<Instructions title="Please add boards by specifying their length and clicking 'Add'"/>
				<ListView dataSource={this.state.dataSource} renderRow={this.renderItem.bind(this)} style={styles.listview} enableEmptySections/>
				<AddSectionButton title="Add Board" onPress={this.saveData} />
				<TextInput
					placeholder="Please enter length of board to add"
					style={{height: 40, borderColor: 'gray', borderWidth: 1, width: Dimensions.get('window').width}}
					onChangeText={this.saveLength}/>
		  	</View>
		);
	}
}