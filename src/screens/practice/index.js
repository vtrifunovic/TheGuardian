//import statements
import React, { useState } from 'react';
import {Text, View, Pressable, ImageBackground, Switch} from 'react-native';
import Styles from './styles';

const Practice = ({navigation}) => {
    // creating two state pairs for the two sounds we use 
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);

    //const navigation = useNavigation();

    return (
        <View style={Styles.container}>
            <ImageBackground 
            style={Styles.image}
            source={require('../mainmenu/Logo2.png')}>
                {/*Toggle button for determining whether user wants to have a metronome sound play*/}
                <Pressable style={Styles.options}
                onPress={() => setToggle(!toggle)}>
                    <Text style={Styles.switchtext}>CPR Metronome</Text> 
                    <View styles={Styles.switchx}><Switch
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                        trackColor={{false: 'gray', true: 'teal'}}
                        thumbColor="white"
                        ios_backgroundColor="gray"
                        onValueChange={(value) => setToggle(value)}
                        value={toggle}>
                        </Switch></View>
                </Pressable>
                {/*Toggle button for playing verbal commands, currently uses 2077.mp3 as a placeholder*/}
                <Pressable style={Styles.options} 
                onPress={() => setToggle2(!toggle2)}>
                    <Text style={Styles.switchtext}>Play Verbal Commands</Text>
                     <Switch style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                        trackColor={{false: 'gray', true: 'teal'}}
                        thumbColor="white"
                        ios_backgroundColor="gray"
                        onValueChange={(value) => setToggle2(value)}
                        value={toggle2}
                        >
                        </Switch>
                </Pressable>
                {/*btn to start the practice with values of toggle buttons being passed through as props*/}
                <Pressable style={Styles.buttons}
                onPress={() => navigation.navigate('Practice Start', {tgl1: toggle, tgl2: toggle2, start: Date.now()})}>
                    <Text style={Styles.buttontext}>
                        Data Collection
                    </Text>
                </Pressable>
                {/*Takes us to training start screen*/}
                <Pressable style={Styles.buttons}
                onPress={() => navigation.navigate('Training Start', {tgl1: toggle, tgl2: toggle2, start: Date.now()})}>
                    <Text style={Styles.buttontext}>
                        Start!
                    </Text>
                </Pressable>
                {/*returns us to the training menu*/}
                <Pressable style={Styles.back}
                onPress={() => navigation.navigate('Training Menu')}>
                    <Text style={Styles.buttontext}>
                        Back
                    </Text>
                </Pressable>
            </ImageBackground>
        </View>
    )
}
export default Practice;