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

var endsArray;
var selectedProjectKey;
var selectedProjectTitle;
var rows;
var ends;

export default class Screen4 extends Component {
	static navigationOptions = {
    	title: 'Screen4',
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
	    maxEndLength = 0;

    	endsArray = this.props.endsArray;
    	selectedProjectKey = this.props.selectedProjectKey;
    	selectedProjectTitle = this.props.selectedProjectTitle;
    	rows = this.props.rows;
    	ends = this.props.ends;
	}

	setEndsArray = (endsArrayReceived) => {
		this.props.setEndsArray(endsArrayReceived);
		endsArray = endsArrayReceived;
	}

	setMaxEndLength = (maxEndLengthReceived) => {
		this.props.setMaxEndLength(maxEndLengthReceived);
		maxEndLength = maxEndLengthReceived;
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
	      	this.setEndsArray([]);
  			snap.child(selectedProjectKey).child(selectedProjectTitle).child('ends').forEach((kid) => {
  				if (parseFloat(kid.val()) > maxEndLength) {
  					this.setMaxEndLength(kid.val());
  				}
  				if (kid.key != 'default') {
  					var tempEndsArray = endsArray;
  					tempEndsArray.push(parseFloat(kid.val()));
  					this.setEndsArray(tempEndsArray);
	  				items.push({
	  					title: kid.val(),
				        _key: kid.key
	  				});
  				}
  			});
		    this.setState({
		        dataSource: this.state.dataSource.cloneWithRows(items)
		    });
	    });
	}

	saveLength = (length) => {
		this.setState({
			endLength: length,
		});
	}

	saveData = () => {
		this.props.itemsRef.child(selectedProjectKey).child(selectedProjectTitle).child('ends').push(this.state.endLength);
	}

	renderItem(item) {
		const swipeSettings = {
			autoClose: true,
			onClose: (secId, rowId, direction) => {
				this.props.itemsRef.child(selectedProjectKey).child(selectedProjectTitle).child('ends').child(item._key).remove();
			}
		}

		var swipeBtns = [{
			text: 'Delete',
			backgroundColor: 'red',
			underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
		}];
		return (
    		<View>
    			<View style={{width: (item.title/parseFloat(maxEndLength))*(Dimensions.get('window').width-4), borderColor: 'black', borderBottomWidth: 1}}>
			    	<Swipeout {...swipeSettings} style={styles.board} right={swipeBtns}>
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
			          	onPress = { () => this.props.navigate('Screen3') }>Select boards
			        </Text>
			        <Text
			        	style={styles.navForward}
			          	onPress = { () => this.props.navigate('Screen5') }>Solution
			        </Text>
		        </View>
	    		<Instructions title="Please add ends by specifying their length and clicking 'Add'"/>
				<ListView dataSource={this.state.dataSource} renderRow={this.renderItem.bind(this)} style={styles.listview} enableEmptySections/>
				<AddSectionButton title="Add End" onPress={this.saveData} />
				<TextInput
					placeholder="Please enter length of end to add"
					style={{height: 40, borderColor: 'gray', borderWidth: 1, width: Dimensions.get('window').width}}
					onChangeText={this.saveLength}/>
		  	</View>
		);
	}
}