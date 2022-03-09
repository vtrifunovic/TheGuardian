//import statments
import React, {useState} from 'react';
import { Text, View, Modal, FlatList, Pressable, ImageBackground} from 'react-native';
import Styles from './styles';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { useNavigation } from '@react-navigation/native';

const MainMenu = () => {
  //creating nav stack and setting states for the the visibility of the emergency call
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  //this func handles the the backend of the emergency call btn
  function emergencyAccepted(){
    setModalVisible(!modalVisible);
    console.warn('911 has been called!');
    RNImmediatePhoneCall.immediatePhoneCall('6089637875');
    navigation.navigate('Practice');
  }

  function emergencyNotAccepted(){
    setModalVisible(!modalVisible);
    console.warn('Skipping 911 Call!');
    navigation.navigate('Practice');
  }

  return (
    <View style={Styles.container}>
      {/* Background of group logo blurred */}
      <ImageBackground style={Styles.image} source={require('./Logo2.png')}>
        {/* Create a header for app name and screen to show ABC's of CPR */}
        <Text style={Styles.header}>The Guardian CPR</Text>
        <Text style={Styles.text}>
          Verify there's a Cardiac Emergency:
        </Text>
        <FlatList
        style={Styles.list}
        data = {[
          {key: '• Check the scene is safe'},
          {key: '• Tap the person on the shoulder'},
          {key: '• Shout are you ok to ensure they need help'},
          {key: '• Listen for breathing'},
          {key: '• Check to see if they are choking'},
        ]}
        renderItem={({item}) => <Text style={Styles.item}>{item.key}</Text>}/>
        {/* This is our modal, this pops up when emergency call is clicked */}
        <Modal 
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text style={Styles.buttontext}>By pressing accept, you are confirming this is an Emergency situation, and would like 911 to be called.</Text>
              <View style={Styles.modalButtons}>
                <Pressable
                style={[Styles.modalButton, {backgroundColor: '#ffbb00'}]}
                onPress={() => emergencyAccepted()}>
                  <Text style={Styles.buttontext}>
                    Accept
                  </Text>
                </Pressable>
                <Pressable
                style={[Styles.modalButton, {backgroundColor: '#60c47b'}]}
                onPress={() => emergencyNotAccepted()}>
                  <Text style={Styles.buttontext}>
                    Continue{"\n"}
                    w/o call
                  </Text>
                </Pressable>
                <Pressable
                style={[Styles.modalButton, {backgroundColor: '#BFC1C4'}]}
                onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={Styles.buttontext}>
                    Decline
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        {/* Setting button for the emergency call, sets modal to visible on press */}
        <Pressable 
        style={[Styles.buttons, {backgroundColor: 'red', height: 40, width: '80%'}]}
        onPress={() => setModalVisible(true)}>
          <Text style={Styles.buttontext}>Emergency Call!</Text>
        </Pressable>
        {/* Button to take you to rest of app while avoiding calling 911 */}
        <Pressable 
        style={[Styles.buttons, {backgroundColor: '#BFC1C4', height: 80, width: '90%'}]} 
        onPress={() => navigation.navigate('Training Menu')}>
          <Text style={Styles.buttontext}>Training Mode</Text>
        </Pressable>
      </ImageBackground>
    </View>
  )
}
export default MainMenu;