import { TextInput, View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateClosestHelper } from "../assets/SearchFuncs";

const Intro = (props) => {

    const [dropDown, setDropDown] = useState([]);
    const [drop, setDrop] = useState(false);
    const [pickCity, setPickCity] = useState('');

    const updateClosest = (text) => {
        let {ddArr, dd} = updateClosestHelper(text);
        setDropDown(ddArr);
        setDrop(dd)
    }

    const processCity = async () => {
        if (dropDown.includes(pickCity)) {
            await AsyncStorage.setItem('currCity', pickCity);
            props.setTimeInst(false);
        }
    }

    return <View style={styles.introContainer}>
        <Text style={styles.inputPrompt}>
            Enter your City:
        </Text>
        <Text style={styles.subInputPrompt}>
            You can change this in settings.
        </Text>
        <View style={styles.inputContainer}>
            <TextInput 
                onChangeText={tinput => {updateClosest(tinput); setPickCity(tinput)}}
                autoCapitalize='words'
                value={pickCity}
                style={styles.inputUser}
                />
                {drop ?
                    <View style={styles.dropDown}>
                    {dropDown.map((item, key) => {
                        return <Pressable onPress={() => {setPickCity(item); setDrop(false)}} key={key}>
                                <Text style={styles.picker} key={key}>{item}</Text>
                                </Pressable>
                        })}
                    </View> : null}
        </View>
        <TouchableOpacity onPress={() => processCity()}>
            <Text>
                Send it
            </Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    introContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: '100%'
    },
    inputPrompt: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5%'
    },
    subInputPrompt: {
        fontSize: 8,
        fontWeight: 'normal'
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        height: 100
    },
    inputUser: {
        position: 'relative',
        borderWidth: 1,
        width: 140
    },
    dropDown: {
        display: 'flex',
        position: 'relative',
        height: 'auto',
        width: 140,
        borderWidth: 1,
    },
    picker: {

    }
});

export default Intro;