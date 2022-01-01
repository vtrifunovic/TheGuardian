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
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5070A1',
    zIndex: 100,
    margin: 15,
  },

  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
});

export default Styles;