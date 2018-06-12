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
var floorKey = '';
var floorTitle = '';
var rows = []; // array to hold View elements for each row in grid
var filledRows = [];
var boards;
var maxBoardLength = 0;
var ends;
var maxEndLength = 0;
var floorRowsArray = [];
var boardsArray = [];
var endsArray = [];

// METHODS

var setFloorKey = function(floorKeyReceived) {
	floorKey = floorKeyReceived;
}

var setFloorTitle = function(floorTitleReceived) {
	floorTitle = floorTitleReceived;
}

var setRows = function(rowsReceived) {
	rows = rowsReceived;
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

var setFloorRowsArray = function(floorRowsArrayReceived) {
	floorRowsArray = floorRowsArrayReceived;
}

var setFilledRows = function(filledRowsReceived) {
	filledRows = filledRowsReceived;
}

// SCREENS

class Screen1 extends React.Component {
  	render() {
  		return(
  			<Home navigate={this.props.navigation.navigate} itemsRef={itemsRef} floorKey={floorKey} floorTitle={floorTitle} rows={rows} setFloorKey={setFloorKey} setFloorTitle={setFloorTitle} setRows={setRows} />
  		)
  		
  	}
}

class Screen2 extends React.Component {
  	render() {
  		return(
			<FloorManager navigate={this.props.navigation.navigate} itemsRef={itemsRef} floorKey={floorKey} floorTitle={floorTitle} rows={rows} setFloorKey={setFloorKey} setFloorTitle={setFloorTitle} setRows={setRows} floorRowsArray={floorRowsArray} setFloorRowsArray={setFloorRowsArray}/>
  		)
  	}
}

class Screen3 extends React.Component {
	render() {
		return(
			<BoardManager navigate={this.props.navigation.navigate} itemsRef={itemsRef} boardsArray={boardsArray} setBoardsArray={setBoardsArray} floorKey={floorKey} floorTitle={floorTitle} rows={rows} setFloorKey={setFloorKey} setFloorTitle={setFloorTitle} setRows={setRows} setMaxBoardLength={setMaxBoardLength} boards={boards} setBoards={setBoards}/>
		)
	}
}

class Screen4 extends React.Component {
	render() {
		return(
			<EndManager navigate={this.props.navigation.navigate} itemsRef={itemsRef} endsArray={endsArray} setEndsArray={setEndsArray} floorKey={floorKey} floorTitle={floorTitle} rows={rows} setFloorKey={setFloorKey} setFloorTitle={setFloorTitle} setRows={setRows} setMaxEndLength={setMaxEndLength} ends={ends} setEnds={setEnds}/>
		)
	}
}

class Screen5 extends React.Component {
	render() {
		return(
			<SolutionManager navigate={this.props.navigation.navigate} itemsRef={itemsRef} maxBoardLength={maxBoardLength} maxEndLength={maxEndLength} floorRowsArray={floorRowsArray} setFloorRowsArray={setFloorRowsArray} boardsArray={boardsArray} endsArray={endsArray} rows={rows} filledRows={filledRows} setFilledRows={setFilledRows} boards={boards} ends={ends}/>
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
