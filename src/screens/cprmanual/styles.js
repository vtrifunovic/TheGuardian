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
    position: 'absolute',
    zIndex: 1,
  },

  basicView: {
      marginTop: 50,
      marginBottom: 35,
  },

  BP: {
      fontWeight: 'bold',
      fontSize: 16,
  },

  item: {
      margin: 3,
  },

  numbers: {
    color: 'red',
    fontSize: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 7,
    borderRadius: 5,
  },

  instruction: {
      color: 'black',
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 5,
      width: '90%',
  },

  list:{
      padding: 5,
      paddingLeft: 20,
  },

  step: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '95%',
    borderRadius: 20,
    //margin: 5,
    padding: 10,
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
    margin: 15,
    width: '25%',
    backgroundColor: 'white',
    shadowColor: 'white',
    alignSelf: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Styles;