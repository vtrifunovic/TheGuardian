import React, {useState} from 'react';
import { Text, View, Modal, FlatList, Pressable, ImageBackground} from 'react-native';
import Styles from './styles';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { useNavigation } from '@react-navigation/native';

const MainMenu = () => {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  function emergencyAccepted(){
    setModalVisible(!modalVisible);
    console.warn('911 has been called!');
    RNImmediatePhoneCall.immediatePhoneCall('6089637875');
    navigation.navigate('Practice');
  }

  return (
    <View style={Styles.container}>
      <ImageBackground style={Styles.image} source={require('./Logo2.png')}>
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
        <Pressable 
        style={[Styles.buttons, {backgroundColor: 'red', height: 40, width: '80%'}]}
        onPress={() => setModalVisible(true)}>
          <Text style={Styles.buttontext}>Emergency Call!</Text>
        </Pressable>
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