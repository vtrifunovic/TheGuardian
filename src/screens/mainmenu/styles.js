import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
  //colors:
  //Purple #985F99
  //Pink/Red #BF6F8C
  //Blue #5070A1
  //Gray #BFC1C4
  //Black #0A0503

  image: {
    width: '100%',
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },

  container:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    position: 'absolute',
    zIndex: 1,
  },

  list:{
    top: 60,
  },

  item: {
    //height: '10%',
    padding: 5,
    color: 'white',
    fontSize: 16,
  },

  header: {
    fontFamily: 'sans-serif',
    fontSize: 35,
    justifyContent: 'center',
    color: 'white',
    top: 45,
    //alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    padding: 15,
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 25,
  },

  text:{
    fontSize: 20,
    color: 'white',
    top: 50,
    textAlign: 'left',
    width: '100%',
    padding: 20.
  },

  buttons:{
    height:40,
    borderRadius: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
    zIndex: 100,
    margin: 5,
  },

  buttontext: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    borderColor: '#ffbb00',
    borderWidth: 5,
    alignItems: "center",
    shadowColor: "#ffbb00",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },

  modalButtons: {
    flexDirection: 'row',
  },

  modalButton: {
    padding: 15,
    borderRadius: 5,
    margin: 10,
  }

});

export default Styles;