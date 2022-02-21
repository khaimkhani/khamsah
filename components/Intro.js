import { TextInput } from "react-native-web"


const Intro = ({ navigation }) => {

    const showClosest = (text) => {
        // import city names
    }

    return <View>
        <Text>
            Enter your current city:
            <Text>
                You can change this at any time in settings.
            </Text>
        </Text>
        <TextInput 
         onChangeText={tinput => {showClosest(tinput)}}
         />
    </View>
}