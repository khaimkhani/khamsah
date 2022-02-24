import { TextInput, View, Text, StyleSheet } from "react-native";
import { useState, useEffect} from "react";
import countries from "../assets/countries";


const Intro = (props) => {

    const [dropDown, setDropDown] = useState([]);

    const updateClosest = (text) => {
        if (text == '') {
            setDropDown([]);
        } else {
            text = text.charAt(0).toUpperCase() + text.slice(1);
            let repArr = [];
            let closest = showClosest(text, countries);
            let i = closest - 1; let j = closest + 1;
            repArr.push(countries[closest])
            let k = 0;
            while ((k < 6) && (repArr.length < 5)) {
                
                if (countries[i].slice(0, text.length).localeCompare(text) == 0) {
                    repArr.push(countries[i]);
                    i -= 1;
                }
                if (countries[j].slice(0, text.length).localeCompare(text) == 0) {
                    repArr.push(countries[j]);
                    j += 1;
                }
                k += 1
            }
            
            setDropDown(repArr);
        }
    }

    const showClosest = (text, data) => {
        if (data.length <= 1 && text !== data[0]) {
            return 0;
        }
        let txtSize = text.length;
        let size = Math.floor(data.length / 2);
        
        if (data[size].slice(0, txtSize).localeCompare(text) > 0) {
            let L = data.slice(0, size);
            let closestIndex = showClosest(text, L);  
            return closestIndex;

        } else if (data[size].slice(0, txtSize).localeCompare(text) < 0) {
            let R = data.slice(size, data.length);
            let closestIndex = showClosest(text, R);
            return size + closestIndex;
        
        } else if (data[size].slice(0, txtSize).localeCompare(text) == 0){
            return size;
        }
    }

    return <View style={styles.introContainer}>
        <Text style={styles.inputPrompt}>
            Enter your City:
        </Text>
        <View style={styles.inputContainer}>
            <TextInput 
                onChangeText={tinput => {updateClosest(tinput)}}
                style={styles.inputUser}
                />
                {dropDown.length !== 0 ?
                    <View style={styles.dropDown}>
                    {dropDown.map((item, key) => {
                        return <Text style={styles.picker} key={key}>{item}</Text>
                        })}
                    </View> : null}
        </View>
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
        height: '100vh'
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
        fontSize: '8px',
        fontWeight: 'normal'
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '15vh'
    },
    inputUser: {
        position: 'relative',
        borderWidth: '1px',
        width: '100%'
    },
    dropDown: {
        display: 'flex',
        position: 'relative',
        height: 'auto',
        width: '100%',
        borderWidth: 1,
    },
    picker: {

    }
});

export default Intro;