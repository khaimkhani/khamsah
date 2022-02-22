import { TextInput, View, Text, StyleSheet } from "react-native-web"
import countries from "../assets/countries"


const Intro = ({ navigation }) => {

    const showClosest = (text) => {
        // import city names
        
    }

    return <View style={styles.introContainer}>
        <Text style={styles.inputPrompt}>
            Enter your current city:
            <Text style={styles.subInputPrompt}>
                You can change this at any time in settings.
            </Text>
        </Text>
        <TextInput 
         onChangeText={tinput => {showClosest(tinput)}}
         style={styles.input}
         />
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