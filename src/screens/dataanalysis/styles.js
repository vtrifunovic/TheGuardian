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
    height: 45,
    borderRadius: 15,
    margin: 20,
    width: '50%',
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  
  image: {
    width: '100%',
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  buttons:{
    height:80,
    borderRadius: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5070A1',
    zIndex: 100,
  },

  buttontext: {
    fontSize: 16,
    paddingTop: 40,
    paddingHorizontal: 50,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },

  scroll: {
    width: '100%',
    paddingTop: 50,
  },

  txt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
});

export default Styles;