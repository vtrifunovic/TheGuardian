import React, { useState } from 'react';
import {Text, View, Pressable, ImageBackground, Switch} from 'react-native';
import Styles from './styles';

const Practice = ({navigation}) => {

    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);

    //const navigation = useNavigation();

    return (
        <View style={Styles.container}>
            <ImageBackground 
            style={Styles.image}
            source={require('../mainmenu/Logo2.png')}>
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
                <Pressable style={Styles.buttons}
                onPress={() => navigation.navigate('Practice Start', {tgl1: toggle, tgl2: toggle2})}>
                    <Text style={Styles.buttontext}>
                        Start!
                    </Text>
                </Pressable>
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