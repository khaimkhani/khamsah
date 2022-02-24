import { View, StyleSheet, Text, Button, Picker } from 'react-native';
import { useState, useEffect, useRef } from 'react';

const Settings = ({ navigation }) => {

    const [selectedLocation, setSelectedLocation] = useState('Toronto');

    return <View>
        <Button onPress={() => navigation.goBack()}>
            <Text>Back</Text>
        </Button>
        <View>
            <Text>
                These are the current settings
            </Text>
        </View>
        <View style={styles.locationView}>
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
        height: 30
    },
    locationView: {
        height: '10',
        width: '100',
        margin: '4',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5',
        borderWidth: 1
    }

});


export default Settings;