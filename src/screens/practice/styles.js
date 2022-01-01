import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
  //colors:
  //Purple #985F99
  //Pink/Red #BF6F8C
  //Blue #5070A1
  //Gray #BFC1C4
  //Black #0A0503
  container:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: '#0A0503',
    position: 'absolute',
    zIndex: 1,
  },

  back: {
    height: 40,
    borderRadius: 15,
    width: '25%',
    position: 'absolute',
    bottom: 80,
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 80,
    width: '95%',
    borderRadius: 20,
    margin: 5,
    padding: 15,
  },

  switchx: {
      alignItems: 'flex-end',
      right: 1,
      position: 'absolute'
  },

  switchtext: {
    fontSize: 20,
    color: 'black',
    padding: 20,
    left: 10,
    alignItems: 'flex-start',
    position: 'absolute'
  },

  image: {
    width: '100%',
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttons:{
    height:80,
    borderRadius: 20,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.4)',
    zIndex: 100,
    margin: 5,
  },

  buttontext: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },

  back: {
    height: 40,
    borderRadius: 15,
    width: '25%',
    position: 'absolute',
    bottom: 80,
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Styles;