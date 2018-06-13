// Import packages
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
const firebase = require('firebase');
import Swipeout from 'react-native-swipeout';
import { createStackNavigator } from 'react-navigation';

// Import Screens
const Home = require('./components/screens/Home').default;
const FloorManager = require('./components/screens/FloorManager').default;
const BoardManager = require('./components/screens/BoardManager').default;
const EndManager = require('./components/screens/EndManager').default;
const SolutionManager = require('./components/screens/SolutionManager').default;
const styles = require('./styles.js');

// Ignore warnings
// console.ignoredYellowBox = ['Setting a timer'];
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;

// Firebase configuration settings
const firebaseConfig = {
	apiKey: "AIzaSyC8RJrkzxrJo6it2zP0o8phXlWWG6-U8VU",
	authDomain: "groceryapp-6f303.firebaseapp.com",
	databaseURL: "https://groceryapp-6f303.firebaseio.com",
	storageBucket: "groceryapp-6f303.appspot.com",
};
// Initialize Firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// GLOBAL VARIABLES

var itemsRef = firebaseApp.database().ref();
var selectedProjectKey = ''; // Key generated by Firebase corresponding to project currently under consideration
var selectedProjectTitle = ''; // Title input by user corresponding to project currently under consideration
var floorSections = []; // Array containing View component of each section of floor
var filledFloorSections = []; // Array containing View component of each section of floor, when floor has had solution computed
var boards; // Array of boards in ListView-friendly format
var ends; // Array of ends in ListView-friendly format
var maxBoardLength = 0;
var maxEndLength = 0;
var floorSectionsArray = []; // Array containing lengths of each row in floor
var boardsArray = []; // Array of all boards lengths
var endsArray = []; // Array of all end lengths

// METHODS

var saveSelectedProjectKey = function(projectKeyReceived) {
	selectedProjectKey = projectKeyReceived;
}

var saveSelectedProjectTitle = function(projectTitleReceived) {
	selectedProjectTitle = projectTitleReceived;
}

// Save set of View components for each section of floor
var saveFloorSections = function(floorSectionsReceived) {
	floorSections = floorSectionsReceived;
}

var setBoardsArray = function(boardsArrayReceived) {
	boardsArray = boardsArrayReceived;
}

var setEndsArray = function(endsArrayReceived) {
	endsArray = endsArrayReceived;
}

var setMaxBoardLength = function(maxBoardLengthReceived) {
	maxBoardLength = maxBoardLengthReceived;
}

var setMaxEndLength = function(maxEndLengthReceived) {
	maxEndLength = maxEndLengthReceived;
}

var setBoards = function(boardsReceived) {
	boards = boardsReceived;
}

var setEnds = function(endsReceived) {
	ends = endsReceived;
}

var setFloorSectionsArray = function(floorSectionsArrayReceived) {
	floorSectionsArray = floorSectionsArrayReceived;
}

var setFilledFloorSections = function(filledFloorSectionsReceived) {
	filledFloorSections = filledFloorSectionsReceived;
}

// SCREENS

class Screen1 extends React.Component {
  	render() {
  		return(
  			<Home navigate={this.props.navigation.navigate} itemsRef={itemsRef} selectedProjectKey={selectedProjectKey} selectedProjectTitle={selectedProjectTitle} saveSelectedProjectKey={saveSelectedProjectKey} saveSelectedProjectTitle={saveSelectedProjectTitle} />
  		)
  		
  	}
}

class Screen2 extends React.Component {
  	render() {
  		return(
			<FloorManager navigate={this.props.navigation.navigate} itemsRef={itemsRef} selectedProjectKey={selectedProjectKey} selectedProjectTitle={selectedProjectTitle} floorSections={floorSections} saveSelectedProjectKey={saveSelectedProjectKey} saveSelectedProjectTitle={saveSelectedProjectTitle} saveFloorSections={saveFloorSections} floorSectionsArray={floorSectionsArray} setFloorSectionsArray={setFloorSectionsArray}/>
  		)
  	}
}

class Screen3 extends React.Component {
	render() {
		return(
			<BoardManager navigate={this.props.navigation.navigate} itemsRef={itemsRef} boardsArray={boardsArray} setBoardsArray={setBoardsArray} selectedProjectKey={selectedProjectKey} selectedProjectTitle={selectedProjectTitle} floorSections={floorSections} saveSelectedProjectKey={saveSelectedProjectKey} saveSelectedProjectTitle={saveSelectedProjectTitle} setMaxBoardLength={setMaxBoardLength} boards={boards} setBoards={setBoards}/>
		)
	}
}

class Screen4 extends React.Component {
	render() {
		return(
			<EndManager navigate={this.props.navigation.navigate} itemsRef={itemsRef} endsArray={endsArray} setEndsArray={setEndsArray} selectedProjectKey={selectedProjectKey} selectedProjectTitle={selectedProjectTitle} floorSections={floorSections} saveSelectedProjectKey={saveSelectedProjectKey} saveSelectedProjectTitle={saveSelectedProjectTitle} setMaxEndLength={setMaxEndLength} ends={ends} setEnds={setEnds}/>
		)
	}
}

class Screen5 extends React.Component {
	render() {
		console.log("boards: ", boards);
		return(
			<SolutionManager navigate={this.props.navigation.navigate} itemsRef={itemsRef} maxBoardLength={maxBoardLength} maxEndLength={maxEndLength} floorSectionsArray={floorSectionsArray} setFloorSectionsArray={setFloorSectionsArray} boardsArray={boardsArray} endsArray={endsArray} floorSections={floorSections} filledFloorSections={filledFloorSections} setFilledFloorSections={setFilledFloorSections} boards={boards} ends={ends}/>
		)
	}
}

// Navigation components
const NavigationApp = createStackNavigator({
  	Screen1: { screen: Screen1 },
  	Screen2: { screen: Screen2 },
  	Screen3: { screen: Screen3 },
  	Screen4: { screen: Screen4 },
  	Screen5: { screen: Screen5 },
},{
	headerMode: 'none' 
});

// Register root component, from which all other components are imported
AppRegistry.registerComponent('GroceryApp', () => NavigationApp);
