import React, {Component} from 'react';
import {
	Text,
	View,
	ListView,
	TextInput,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
const Instructions = require('../../components/Instructions');
const Project = require('../../components/Project');
const ActionButton = require('../../components/ActionButton');
import { createStackNavigator } from 'react-navigation';
const styles = require('../../styles.js');

export default class Screen1 extends Component {
	static navigationOptions = {
    	title: 'Screen1',
		header: { visible:false }
  	};

  	constructor(props) {
		super(props);
	    this.state = {
	    	// Create DataSource object that gives us methods to interact with list items.
      		// Initialize it with rowHasChanged() that designates a row to have changed if it's not equal to previous contents of row.
	    	dataSource: new ListView.DataSource({
	        	rowHasChanged: (row1, row2) => row1 !== row2,
	    	}),
	    	floorName: '',
	    	floorSelected: false,
	    	floorKey: this.props.floorKey,
	    	floorTitle: this.props.floorTitle,
	    };
	}

	componentDidMount() {
 		// Initialize event listener for database
    	this.listenForItems(this.props.itemsRef);
    }

   	componentWillUnmount() {
    	isMounted = false;
    }

    setFloorKey = (floorKeyReceived) => {
    	this.setState({
    		floorKey: floorKeyReceived
    	}, () => {
    	});
    	this.props.setFloorKey(floorKeyReceived);
    }

    setFloorTitle = (floorTitleReceived) => {
		this.props.setFloorTitle(floorTitleReceived);
		this.setState({
			floorTitle: floorTitleReceived,
		});
	}

    // Method called by event listener
 	listenForItems(itemsRef) {
 		// Call callback function on data snapshot whenever values in database change
	    itemsRef.on('value', (snap) => {
	      	var items = []; // empty array in which we'll load all data
	      	snap.forEach((child) => { // for each item in database
		        // Push objects in the form that cloneWithRows() needs
		        items.push({
		          title: Object.keys(child.val())[0], // Title of floor
		          _key: child.key // key that Firebase generated
		        });
	      	});
		    this.setState({
		        dataSource: this.state.dataSource.cloneWithRows(items) // Put 'text' items into dataSource
		    });
	    });
	}

	renderItem(item) {
		// When floor is clicked, save its key and title as 'current' floor
		const selectProject = () => {
			this.setState({
				floorSelected: true
			});
			this.setFloorKey(item._key);
			this.setFloorTitle(item.title);
		};
		return (
	    	<Project item={item} onPress={selectProject}/>
	    );
	}

	// Create new floor with name just supplied by user
	createFloor = () => {
		this.props.itemsRef.push({
			[this.state.floorName]: {
				'boards': {
					'default': 'default'
				},
				'ends': {
					'default': 'default'
				}
			}
		});
	}

	// Step 1: save floor name from input so that it can be used to create new floor
	saveFloorName = (name) => {
		this.setState({
			floorName: name
		});
	}

	render() {

		return (
			<View style={styles.container}>
				<View style={styles.navContainer}>
					{this.state.floorSelected && <Text style={styles.navBack} onPress = { () => this.props.navigate('Screen2') }></Text>}
					{this.state.floorSelected && <Text style={styles.navForward} onPress = { () => this.props.navigate('Screen2') }>Select floor</Text>}
		        </View>
	    		<Instructions title="Please select existing floor plan, or enter name of new plan and click 'Add' to create new"/>
	    		<ListView dataSource={this.state.dataSource} renderRow={this.renderItem.bind(this)} style={styles.listview} enableEmptySections/>
	    		<ActionButton title="Add" onPress={this.createFloor} />
	    		<TextInput placeholder="Please enter the name of new floor project" style={styles.textInput} onChangeText={this.saveFloorName}/>
	    	</View>
	    );
	}
}