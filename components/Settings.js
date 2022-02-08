import { View, StyleSheet, Text, Button } from 'react-native';
import { useState, useEffect, useRef } from 'react';

const Settings = ({ navigation }) => {

    return <View>
        <Button onPress={() => navigation.push('Home')}>
            Back
        </Button>
        <Text>
            Hello u r in settings my friend
        </Text>
    </View>
}

const styles = StyleSheet.create({
    settingsContainer: {
        height: '100',
        width: '100',
        backgroundColor: 'white'
    }

});


export default Settings;