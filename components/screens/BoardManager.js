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

var boardsArray;
var floorKey;
var floorTitle;
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
		floorKey = this.props.floorKey;
		floorTitle = this.props.floorTitle;
		rows = this.props.rows;
		boards = this.props.boards;
	}

	setBoardsArray = (boardsArrayReceived) => {
		console.log("Setting boardsArray to ", boardsArrayReceived);
		this.props.setBoardsArray(boardsArrayReceived);
		boardsArray = boardsArrayReceived;
	}

	setMaxBoardLength = (maxBoardLengthReceived) => {
		this.props.setMaxBoardLength(maxBoardLengthReceived);
		maxBoardLength = maxBoardLengthReceived;
		// this.setState({
		// 	maxBoardLength: maxBoardLengthReceived,
		// });
	}

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

    // Listen for and pull data from DB into dataSource
 	listenForItems(itemsRef) {
 		// Call callback function on data snapshot whenever values in database change
	    itemsRef.on('value', (snap) => {
	    	if (!isMounted)
	    		return;
	      	var items = []; // empty array in which we'll load all data
	      	this.setBoardsArray([]);
  			snap.child(floorKey).child(floorTitle).child('boards').forEach((kid) => {
  				if (parseFloat(kid.val()) > maxBoardLength) {
  					this.setMaxBoardLength(kid.val());
  				}
  				if (kid.key != 'default') {
  					var tempBoardsArray = boardsArray;
  					tempBoardsArray.push(parseFloat(kid.val()));
  					this.setBoardsArray(tempBoardsArray);
	  				items.push({
	  					title: kid.val(),
				        _key: kid.key
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

	saveLength = (length) => {
		this.setState({
			boardLength: length,
		});
	}

	saveData = () => {
		this.props.itemsRef.child(floorKey).child(floorTitle).child('boards').push(this.state.boardLength);
	}

	renderItem(item) {
		const onPresses = () => {
			// itemsRef.child(floorKey).child(floorTitle).child('boards').child(item._key).remove();
		};
		const swipeSettings = {
			autoClose: false,
			onClose: (secId, rowId, direction) => {
				// this.props.itemsRef.child(floorKey).child(floorTitle).child('boards').child(item._key).remove();
				console.log("hello");
			},
			onOpen: (secId, rowId, direction) => {
				// this.props.itemsRef.child(floorKey).child(floorTitle).child('boards').child(item._key).remove();
				console.log("goodbye");
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
				<AddSectionButton title="Add" onPress={this.saveData} />
				<TextInput
					placeholder="Please enter length of board to add"
					style={{height: 40, borderColor: 'gray', borderWidth: 1, width: Dimensions.get('window').width}}
					onChangeText={this.saveLength}/>
		  	</View>
		);
	}
}