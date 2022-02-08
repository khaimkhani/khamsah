import { View, StyleSheet, Text, Button, Picker } from 'react-native';
import { useState, useEffect, useRef } from 'react';

const Settings = ({ navigation }) => {

    const [selectedLocation, setSelectedLocation] = useState('Toronto');

    return <View>
        <Button onPress={() => navigation.goBack()}>
            Back
        </Button>
        <View>
            <Text>
                Location:
            </Text>
            <Picker
                selectedValue={selectedLocation}
                style={styles.picker}>
                <Picker.Item label="Toronto" value="toronto" />
            </Picker>
        </View>
        <View>

        </View>
    </View>
}

const styles = StyleSheet.create({
    settingsContainer: {
        height: '100',
        width: '100',
        backgroundColor: 'white'
    },
    picker: {
        width: 100,
        height: 50
    }

});


export default Settings;