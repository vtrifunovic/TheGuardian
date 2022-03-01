//import statments
import React, {useEffect} from 'react';
import { ImageBackground, Pressable, Text, View, FlatList, ScrollView, LogBox} from 'react-native';
import Styles from './styles';
import { useNavigation } from '@react-navigation/native';

const CPRManual = () => {
    // creating const for our nav stack
  const navigation = useNavigation();

  // Fix the ScrollView so this error doesn't have to be supressed
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  return (
    <View style={Styles.container}>
      <ImageBackground 
      style={Styles.image} 
      source={require('../mainmenu/Logo2.png')}>
          <ScrollView>
              {/*all instructions are bound into a scroll view, copied from the red-cross's site*/}
              <View style={Styles.basicView}>
                <View style={Styles.step}>
                    <Text style={Styles.numbers}>
                        1
                    </Text>
                    <Text style={Styles.instruction}>
                        CHECK the scene for safety, form an initial impression and use personal protective equipment (PPE)
                    </Text>
                </View>
                <View style={Styles.step}>
                    <Text style={Styles.numbers}>
                        2
                    </Text>
                    <Text style={Styles.instruction}>
                    If the person appears unresponsive, CHECK for responsiveness, breathing, life-threatening bleeding or other life-threatening conditions using shout-tap-shout
                    </Text>
                </View>
                <View style={Styles.step}>
                    <Text style={Styles.numbers}>
                        3
                    </Text>
                    <Text style={Styles.instruction}>
                    If the person does not respond and is not breathing or only gasping, CALL 9-1-1 and get equipment, or tell someone to do so
                    </Text>
                </View>
                <View style={Styles.step}>
                    <Text style={Styles.numbers}>
                        4
                    </Text>
                    <Text style={Styles.instruction}>
                    Place the person on their back on a firm, flat surface
                    </Text>
                </View>
                <View style={Styles.step}>
                    <Text style={Styles.numbers}>
                        5
                    </Text>
                    <View style={Styles.instruction}>
                        <Text>
                        Give 30 chest compressions
                        </Text>
                        <FlatList
                        style={Styles.list}
                        data = {[
                        {key: 'Hand position: Two hands centered on the chest'},
                        {key: 'Body position: Shoulders directly over hands; elbows locked'},
                        {key: 'Depth: At least 2 inches'},
                        {key: 'Rate: 100 to 120 per minute'},
                        {key: 'Allow chest to return to normal position after each compression'},
                        ]}
                        renderItem={({item}) => <Text style={Styles.item}><Text style={Styles.BP}>• </Text>{item.key}</Text>}/>
                    </View>
                </View>
                <View style={Styles.step}>
                    <Text style={Styles.numbers}>
                        6
                    </Text>
                    <View style={Styles.instruction}>
                        <Text>
                        Give 2 breaths
                        </Text>
                        <FlatList
                        style={Styles.list}
                        data = {[
                        {key: 'Open the airway to a past-neutral position using the head-tilt/chin-lift technique'},
                        {key: 'Ensure each breath lasts about 1 second and makes the chest rise; allow air to exit before giving the next breath'},
                        ]}
                        renderItem={({item}) => <Text style={Styles.item}><Text style={Styles.BP}>• </Text>{item.key}</Text>}/>
                        <Text>
                        <Text style={{fontWeight: 'bold'}}>    Note: </Text>If the 1st breath does not cause the chest to rise, retilt the head and ensure a proper seal before giving the 2nd breath If the 2nd breath does not make the chest rise, an object may be blocking the airway
                        </Text>
                    </View>
                </View>
                <View style={Styles.step}>
                    <Text style={Styles.numbers}>
                        7
                    </Text>
                    <Text style={Styles.instruction}>
                    Continue giving sets of 30 chest compressions and 2 breaths. Use an AED as soon as one is available!
                    </Text>
                </View>
                {/*back btn to take us to training menu*/}
                <Pressable style={Styles.back}
                onPress={() => navigation.navigate('Training Menu')}>
                <Text style={Styles.buttontext}>
                    Back
                </Text>
                </Pressable>
            </View>
            </ScrollView>
      </ImageBackground>
    </View>
  )
}
export default CPRManual;