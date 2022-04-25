import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
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

  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    margin: 10,
    paddingBottom: 30,
  },

  image: {
    width: '100%',
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonContainer: {
    flexDirection: 'row',
  },

  buttons:{
    height:80,
    borderRadius: 20,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.4)',
    zIndex: 100,
    margin: 5,
  },

  buttontext: {
    fontSize: 16,
    color: 'black',
    justifyContent: 'center',
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


export default styles;