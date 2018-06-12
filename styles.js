const React = require('react-native');
import {Dimensions} from 'react-native';
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    // top: 50,
    flex: 1,
  },
  listviewFinal: {
    // top: 50,
    flex: 1,
    borderWidth: 2,
    borderColor: '#808080'
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 16,
    justifyContent: 'center',
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: 'black',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  addSection: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    marginBottom: 10,
  },

  // Custom
  instructions: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10
  },
  instructionBar: {
    justifyContent: 'center',
  },
  instructionBarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },

  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  fullContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 15
  },
  fullContainer2: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 15,
    position: 'absolute',
  },
  floorContainer: {
    width: 360,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  board: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  arrangedBoard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRightWidth: 1
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  navBack: {
    height: 20,
    textAlign: 'left',
    width: 100,
  },
  navForward: {
    height: 20,
    textAlign: 'right',
    width: 100,
  },
  modalView: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 250,
    top: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalClose: {
    backgroundColor: '#333',
    color: '#f2f2f2',
    padding: 5,
    margin: 20
  },
  project: {
    paddingTop: 14,
    paddingBottom: 16,
    paddingLeft: 25,
    justifyContent: 'center',
    margin: 15,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#C0C0C0"
  },
  floorSection: {
    paddingTop: 14,
    paddingBottom: 16,
    paddingLeft: 25,
    justifyContent: 'center',
    margin: 15,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#C0C0C0"
  }

})

module.exports = styles
module.exports.constants = constants;
