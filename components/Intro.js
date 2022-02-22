import { TextInput, View, Text, StyleSheet } from "react-native-web";
import { useState, useEffect} from "react";
import countries from "../assets/countries";


const Intro = ({ navigation }) => {

    const [dropDown, setDropDown] = useState([]);

    const updateClosest = (text) => {
        // import city names
        if (text == '') {
            setDropDown([]);
        } else {
            
            text = text.charAt(0).toUpperCase() + text.slice(1);
            let repArr = [];
            let closest = showClosest(text, countries);
            let i = closest - 1; let j = closest + 1;
            repArr.push(countries[closest])
            while ((countries[i].slice(0, text.length).localeCompare(text) == 0) && (i > 0) && (repArr.length < 10)) {
                repArr.push(countries[i]);
                i -= 1;
            }
            
            while ((countries[j].slice(0, text.length).localeCompare(text) == 0) && (j < countries.length - 1) && (repArr.length < 10)) {
                repArr.push(countries[j]);
                j += 1;
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
            Enter your current city:
            <Text style={styles.subInputPrompt}>
                You can change this at any time in settings.
            </Text>
        </Text>
        <TextInput 
         onChangeText={tinput => {updateClosest(tinput)}}
         style={styles.input}
         />
         <ul>
             {dropDown.map((item, key) => {
                 return <li key={key}> {item} </li>
             })}
         </ul>
    </View>
}

const styles = StyleSheet.create({
    introContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: '1px',
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
    input: {
        borderWidth: '1px'
    }
});

export default Intro;